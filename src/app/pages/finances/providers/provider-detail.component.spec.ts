import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';

import { of } from 'rxjs/observable/of';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ThemeModule } from '../../../@theme/theme.module';

import { SupplierService } from 'app/@core/data/supplier.service';
import { ProviderDetailComponent } from './provider-detail.component';

describe('ProviderDetailComponent', () => {
  let component: ProviderDetailComponent;
  let fixture: ComponentFixture<ProviderDetailComponent>;
  let supplierServiceMock: any;
  let ngbModalMock: any;

  beforeEach(async(() => {
    ngbModalMock = jasmine.createSpyObj('NgbModal', ['open']);
    supplierServiceMock = jasmine.createSpyObj(
      'SupplierService',
      [
        'getSuppliers',
        'getInvoicesBySupplier',
        'getInvoicesReport'
      ]
    );
    supplierServiceMock.getSuppliers.and.returnValue(of([
      {name: 'Miguel'}
    ]));
    supplierServiceMock.getInvoicesBySupplier.and.returnValue(of({invoices: [
      {
        amount: 5000,
        amount_paid: 0,
        credit_invoice: null,
        deleted_at: null,
        document_number: 123,
        id: 59,
        is_paid: 0,
        payment_record: null,
        store_id: 1,
        supplier_id: 1
      }
    ]}));
    supplierServiceMock.getInvoicesReport.and.returnValue(of(''));
    TestBed.configureTestingModule({
      declarations: [ ProviderDetailComponent ],
      imports: [
        ThemeModule,
        RouterTestingModule
      ],
      providers: [
        { provide: SupplierService, useValue: supplierServiceMock },
        { provide: NgbModal, useValue: ngbModalMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should render label Proveedor, Mes and Año', () => {
    const compile = fixture.debugElement.nativeElement;
    expect(compile.querySelector('label').textContent).toContain('Proveedor');
  });

  it('Should render label Proveedor', () => {
    const compile = fixture.debugElement;
    let arrayOfLabels: DebugElement[] = compile.queryAll(By.css('label'));
    arrayOfLabels.filter((debugElement: DebugElement) => debugElement.nativeElement.textContent === 'Proveedor');
    expect(arrayOfLabels.length).toBeTruthy();
  });

  it('Should render label Mes', () => {
    const compile = fixture.debugElement;
    let arrayOfLabels = compile.queryAll(By.css('label'));
    arrayOfLabels.filter((debugElement: DebugElement) => debugElement.nativeElement.textContent === 'Mes');
    expect(arrayOfLabels.length).toBeTruthy();
  });

  it('Should render label Año', () => {
    const compile = fixture.debugElement;
    let arrayOfElements = compile.queryAll(By.css('label'));
    arrayOfElements.filter((debugElement: DebugElement) => debugElement.nativeElement.textContent === 'Año');
    expect(arrayOfElements.length).toBeTruthy();
  });

  it('Should render one table', () => {
    const compile = fixture.debugElement;
    let arrayOfElements = compile.queryAll(By.css('table'));
    expect(arrayOfElements.length).toBe(1);
  });

  it('Should contain in correct route', () => {
    const location = TestBed.get(Location);
    expect(location.path()).toBe('');
  });

  it('Should go to correct route when clicking button Cancel', () => {
    const location = TestBed.get(Location);
    const button: HTMLButtonElement = fixture.debugElement.query(By.css('.btn-cancel')).nativeElement;
    button.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/');
    });
  });

  it('Should supliers and invoices be 1 length', () => {
    expect(component.suppliers.length).toBe(1);
    expect(component.invoices.length).toBe(1);
  });

  it('Should call getInvoicesReport() when click on PDF button', () => {
    const location = TestBed.get(Location);
    const pdfButton: HTMLButtonElement = fixture.debugElement.query(By.css('.pdf-report')).nativeElement;
    pdfButton.click();
    expect(supplierServiceMock.getInvoicesReport).toHaveBeenCalled();
  });
});
