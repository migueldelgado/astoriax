const permissions = [
  {
    code: 'INS',
    description: 'Insumos',
    level: 'page',
  },
  {
    code: 'AINS',
    description: 'Agregar Insumos',
    level: 'action',
  },
  {
    code: 'MINS',
    description: 'Modificar Insumo',
    level: 'action',
  },
  {
    code: 'EINS',
    description: 'Eliminar Insumo',
    level: 'action',
  },
  {
    code: 'REC',
    description: 'Recetas',
    level: 'page',
  },
  {
    code: 'AREC',
    description: 'Agregar Recetas',
    level: 'action',
  },
  {
    code: 'MREC',
    description: 'Modificar Recetas',
    level: 'action',
  },
  {
    code: 'EREC',
    description: 'Eliminar Recetas',
    level: 'action',
  },
  {
    code: 'INV',
    description: 'Inventario Diario',
    level: 'page',
  },
  {
    code: 'AINV',
    description: 'Agregar Invetario Diario',
    level: 'action',
  },
  {
    code: 'MINV',
    description: 'Modificar Inventario Diario',
    level: 'action',
  },
  {
    code: 'EINV',
    description: 'Elimiar Inventario Diario',
    level: 'action',
  },
  {
    code: 'COM',
    description: 'Compras',
    level: 'page',
  },
  {
    code: 'ACOM',
    description: 'Agregar Compras',
    level: 'action',
  },
  {
    code: 'MCOM',
    description: 'Modificar Compras',
    level: 'action',
  },
  {
    code: 'ECOM',
    description: 'Eliminar Compras',
    level: 'action',
  },
  {
    code: 'AUD',
    description: 'Auditorias',
    level: 'page',
  },
  {
    code: 'AAUD',
    description: 'Agregar Auditorias',
    level: 'action',
  },
  {
    code: 'MAUD',
    description: 'Modificar Auditorias',
    level: 'action',
  },
  {
    code: 'EAUD',
    description: 'Eliminar Auditorias',
    level: 'action',
  },
  {
    code: 'RES',
    description: 'Resumen',
    level: 'page',
  },
  {
    code: 'VAR',
    description: 'Costos Variables',
    level: 'page',
  },
  {
    code: 'AVAR',
    description: 'Agregar Costos Variables',
    level: 'action',
  },
  {
    code: 'MVAR',
    description: 'Modificar Costos variables',
    level: 'action',
  },
  {
    code: 'EVAR',
    description: 'Eliminar Costos Variables',
    level: 'action',
  },
  {
    code: 'FIJ',
    description: 'Costos Fijos',
    level: 'page',
  },
  {
    code: 'AFIJ',
    description: 'Agregar Costos Fijos',
    level: 'action',
  },
  {
    code: 'MFIJ',
    description: 'Modificar Costos Fijos',
    level: 'action',
  },
  {
    code: 'EFIJ',
    description: 'Eliminar Costos Fijos',
    level: 'action',
  },
  {
    code: 'GEN',
    description: 'Gastos Generales',
    level: 'page',
  },
  {
    code: 'AGEN',
    description: 'Agregar Gastos Generales',
    level: 'action',
  },
  {
    code: 'MGEN',
    description: 'Modificar Gastos Generales',
    level: 'action',
  },
  {
    code: 'EGEN',
    description: 'Eliminar Gastos Generales',
    level: 'action',
  },
  {
    code: 'PRO',
    description: 'Proveedores',
    level: 'page',
  },
  {
    code: 'APRO',
    description: 'Agregar Proveedores',
    level: 'action',
  },
  {
    code: 'MPRO',
    description: 'Modificar Proveedores',
    level: 'action',
  },
  {
    code: 'EPRO',
    description: 'Eliminar Proveedores',
    level: 'action',
  },
  {
    code: 'LOC',
    description: 'Locales',
    level: 'page',
  },
  {
    code: 'ALOC',
    description: 'Agregar Locales',
    level: 'action',
  },
  {
    code: 'MLOC',
    description: 'Modificar Locales',
    level: 'action',
  },
  {
    code: 'ELOC',
    description: 'Eliminar Locales',
    level: 'action',
  },
  {
    code: 'EMP',
    description: 'Empleados',
    level: 'page',
  },
  {
    code: 'AEMP',
    description: 'Agregar Empleados',
    level: 'action',
  },
  {
    code: 'MEMP',
    description: 'Modificar Empleados',
    level: 'action',
  },
  {
    code: 'EEMP',
    description: 'Eliminar Empleados',
    level: 'action',
  },
  {
    code: 'CHQ',
    description: 'Cheque Restaurant',
    level: 'page',
  },
  {
    code: 'ACHQ',
    description: 'Agregar Cheque Restaurant',
    level: 'action',
  },
  {
    code: 'MCHQ',
    description: 'Modificar Cheque Restaurant',
    level: 'action',
  },
  {
    code: 'ECHQ',
    description: 'Eliminar Cheque Restaurant',
    level: 'action',
  },
  {
    code: 'VAL',
    description: 'Valores Cheques',
    level: 'page',
  },
  {
    code: 'AVAL',
    description: 'Agregar Valores Cheques',
    level: 'action',
  },
  {
    code: 'MVAL',
    description: 'Modificar Valores Cheques',
    level: 'action',
  },
  {
    code: 'EVAL',
    description: 'Eliminar Valores Cheques',
    level: 'action',
  },
  {
    code: 'IVD',
    description: 'Ingreso Venta Diaria',
    level: 'page',
  },
  {
    code: 'AIVD',
    description: 'Agregar Venta Diaria',
    level: 'action',
  },
  {
    code: 'MIVD',
    description: 'Modificar Venta Diaria',
    level: 'action',
  },
  {
    code: 'EIVD',
    description: 'Eliminar Venta Diaria',
    level: 'action',
  },
  {
    code: 'RCR',
    description: 'Reporte Cruzado',
    level: 'page',
  },
  {
    code: 'ROL',
    description: 'Roles',
    level: 'page',
  },
  {
    code: 'AROL',
    description: 'Agregar Roles',
    level: 'action',
  },
  {
    code: 'MROL',
    description: 'Modificar Roles',
    level: 'action',
  },
  {
    code: 'EROL',
    description: 'Eliminar Roles',
    level: 'action',
  },
];

export class AppConfig {
  public static API_ENDPOINT = 'http://api.astoria.cl/api/';
  public static IMAGE_PREFIX = 'http://api.astoria.cl/storage';
  public static API_ENDPOINT_OLD = '/api';

  public static STORES = AppConfig.API_ENDPOINT + 'stores/';

  public static permissions = permissions.reduce((acc, p) => {
    return {
      ...acc,
      [p.code]: p,
    };
  }, {});
}
