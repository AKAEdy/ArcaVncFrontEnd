/**
 * ARCA
 * Aqui descripcion de la api
 *
 * OpenAPI spec version: 0.0.1
 * Contact: no hay
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { CitaArcaExtends } from '../model/citaArcaExtends';
import { CitaServiciosArca } from '../model/citaServiciosArca';
import { DetalleCitaDto } from '../model/detalleCitaDto';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class CitasService {

    protected basePath = '//localhost:9898/api';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * crearCita
     * 
     * @param body citaDto
     * @param idVeterinario idVeterinario
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public crearCitaUsingPOST(body: CitaServiciosArca, idVeterinario: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public crearCitaUsingPOST(body: CitaServiciosArca, idVeterinario: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public crearCitaUsingPOST(body: CitaServiciosArca, idVeterinario: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public crearCitaUsingPOST(body: CitaServiciosArca, idVeterinario: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling crearCitaUsingPOST.');
        }

        if (idVeterinario === null || idVeterinario === undefined) {
            throw new Error('Required parameter idVeterinario was null or undefined when calling crearCitaUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('post',`${this.basePath}/citas/${encodeURIComponent(String(idVeterinario))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * eliminarCita
     * 
     * @param idCita idCita
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public eliminarCitaUsingDELETE(idCita?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public eliminarCitaUsingDELETE(idCita?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public eliminarCitaUsingDELETE(idCita?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public eliminarCitaUsingDELETE(idCita?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (idCita !== undefined && idCita !== null) {
            queryParameters = queryParameters.set('idCita', <any>idCita);
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/citas/${encodeURIComponent(String(idCita))}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getAllCitasActivasPorCliente
     * 
     * @param cedula cedula
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllCitasActivasPorClienteUsingGET(cedula: string, observe?: 'body', reportProgress?: boolean): Observable<Array<CitaArcaExtends>>;
    public getAllCitasActivasPorClienteUsingGET(cedula: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<CitaArcaExtends>>>;
    public getAllCitasActivasPorClienteUsingGET(cedula: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<CitaArcaExtends>>>;
    public getAllCitasActivasPorClienteUsingGET(cedula: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (cedula === null || cedula === undefined) {
            throw new Error('Required parameter cedula was null or undefined when calling getAllCitasActivasPorClienteUsingGET.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<CitaArcaExtends>>('get',`${this.basePath}/citas/by-cliente/${encodeURIComponent(String(cedula))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getAllCitas
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllCitasUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<CitaArcaExtends>>;
    public getAllCitasUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<CitaArcaExtends>>>;
    public getAllCitasUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<CitaArcaExtends>>>;
    public getAllCitasUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<CitaArcaExtends>>('get',`${this.basePath}/citas/`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getAllDetallesCita
     * 
     * @param idCita idCita
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllDetallesCitaUsingGET(idCita: number, observe?: 'body', reportProgress?: boolean): Observable<Array<DetalleCitaDto>>;
    public getAllDetallesCitaUsingGET(idCita: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<DetalleCitaDto>>>;
    public getAllDetallesCitaUsingGET(idCita: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<DetalleCitaDto>>>;
    public getAllDetallesCitaUsingGET(idCita: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idCita === null || idCita === undefined) {
            throw new Error('Required parameter idCita was null or undefined when calling getAllDetallesCitaUsingGET.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<DetalleCitaDto>>('get',`${this.basePath}/citas/detallesCita/${encodeURIComponent(String(idCita))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getCitaPorId
     * 
     * @param idCita idCita
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getCitaPorIdUsingGET(idCita: number, observe?: 'body', reportProgress?: boolean): Observable<CitaArcaExtends>;
    public getCitaPorIdUsingGET(idCita: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CitaArcaExtends>>;
    public getCitaPorIdUsingGET(idCita: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CitaArcaExtends>>;
    public getCitaPorIdUsingGET(idCita: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idCita === null || idCita === undefined) {
            throw new Error('Required parameter idCita was null or undefined when calling getCitaPorIdUsingGET.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<CitaArcaExtends>('get',`${this.basePath}/citas/${encodeURIComponent(String(idCita))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getCitasPorFechaAgenda
     * 
     * @param fechaAgenda fechaAgenda
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getCitasPorFechaAgendaUsingGET(fechaAgenda: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getCitasPorFechaAgendaUsingGET(fechaAgenda: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getCitasPorFechaAgendaUsingGET(fechaAgenda: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getCitasPorFechaAgendaUsingGET(fechaAgenda: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (fechaAgenda === null || fechaAgenda === undefined) {
            throw new Error('Required parameter fechaAgenda was null or undefined when calling getCitasPorFechaAgendaUsingGET.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/citas/fecha/${encodeURIComponent(String(fechaAgenda))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getCitasPorVeterinario
     * 
     * @param idVeterinario idVeterinario
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getCitasPorVeterinarioUsingGET(idVeterinario: number, observe?: 'body', reportProgress?: boolean): Observable<Array<CitaArcaExtends>>;
    public getCitasPorVeterinarioUsingGET(idVeterinario: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<CitaArcaExtends>>>;
    public getCitasPorVeterinarioUsingGET(idVeterinario: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<CitaArcaExtends>>>;
    public getCitasPorVeterinarioUsingGET(idVeterinario: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idVeterinario === null || idVeterinario === undefined) {
            throw new Error('Required parameter idVeterinario was null or undefined when calling getCitasPorVeterinarioUsingGET.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<CitaArcaExtends>>('get',`${this.basePath}/citas/veterinario/${encodeURIComponent(String(idVeterinario))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getHorasDisponibles
     * 
     * @param fechaAgenda fechaAgenda
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getHorasDisponiblesUsingGET(fechaAgenda: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getHorasDisponiblesUsingGET(fechaAgenda: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getHorasDisponiblesUsingGET(fechaAgenda: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getHorasDisponiblesUsingGET(fechaAgenda: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (fechaAgenda === null || fechaAgenda === undefined) {
            throw new Error('Required parameter fechaAgenda was null or undefined when calling getHorasDisponiblesUsingGET.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/citas/horas-disponibles/${encodeURIComponent(String(fechaAgenda))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * modificarCita
     * 
     * @param body citaDto
     * @param idCita idCita
     * @param idVeterinario idVeterinario
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public modificarCitaUsingPUT(body: CitaServiciosArca, idCita: number, idVeterinario: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public modificarCitaUsingPUT(body: CitaServiciosArca, idCita: number, idVeterinario: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public modificarCitaUsingPUT(body: CitaServiciosArca, idCita: number, idVeterinario: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public modificarCitaUsingPUT(body: CitaServiciosArca, idCita: number, idVeterinario: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling modificarCitaUsingPUT.');
        }

        if (idCita === null || idCita === undefined) {
            throw new Error('Required parameter idCita was null or undefined when calling modificarCitaUsingPUT.');
        }

        if (idVeterinario === null || idVeterinario === undefined) {
            throw new Error('Required parameter idVeterinario was null or undefined when calling modificarCitaUsingPUT.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('put',`${this.basePath}/citas/${encodeURIComponent(String(idCita))}/${encodeURIComponent(String(idVeterinario))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
