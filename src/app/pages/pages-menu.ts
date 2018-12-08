import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  // {
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
        children: [
          {
            title: 'Insumos',
            link: '/pages/store/products/supplies',
          },
          {
            title: 'Recetas',
            link: '/pages/store/products/recipes',
          },
        ],
      },
      {
        title: 'Inventarios',

        link: '/pages/inventories',
        children: [
          {
            title: 'Inventarios Diarios',
            link: '/pages/inventories/daily',
          },
          {
            title: 'Compras',
            link: '/pages/inventories/purchases',
          },
        ],
      },
    ],
  },
  {
    title: 'Auditorias',
    icon: 'nb-list',
    link: '/pages/audits',
    children: [
      {
        title: 'Auditorias',
        link: '/pages/audits/audit-list',
      },
      {
        title: 'Resumen',
        link: '/pages/audits/overview',
      },
    ],
  },
  {
    title: 'Costos/Gastos',
    icon: 'ion-calculator',
    link: '/pages/costs',
    children: [
      {
        title: 'Costos Variables',
        link: '/pages/costs/variable-costs',
      },
      {
        title: 'Costos Fijos',
        link: '/pages/costs/fixed-costs',
      },
      {
        title: 'Gastos Generales',
        link: '/pages/costs/general-expenses',
      },
    ],
  },
  {
    title: 'Contabilidad y finanzas',
    icon: 'nb-bar-chart',
    link: '/pages/finances',
    children: [
      {
        title: 'Proveedor',
        link: '/pages/finances/providers',
      },
      {
        title: 'Tesoreria',
        link: '/pages/finances/treasury',
      },
    ],
  },
  {
    title: 'Administracion RRHH',
    icon: 'nb-person',
    link: '/pages/hr',
    children: [
      {
        title: 'Proveedores',
        link: '/pages/hr/providers',
      },
      {
        title: 'Locales',
        link: '/pages/hr/stores',
      },
      {
        title: 'Empleados',
        link: '/pages/hr/employees',
      },
      {
        title: 'Roles',
        link: '/pages/hr/roles',
      },
    ],
  },
  {
    title: 'Ventas',
    icon: 'fa fa-book',
    link: '/pages/sales',
    children: [
      {
        title: 'Cheque Restaurant',
        link: '/pages/sales/cheques',
      },
      {
        title: 'Valores de Cheques',
        link: '/pages/sales/add-cheques',
      },
      {
        title: 'Ingreso Venta Diaria',
        link: '/pages/sales/daily-sales',
      },
    ],
  },
  {
    title: 'Reportes',
    icon: 'nb-compose',
    link: '/pages/reports',
    children: [
      // {
      //   title: 'Proyecciones',
      //   link: '/temp12',
      // },
      // {
      //   title: 'Estado de resultado',
      //   link: '/temp13',
      // },
      {
        title: 'Reporte Cruzado',
        link: '/pages/reports/reporte-cruzado',
      },
    ],
  },
];
