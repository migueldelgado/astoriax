import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierService } from 'app/@core/data/supplier.service';
import { ThemeModule } from '../../../@theme/theme.module';
import { ProviderDetailComponent } from './provider-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

class MockSupplierService {
  public getSuppliers(){};
  public getInvoicesBySupplier(){};
  public getInvoicesReport(){};
}

const mockActivatedRoute = {
  params: { subscribe: () => '' }
}

class MockRouter {
  navigate(){};
}

class MockNgbModal {
  open(){};
}

describe('ProviderDetailComponent', () => {
  let component: ProviderDetailComponent;
  let fixture: ComponentFixture<ProviderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderDetailComponent ],
      imports: [ThemeModule],
      providers: [
        { provide: SupplierService, useClass: MockSupplierService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useClass: MockRouter },
        { provide: NgbModal, useClass: MockNgbModal }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
