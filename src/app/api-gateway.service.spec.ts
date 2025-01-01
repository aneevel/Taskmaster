import { TestBed } from '@angular/core/testing';

import { ApiGatewayService } from './api-gateway.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiGatewayService', () => {
  let service: ApiGatewayService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiGatewayService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to get status of API', () => {
    const response = { status: 0 };

    service.getAPIStatus().subscribe(response => {
        expect(response.status).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['API_URL']}`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });
});
