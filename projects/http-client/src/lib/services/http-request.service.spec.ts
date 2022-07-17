import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HttpMethod } from '../enums/http-method.enum';
import { HttpRequestClientServices } from './http-request.service';
import { TestBed } from '@angular/core/testing';
import { mockHttpParameters } from './../../../test/http-parameters.mock';

describe('HttpRequestClientServices', () => {
  let service: HttpRequestClientServices;
  let httpMock: HttpTestingController;

  const dummyRequest = [{ test: 'value1' }, { test: 'value2' }];

  interface mockReturnHttp {
    test: string;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    });
    service = TestBed.inject(HttpRequestClientServices);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    httpMock.verify();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should execute get with headerParams', () => {
    service
      .execute<mockReturnHttp[]>(HttpMethod.Get, '/', mockHttpParameters)
      .subscribe({
        next: (x: mockReturnHttp[]) => {
          expect(x.length).toBe(2);
          expect(x).toEqual(dummyRequest);
        },
      });
    const req = httpMock.expectOne('/');
    expect(req.request.method).toBe(HttpMethod.Get);
    req.flush(dummyRequest);
  });

  test('should execute get get with headerParams and queryString', () => {
    service
      .execute<mockReturnHttp[]>(
        HttpMethod.Get,
        '/',
        mockHttpParameters,
        mockHttpParameters
      )
      .subscribe({
        next: (x: mockReturnHttp[]) => {
          expect(x.length).toBe(2);
          expect(x).toEqual(dummyRequest);
        },
      });
    const req = httpMock.expectOne('/?query1=valuQuery1&query2=valueQuery2');
    expect(req.request.method).toBe(HttpMethod.Get);
    req.flush(dummyRequest);
  });

  test('should execute delete', () => {
    const message = 'successfully deleted';
    service
      .execute<string>(HttpMethod.Delete, '/', undefined, mockHttpParameters)
      .subscribe({
        next: (x: string) => {
          expect(x.length).toBe(message.length);
          expect(x).toEqual(message);
        },
      });
    const req = httpMock.expectOne('/?query1=valuQuery1&query2=valueQuery2');
    expect(req.request.method).toBe(HttpMethod.Delete);
    req.flush(message);
  });

  test('should execute post', () => {
    service.execute<mockReturnHttp[]>(HttpMethod.Post, '/').subscribe({
      next: (x: mockReturnHttp[]) => {
        expect(x.length).toBe(2);
        expect(x).toEqual(dummyRequest);
      },
    });
    const req = httpMock.expectOne('/');
    expect(req.request.method).toBe(HttpMethod.Post);
    req.flush(dummyRequest);
  });

  test('should execute patch', () => {
    service.execute<mockReturnHttp[]>(HttpMethod.Patch, '/').subscribe({
      next: (x: mockReturnHttp[]) => {
        expect(x.length).toBe(2);
        expect(x).toEqual(dummyRequest);
      },
    });
    const req = httpMock.expectOne('/');
    expect(req.request.method).toBe(HttpMethod.Patch);
    req.flush(dummyRequest);
  });

  test('should execute put', () => {
    service.execute<mockReturnHttp[]>(HttpMethod.Put, '/').subscribe({
      next: (x: mockReturnHttp[]) => {
        expect(x.length).toBe(2);
        expect(x).toEqual(dummyRequest);
      },
    });
    const req = httpMock.expectOne('/');
    expect(req.request.method).toBe(HttpMethod.Put);
    req.flush(dummyRequest);
  });

  test('should execute method not supported', () => {
    service.execute<mockReturnHttp[]>(HttpMethod.Head, '/').subscribe({
      next: (x: mockReturnHttp[]) => {
        expect(x.length).toBe(2);
        expect(x).toEqual(dummyRequest);
      },
    });
    httpMock.expectNone('/');
  });

  test('should add parameters in header', () => {
    const header = service['addHeadersParams']({}, mockHttpParameters);
    expect(header).toEqual({ query1: 'valuQuery1', query2: 'valueQuery2' });
  });

  test('should be a url with parameters when informed queryString', () => {
    const url = service['urlParams']('/url', mockHttpParameters);
    expect(url).toBe('/url?query1=valuQuery1&query2=valueQuery2');
  });

  test('should be a url without parameters when not informed queryString', () => {
    const url = service['urlParams']('/url', undefined);
    expect(url).toBe('/url');
  });
});
