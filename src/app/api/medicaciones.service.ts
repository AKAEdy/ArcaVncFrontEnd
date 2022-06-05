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

import { Medicacion } from '../model/medicacion';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class MedicacionesService {

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
     * crearMedicacion
     * 
     * @param idMedicamento idMedicamento
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public crearMedicacionUsingPOST(idMedicamento: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public crearMedicacionUsingPOST(idMedicamento: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public crearMedicacionUsingPOST(idMedicamento: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public crearMedicacionUsingPOST(idMedicamento: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idMedicamento === null || idMedicamento === undefined) {
            throw new Error('Required parameter idMedicamento was null or undefined when calling crearMedicacionUsingPOST.');
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

        return this.httpClient.request<any>('post',`${this.basePath}/medicaciones/${encodeURIComponent(String(idMedicamento))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * eliminarMedicacion
     * 
     * @param idMedicacion idMedicacion
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public eliminarMedicacionUsingDELETE(idMedicacion?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public eliminarMedicacionUsingDELETE(idMedicacion?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public eliminarMedicacionUsingDELETE(idMedicacion?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public eliminarMedicacionUsingDELETE(idMedicacion?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (idMedicacion !== undefined && idMedicacion !== null) {
            queryParameters = queryParameters.set('idMedicacion', <any>idMedicacion);
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

        return this.httpClient.request<any>('delete',`${this.basePath}/medicaciones/${encodeURIComponent(String(idMedicacion))}`,
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
     * getAllMedicacions
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllMedicacionsUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<Medicacion>>;
    public getAllMedicacionsUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Medicacion>>>;
    public getAllMedicacionsUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Medicacion>>>;
    public getAllMedicacionsUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<Array<Medicacion>>('get',`${this.basePath}/medicaciones/`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getMedicacionPorId
     * 
     * @param idMedicacion idMedicacion
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getMedicacionPorIdUsingGET(idMedicacion: number, observe?: 'body', reportProgress?: boolean): Observable<Medicacion>;
    public getMedicacionPorIdUsingGET(idMedicacion: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Medicacion>>;
    public getMedicacionPorIdUsingGET(idMedicacion: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Medicacion>>;
    public getMedicacionPorIdUsingGET(idMedicacion: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idMedicacion === null || idMedicacion === undefined) {
            throw new Error('Required parameter idMedicacion was null or undefined when calling getMedicacionPorIdUsingGET.');
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

        return this.httpClient.request<Medicacion>('get',`${this.basePath}/medicaciones/${encodeURIComponent(String(idMedicacion))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * modificarMedicacion
     * 
     * @param body medicacion
     * @param idMedicacion idMedicacion
     * @param idMedicamento idMedicamento
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public modificarMedicacionUsingPUT(body: Medicacion, idMedicacion: number, idMedicamento: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public modificarMedicacionUsingPUT(body: Medicacion, idMedicacion: number, idMedicamento: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public modificarMedicacionUsingPUT(body: Medicacion, idMedicacion: number, idMedicamento: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public modificarMedicacionUsingPUT(body: Medicacion, idMedicacion: number, idMedicamento: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling modificarMedicacionUsingPUT.');
        }

        if (idMedicacion === null || idMedicacion === undefined) {
            throw new Error('Required parameter idMedicacion was null or undefined when calling modificarMedicacionUsingPUT.');
        }

        if (idMedicamento === null || idMedicamento === undefined) {
            throw new Error('Required parameter idMedicamento was null or undefined when calling modificarMedicacionUsingPUT.');
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

        return this.httpClient.request<any>('put',`${this.basePath}/medicaciones/${encodeURIComponent(String(idMedicacion))}/${encodeURIComponent(String(idMedicamento))}`,
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
