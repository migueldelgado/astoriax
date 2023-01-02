import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs/observable/of';

import { ThemeModule } from '../../../@theme/theme.module';

import { SupplierService } from 'app/@core/data/supplier.service';
import { ProvidersComponent } from './providers.component';

describe('ProvidersComponent', () => {
  let component: ProvidersComponent;
  let fixture: ComponentFixture<ProvidersComponent>;
  let supplierServiceMock: any;

  beforeEach(async(() => {
    supplierServiceMock = jasmine.createSpyObj(
      'SupplierService',
      [
        'getSupplierInvoicesByYear',
        'getTotalInvoicesReport'
      ]
    );

    supplierServiceMock.getSupplierInvoicesByYear.and.returnValue(of({
      purchasesBySupplier: []
    }));
    supplierServiceMock.getTotalInvoicesReport.and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [ ProvidersComponent ],
      imports: [
        ThemeModule,
        RouterTestingModule
      ],
      providers: [
        { provide: SupplierService, useValue: supplierServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('Should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
