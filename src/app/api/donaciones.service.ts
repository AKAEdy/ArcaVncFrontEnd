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

import { DonacionDtoExtends } from '../model/donacionDtoExtends';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class DonacionesService {

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
     * crearDonacion
     * 
     * @param descripcion 
     * @param idPersona idPersona
     * @param cantidad 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public crearDonacionUsingPOST(descripcion: string, idPersona: number, cantidad?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public crearDonacionUsingPOST(descripcion: string, idPersona: number, cantidad?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public crearDonacionUsingPOST(descripcion: string, idPersona: number, cantidad?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public crearDonacionUsingPOST(descripcion: string, idPersona: number, cantidad?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (descripcion === null || descripcion === undefined) {
            throw new Error('Required parameter descripcion was null or undefined when calling crearDonacionUsingPOST.');
        }

        if (idPersona === null || idPersona === undefined) {
            throw new Error('Required parameter idPersona was null or undefined when calling crearDonacionUsingPOST.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (cantidad !== undefined && cantidad !== null) {
            queryParameters = queryParameters.set('cantidad', <any>cantidad);
        }
        if (descripcion !== undefined && descripcion !== null) {
            queryParameters = queryParameters.set('descripcion', <any>descripcion);
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

        return this.httpClient.request<any>('post',`${this.basePath}/donaciones/${encodeURIComponent(String(idPersona))}`,
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
     * editarDonacion
     * 
     * @param descripcion 
     * @param idDonacion idDonacion
     * @param idPersona idPersona
     * @param cantidad 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public editarDonacionUsingPUT(descripcion: string, idDonacion: number, idPersona: number, cantidad?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public editarDonacionUsingPUT(descripcion: string, idDonacion: number, idPersona: number, cantidad?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public editarDonacionUsingPUT(descripcion: string, idDonacion: number, idPersona: number, cantidad?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public editarDonacionUsingPUT(descripcion: string, idDonacion: number, idPersona: number, cantidad?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (descripcion === null || descripcion === undefined) {
            throw new Error('Required parameter descripcion was null or undefined when calling editarDonacionUsingPUT.');
        }

        if (idDonacion === null || idDonacion === undefined) {
            throw new Error('Required parameter idDonacion was null or undefined when calling editarDonacionUsingPUT.');
        }

        if (idPersona === null || idPersona === undefined) {
            throw new Error('Required parameter idPersona was null or undefined when calling editarDonacionUsingPUT.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (cantidad !== undefined && cantidad !== null) {
            queryParameters = queryParameters.set('cantidad', <any>cantidad);
        }
        if (descripcion !== undefined && descripcion !== null) {
            queryParameters = queryParameters.set('descripcion', <any>descripcion);
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

        return this.httpClient.request<any>('put',`${this.basePath}/donaciones/${encodeURIComponent(String(idPersona))}/${encodeURIComponent(String(idDonacion))}/`,
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
     * eliminarDonacion
     * 
     * @param idDonacion idDonacion
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public eliminarDonacionUsingDELETE(idDonacion: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public eliminarDonacionUsingDELETE(idDonacion: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public eliminarDonacionUsingDELETE(idDonacion: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public eliminarDonacionUsingDELETE(idDonacion: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idDonacion === null || idDonacion === undefined) {
            throw new Error('Required parameter idDonacion was null or undefined when calling eliminarDonacionUsingDELETE.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/donaciones/${encodeURIComponent(String(idDonacion))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getAllDonacionesPorPersona
     * 
     * @param idPersona idPersona
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllDonacionesPorPersonaUsingGET(idPersona: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getAllDonacionesPorPersonaUsingGET(idPersona: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getAllDonacionesPorPersonaUsingGET(idPersona: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getAllDonacionesPorPersonaUsingGET(idPersona: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idPersona === null || idPersona === undefined) {
            throw new Error('Required parameter idPersona was null or undefined when calling getAllDonacionesPorPersonaUsingGET.');
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

        return this.httpClient.request<any>('get',`${this.basePath}/donaciones/all/${encodeURIComponent(String(idPersona))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getAllDonaciones
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllDonacionesUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<DonacionDtoExtends>>;
    public getAllDonacionesUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<DonacionDtoExtends>>>;
    public getAllDonacionesUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<DonacionDtoExtends>>>;
    public getAllDonacionesUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<Array<DonacionDtoExtends>>('get',`${this.basePath}/donaciones/all`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getDonacionPorId
     * 
     * @param idDonacion idDonacion
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getDonacionPorIdUsingGET(idDonacion: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getDonacionPorIdUsingGET(idDonacion: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getDonacionPorIdUsingGET(idDonacion: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getDonacionPorIdUsingGET(idDonacion: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idDonacion === null || idDonacion === undefined) {
            throw new Error('Required parameter idDonacion was null or undefined when calling getDonacionPorIdUsingGET.');
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

        return this.httpClient.request<any>('get',`${this.basePath}/donaciones/${encodeURIComponent(String(idDonacion))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
