import { TestBed, inject, getTestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SupplierService } from 'app/@core/data/supplier.service';
import { NbAuthService } from 'app/auth';

describe('TemplateService', () => {
  let nbAuthServiceMock: any;
  let httpMock: HttpTestingController;
  let service: SupplierService;
  beforeEach(() => {
    nbAuthServiceMock = jasmine.createSpyObj('NbAuthService', ['getCurrentStore']);
    TestBed.configureTestingModule({
      providers: [
        SupplierService,
        { provide: NbAuthService, useValue: nbAuthServiceMock }
      ],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.get(SupplierService);
    httpMock = getTestBed().get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll()', () => {
    afterEach(() => {
      httpMock.verify();
    });

    it('Should call get', () => {
      const result = {
        data: [
          {name: 'Miguel'}
        ]
      };
      service.getAll().subscribe(suppliers => {
        expect(suppliers.length).toBe(1);
        expect(suppliers).toEqual(result.data);
      });
      const req = httpMock.expectOne('http://localhost:8080/api/suppliers');
      expect(req.request.method).toBe('GET');

      req.flush(result);
    });
  });
});
