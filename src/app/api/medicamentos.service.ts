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

import { Medicamento } from '../model/medicamento';
import { PageMedicamento } from '../model/pageMedicamento';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class MedicamentosService {

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
     * create
     * 
     * @param body medicamento
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createUsingPOST2(body: Medicamento, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createUsingPOST2(body: Medicamento, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createUsingPOST2(body: Medicamento, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createUsingPOST2(body: Medicamento, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createUsingPOST2.');
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

        return this.httpClient.request<any>('post',`${this.basePath}/api/medicamentos/`,
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
     * delete
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteUsingDELETE2(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteUsingDELETE2(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteUsingDELETE2(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteUsingDELETE2(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteUsingDELETE2.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/api/medicamentos/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getById
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getByIdUsingGET2(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getByIdUsingGET2(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getByIdUsingGET2(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getByIdUsingGET2(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getByIdUsingGET2.');
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

        return this.httpClient.request<any>('get',`${this.basePath}/api/medicamentos/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getMedicamentos
     * 
     * @param page page
     * @param size size
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getMedicamentosUsingGET(page: number, size: number, observe?: 'body', reportProgress?: boolean): Observable<PageMedicamento>;
    public getMedicamentosUsingGET(page: number, size: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageMedicamento>>;
    public getMedicamentosUsingGET(page: number, size: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageMedicamento>>;
    public getMedicamentosUsingGET(page: number, size: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (page === null || page === undefined) {
            throw new Error('Required parameter page was null or undefined when calling getMedicamentosUsingGET.');
        }

        if (size === null || size === undefined) {
            throw new Error('Required parameter size was null or undefined when calling getMedicamentosUsingGET.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', <any>size);
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

        return this.httpClient.request<PageMedicamento>('get',`${this.basePath}/api/medicamentos/page`,
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
     * update
     * 
     * @param body medicamento
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateUsingPUT2(body: Medicamento, id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateUsingPUT2(body: Medicamento, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateUsingPUT2(body: Medicamento, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateUsingPUT2(body: Medicamento, id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateUsingPUT2.');
        }

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateUsingPUT2.');
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

        return this.httpClient.request<any>('put',`${this.basePath}/api/medicamentos/${encodeURIComponent(String(id))}`,
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
