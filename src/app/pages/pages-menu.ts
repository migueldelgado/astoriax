import {NbMenuItem} from '@nebular/theme';

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

        link: '/pages/store/inventories',
        children: [
          {
            title: 'Inventarios Diarios',
            link: '/pages/store/inventories/daily',
          }, {
            title: 'Prestamos',
            link: '/pages/store/inventories/loan',
          }, {
            title: 'Compras',
            link: '/pages/store/inventories/purchases',
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
    link: '/11ertert',
    children: [
      {
        title: 'Costos Variables',
        link: '/temp1',
      },
      {
        title: 'Costos Fijos',
        link: '/temp2',
      },
      {
        title: 'Gastos Generales',
        link: '/temp3',
      },
    ],
  },
  {
    title: 'Contabilidad y finanzas',
    icon: 'nb-bar-chart',
    link: '/swe88',
    children: [
      {
        title: 'Proveedor',
        link: '/temp4',
      },
      {
        title: 'Tesoreria',
        link: '/temp5',
      },
    ],
  },
  {
    title: 'Administracion RRHH',
    icon: 'nb-person',
    link: '/kskjsjh',
    children: [
      {
        title: 'Proveedores',
        link: '/temp6',
      },
      {
        title: 'Locales',
        link: '/temp7',
      },
      {
        title: 'Empleados',
        link: '/temp8',
      },
    ],
  },
  {
    title: 'Ventas',
    icon: 'fa fa-book',
    link: '/55k34j',
    children: [
      {
        title: 'Cheque Restaurant',
        link: '/temp9',
      },
      {
        title: 'Valores de Cheques',
        link: '/temp10',
      },
      {
        title: 'Ingreso Venta Diaria',
        link: '/temp11',
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
