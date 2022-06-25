import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Message, StompSubscription } from '@stomp/stompjs';
import { BehaviorSubject, filter, first, Observable, switchMap } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { Client, over } from 'stompjs';
import { SocketClientState } from './socket-client-state';
import { AuthService } from 'app/service/auth.service';

@Injectable({
	providedIn: 'root'
})
export class SocketClientService implements OnDestroy {

	private headers = { Authorization: '' };

	private client: any;
	private state: BehaviorSubject<SocketClientState>;

	constructor (private authService: AuthService) {
		// TODO: coorregir bug, se queda almacenado el token cuando cambio de sesion
		const token: string | null = this.authService.AuthToken;
		this.headers = token ? { Authorization: `Bearer ${ token }` } : this.headers;
		this.client = over(new SockJS(`${ environment.BASE_URL }live`));
		this.state = new BehaviorSubject<SocketClientState>(SocketClientState.ATTEMPTING);
		this.client.connect(this.headers, () => this.state.next(SocketClientState.CONNECTED));

		this.client.debug = null
	}
	connect(): Observable<any> {
		return new Observable<Client>(observer => {
			this.state.pipe(filter(state => state === SocketClientState.CONNECTED)).subscribe(() => {
				observer.next(this.client);
			});
		});
	}

	ngOnDestroy() {
		this.connect().pipe(first()).subscribe(inst => inst.disconnect(null));
	}

	onMessage(topic: string, handler = SocketClientService.jsonHandler): Observable<any> {
		return this.connect().pipe(first(), switchMap(inst => {
			return new Observable<any>(observer => {
				const subscription: StompSubscription = inst.subscribe(topic, (message: any) => {
					observer.next(handler(message));
				});
				return () => inst.unsubscribe(subscription.id);
			});
		}));
	}

	onPlainMessage(topic: string): Observable<string> {
		return this.onMessage(topic, SocketClientService.textHandler);
	}

	send(topic: string, payload: any): void {
		this.connect()
			.pipe(first())
			.subscribe(inst => inst.send(topic, {}, JSON.stringify(payload)));
	}

	static jsonHandler(message: Message): any {
		return JSON.parse(message.body);
	}

	static textHandler(message: Message): string {
		return message.body;
	}
}
