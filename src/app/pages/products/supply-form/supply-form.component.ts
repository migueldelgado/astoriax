///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
///<reference path="../../../../../node_modules/@types/node/index.d.ts"/>
import { Component, OnInit } from '@angular/core';
import { SupplyService } from '../../../@core/data/supply.service';
import { SupplyTypeService } from '../../../@core/data/supply-type.service';
import { SupplyReportTypeService } from '../../../@core/data/supply-report-type.service';
import { SupplierService } from '../../../@core/data/supplier.service';
import { SupplyClassificationService } from '../../../@core/data/supply-classification.service';
import { UnitService } from '../../../@core/data/unit.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { parseErrroMessage } from '../../../@core/utils/error';
import { NbAuthService } from '../../../auth/services';

@Component({
  selector: 'ngx-supply-form',
  templateUrl: './supply-form.component.html',
  styles: [
    `
      nb-card {
        transform: translate3d(0, 0, 0);
      }
    `,
  ],
})
export class SupplyFormComponent implements OnInit {
  id: number;
  supplyClassifications$: Observable<any>;
  supplyReportTypes$: Observable<any>;
  supplyTypes$: Observable<any>;
  suppliers$: Observable<any>;
  units$: Observable<any>;
  statusTypes = [
    {
      id_status: 1,
      description: 'Activo',
    },
    {
      id_status: 0,
      description: 'Inactivo',
    },
  ];

  supplies: Array<any> = [];
  supplyMap = {};
  processSupplies: Array<any> = [];

  reportTypes = [
    {
      name: 'Insumo de ventas',
      value: 'IV',
    },
    {
      name: 'Insumo de procesos',
      value: 'IP',
    },
    {
      name: 'Insumo Operacional',
      value: 'IO',
    },
  ];

  units = ['Kilogramos', 'Unidades', 'Litros'];

  types = ['Directo', 'Indirecto'];

  classifications = ['Crítico', 'No Crítico'];
  // {"code":200,"data":
  // {"id":11,"supplier_id":1,"name":"completenge7","classification":"Completos",
  // "type":"this is a type","unit":"KG","report_type":"OV","stock_min":"20",
  // "show_in_daily_inventory":"1","show_in_process":"1","wastage_rate":"0.1","price":"500",
  // "deleted_at":null,"created_at":"2018-10-28 20:43:01","updated_at":"2018-10-28 20:43:01"}}
  data = {
    price: 0,
    name: '',
    stock_min: 0,
    wastage_rate: null,
    show_in_process: '0',
    show_in_daily_inventory: '0',
    supplier_id: null,
    report_type: null,
    classification: null,
    type: null,
    unit: null,
  };

  constructor(
    private authService: NbAuthService,
    private supplyService: SupplyService,
    private supplyTypeService: SupplyTypeService,
    private supplyReportTypeService: SupplyReportTypeService,
    private supplierService: SupplierService,
    private supplyClassificationService: SupplyClassificationService,
    private unitService: UnitService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    if (!this.hasPermission('INS')) {
      this.router.navigate(['/pages']);
      return;
    }
    this.supplyTypes$ = this.supplyTypeService.getAll();
    this.suppliers$ = this.supplierService.getAll(true);
    this.units$ = this.unitService.getAll();
    this.supplyReportTypes$ = this.supplyReportTypeService.getAll();
    this.supplyClassifications$ = this.supplyClassificationService.getAll();
    this.supplyService.getTotalList().subscribe((s: any) => {
      this.supplies = s.data;
    });
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }
      this.id = params.id;
      this.supplyService.findSupply(this.id).subscribe(result => {
        this.data = Object.assign(this.data, result.data);
        try {
          this.data.show_in_daily_inventory = result.data.show_in_daily_inventory.toString();
        } catch (e) {
          this.data.show_in_daily_inventory = '0';
        }

        try {
          this.data.show_in_process = result.data.show_in_process.toString();
        } catch (e) {
          this.data.show_in_process = '0';
        }
        if (!result.data.supplies) {
          return;
        }
        this.processSupplies = result.data.supplies.map(s => {
          return {
            supply_id: s.id,
            supply: s,
          };
        });
        this.recalculateSupplyMap();
      });
    });
  }

  onSubmit() {
    const data: any = {
      ...this.data,
      supplies: [],
    };
    if (this.data.show_in_process === '1') {
      data.supplies = Object.keys(this.supplyMap).map(id => {
        return {
          ingredient_id: id,
        };
      });
    }
    if (this.id) {
      this.update(data);
    } else {
      this.save(data);
    }
  }

  save(data) {
    if (!this.hasPermission('AINS')) {
      alert('No tienes permisos para agregar insumo');
      return;
    }
    this.supplyService.createSupply(data).subscribe(
      result => {
        this.cancel();
      },
      error => {
        let errorMessage = { message: 'Error al crear insumo' };
        try {
          if (error && error.error) {
            errorMessage = { message: parseErrroMessage(error) };
          } else {
            errorMessage = JSON.parse(error._body);
          }
        } catch (e) {}

        alert(errorMessage.message);
      },
    );
  }

  update(data) {
    if (!this.hasPermission('EINS')) {
      alert('No tienes permisos para editar insumo');
      return;
    }
    this.supplyService.updateSupply(this.id, data).subscribe(
      result => {
        this.cancel();
      },
      error => {
        let errorMessage = { message: 'Error al modificar insumo' };
        try {
          if (error && error.error) {
            errorMessage = { message: parseErrroMessage(error) };
          } else {
            errorMessage = JSON.parse(error._body);
          }
        } catch (e) {}

        alert(errorMessage.message);
      },
    );
  }

  cancel() {
    this.router.navigate(['/pages/store/products/supplies']);
  }

  hasPermission(key: string): boolean {
    return this.authService.hasPermission(key);
  }

  addSupply(e) {
    e.preventDefault();
    this.processSupplies.push({
      supply_id: '',
      supply: null,
    });
  }

  removeSupply(i) {
    this.processSupplies = [
      ...this.processSupplies.slice(0, i),
      ...this.processSupplies.slice(i + 1),
    ];
    this.recalculateSupplyMap();
  }

  onChangeSupply(id, index) {
    if (!id) {
      this.processSupplies[index].supply = null;
      this.processSupplies[index].supply_id = '';
      this.recalculateSupplyMap();
      return;
    }
    const supply = this.supplies.find(s => s.id === parseInt(id, 10));
    // const idSupply = this.data.supplies[index].id_supply;
    // console.log(e, this.data.supplies, idSupply);
    // const supply = this.supplies.find((s) => s.id_supply === idSupply);
    // this.data.supplies[index].supply = Object.assign({}, supply);
    this.processSupplies[index].supply = supply;
    this.processSupplies[index].supply_id = supply.id;
    this.recalculateSupplyMap();
  }

  recalculateSupplyMap() {
    this.supplyMap = this.processSupplies.reduce((acc, s) => {
      return {
        ...acc,
        [s.supply_id]: true,
      };
    }, {});
  }

  isInProcess() {
    return this.data.show_in_process === '1';
  }
}
