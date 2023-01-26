import { NbMenuItem } from '@nebular/theme';

export abstract class NbMenuItemExtended extends NbMenuItem {
  permissions?: Array<string>;
  children?: NbMenuItemExtended[];
}

export const MENU_ITEMS: NbMenuItemExtended[] = [
  { title: 'Home', icon: 'nb-home', link: '/pages/dashboard', home: true }, // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  {
    title: 'Bodega',
    icon: 'nb-layout-centre',
    link: '/pages/store',
    children: [
      {
        title: 'Productos',
        link: '/pages/store/products',
        permissions: ['INS', 'REC'],
        children: [
          {
            title: 'Insumos',
            link: '/pages/store/products/supplies',
            permissions: ['INS'],
          },
          {
            title: 'Recetas',
            link: '/pages/store/products/recipes',
            permissions: ['REC'],
          },
        ],
      },
      {
        title: 'Inventarios',
        link: '/pages/inventories',
        permissions: ['COM', 'INV', 'SAL', 'PSS'],
        children: [
          {
            title: 'Inventarios Diarios',
            link: '/pages/inventories/daily',
            permissions: ['INV'],
          },
          {
            title: 'Facturas de Compra',
            link: '/pages/inventories/purchases',
            permissions: ['COM'],
          },
          {
            title: 'Salidas',
            link: '/pages/inventories/outputs',
            permissions: ['SAL'],
          },
          {
            title: 'Procesos',
            link: '/pages/inventories/processes',
            permissions: ['PSS'],
          },
          { title: 'Notas de Credito', link: '/pages/inventories/credits' },
        ],
      },
    ],
  },
  {
    title: 'Auditorias',
    icon: 'nb-list',
    link: '/pages/audits',
    permissions: ['AUD'],
    children: [
      {
        title: 'Auditorias',
        link: '/pages/audits/audit-list',
        permissions: ['AUD'],
      },
      {
        title: 'Resumen',
        link: '/pages/audits/overview',
        permissions: ['AUD'],
      },
    ],
  },
  // {
  //   title: 'Costos/Gastos',
  //   icon: 'ion-calculator',
  //   link: '/pages/costs',
  //   permissions: ['VAR', 'FIJ', 'GEN'],
  //   children: [
  //     { title: 'Costos Variables', link: '/pages/costs/variable-costs', permissions: ['VAR'] },
  //     { title: 'Costos Fijos', link: '/pages/costs/fixed-costs', permissions: ['FIJ'] },
  //     { title: 'Gastos Generales', link: '/pages/costs/general-expenses', permissions: ['GEN'] },
  //   ],
  // },
  {
    title: 'Contabilidad y finanzas',
    icon: 'nb-bar-chart',
    link: '/pages/finances',
    permissions: ['TES', 'RPR'],
    children: [
      {
        title: 'Factura Proveedores',
        link: '/pages/finances/providers',
        permissions: ['RPR'],
      },
      {
        title: 'Tesoreria',
        link: '/pages/finances/treasury',
        permissions: ['TES'],
      },
    ],
  },
  {
    title: 'Administracion',
    icon: 'nb-person',
    link: '/pages/hr',
    permissions: ['PRO', 'LOC', 'EMP', 'ROL'],
    children: [
      {
        title: 'Ficha Proveedores',
        link: '/pages/hr/suppliers',
        permissions: ['PRO'],
      },
      {
        title: 'Ficha Locales',
        link: '/pages/hr/stores',
        permissions: ['LOC'],
      },
      {
        title: 'Ficha Colaboradores',
        link: '/pages/hr/employees',
        permissions: ['EMP'],
      },
      { title: 'Roles', link: '/pages/hr/roles', permissions: ['ROL'] },
    ],
  },
  {
    title: 'Ventas',
    icon: 'fa fa-book',
    link: '/pages/sales',
    permissions: ['CHQ', 'VAL', 'IVD'],
    children: [
      //TODO: delete those pages completely
      // {
      //   title: 'Cheque Restaurant',
      //   link: '/pages/sales/cheques',
      //   permissions: ['CHQ'],
      // },
      // {
      //   title: 'Valores de Cheques',
      //   link: '/pages/sales/add-cheques',
      //   permissions: ['VAL'],
      // },
      {
        title: 'Ingreso Venta Diaria',
        link: '/pages/sales/daily-sales',
        permissions: ['IVD'],
      },
    ],
  },
  {
    title: 'Reportes',
    icon: 'nb-compose',
    link: '/pages/reports/reportes',
    permissions: ['RCR'],
  },
];
// permissions: ['COM'],
