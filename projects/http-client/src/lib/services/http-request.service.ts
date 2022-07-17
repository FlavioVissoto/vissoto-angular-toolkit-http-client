import { Observable, throwError } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { HttpMethod } from '../enums/http-method.enum';
import { HttpParameters } from '../interfaces/http-parameters.interface';
import { Injectable } from '@angular/core';
import { httpMethodNotSupported } from './../message/messages';

/**
 * Classe utilizada para requisições HTTP.
 */
@Injectable({ providedIn: 'root' })
export class HttpRequestClientServices {
  constructor(private http: HttpClient) {}

  /**
   * Constrói uma solicitação HTTP de acordo com o tipo inforado e retorna a resposta com o tipo de objeto informado.
   * @param method Tipo de método utilizado na requisição.
   * @param path URL do endpoint para requisição.
   * @param headerParams Parametros utilizados na requisição que serão adicionados no cabeçalho da requisição.
   * @param queryParams Parametros utilizados na requisição como queryString.
   * @param bodyParams Parametros utilizado na requisição que serão adicionados no corpo do requisição.
   * @return Retorna um 'Observable' da resposta como um objeto informado.
   */
  execute<T>(
    method: HttpMethod,
    path: string,
    headerParams?: HttpParameters,
    queryParams?: HttpParameters,
    bodyParams?: object
  ): Observable<T> {
    const options = {
      headers: {} as HttpParameters,
    };
    if (headerParams) {
      this.addHeadersParams(options.headers, headerParams);
    }

    const url = encodeURI(this.urlParams(path, queryParams));

    switch (method) {
      case HttpMethod.Get:
        return this.http.get<T>(url, options);
      case HttpMethod.Delete:
        return this.http.delete<T>(url, options);
      case HttpMethod.Post:
        return this.http.post<T>(url, bodyParams, options);
      case HttpMethod.Patch:
        return this.http.patch<T>(url, bodyParams, options);
      case HttpMethod.Put:
        return this.http.put<T>(url, bodyParams, options);
      default:
        return throwError(() => new Error(httpMethodNotSupported));
    }
  }

  /**
   * Adiciona os parametros no cabeçalho da requisição.
   * @param header Cabeçado onde será acrescentado os parametros.
   * @param params Parametros que serão utilizados no cabeçalho da requisição.
   * @returns Retorna um objeto Headers com as informações de parametros.
   */
  private addHeadersParams(
    header: HttpParameters,
    params: HttpParameters
  ): HttpParameters {
    if (params) {
      for (const key in params) {
        header[key] = params[key];
      }
    }
    return header;
  }

  /**
   * Constói a URL com os parametros para requisição.
   * @param path URL que será chamada na requisição.
   * @param params Parametros utilizados na requisição como queryString.
   * @returns URL com os parametros para requisição
   */
  private urlParams(path: string, params?: HttpParameters): string {
    const urlParams: string[] = [];
    for (const key in params) {
      urlParams.push(`${key}=${params[key]}`);
    }
    return params ? `${path}?${urlParams.join('&')}` : path;
  }
}
