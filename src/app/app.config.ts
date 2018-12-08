const permissions = [
  { code: 'INS', type: 'page', label: 'Insumos' },
  { code: 'AINS', type: 'action', label: 'Agregar Insumos' },
  { code: 'MINS', type: 'action', label: 'Modificar Insumo' },
  { code: 'EINS', type: 'action', label: 'Eliminar Insumo' },
  { code: 'REC', type: 'page', label: 'Recetas' },
  { code: 'AREC', type: 'action', label: 'Agregar Recetas' },
  { code: 'MREC', type: 'action', label: 'Modificar Recetas' },
  { code: 'EREC', type: 'action', label: 'Eliminar Recetas' },
  // Here
  { code: 'INV', type: 'page', label: 'Inventario Diario' },
  { code: 'AINV', type: 'action', label: 'Agregar Invetario Diario' },
  { code: 'MINV', type: 'action', label: 'Modificar Inventario Diario' },
  { code: 'EINV', type: 'action', label: 'Elimiar Inventario Diario' },
  { code: 'COM', type: 'page', label: 'Compras' },
  { code: 'ACOM', type: 'action', label: 'Agregar Compras' },
  { code: 'MCOM', type: 'action', label: 'Modificar Compras' },
  { code: 'ECOM', type: 'action', label: 'Eliminar Compras' },
  { code: 'AUD', type: 'page', label: 'Auditorias' },
  { code: 'AAUD', type: 'action', label: 'Agregar Auditorias' },
  { code: 'MAUD', type: 'action', label: 'Modificar Auditorias' },
  { code: 'EAUD', type: 'action', label: 'Eliminar Auditorias' },
  { code: 'RES', type: 'page', label: 'Resumen' },
  { code: 'VAR', type: 'page', label: 'Costos Variables' },
  { code: 'AVAR', type: 'action', label: 'Agregar Costos Variables' },
  { code: 'MVAR', type: 'action', label: 'Modificar Costos variables' },
  { code: 'EVAR', type: 'action', label: 'Eliminar Costos Variables' },
  { code: 'FIJ', type: 'page', label: 'Costos Fijos' },
  { code: 'AFIJ', type: 'action', label: 'Agregar Costos Fijos' },
  { code: 'MFIJ', type: 'action', label: 'Modificar Costos Fijos' },
  { code: 'EFIJ', type: 'action', label: 'Eliminar Costos Fijos' },
  { code: 'GEN', type: 'page', label: 'Gastos Generales' },
  { code: 'AGEN', type: 'action', label: 'Agregar Gastos Generales' },
  { code: 'MGEN', type: 'action', label: 'Modificar Gastos Generales' },
  { code: 'EGEN', type: 'action', label: 'Eliminar Gastos Generales' },
  { code: 'PRO', type: 'page', label: 'Proveedores' },
  { code: 'APRO', type: 'action', label: 'Agregar Proveedores' },
  { code: 'MPRO', type: 'action', label: 'Modificar Proveedores' },
  { code: 'EPRO', type: 'action', label: 'Eliminar Proveedores' },
  { code: 'LOC', type: 'page', label: 'Locales' },
  { code: 'ALOC', type: 'action', label: 'Agregar Locales' },
  { code: 'MLOC', type: 'action', label: 'Modificar Locales' },
  { code: 'ELOC', type: 'action', label: 'Eliminar Locales' },
  { code: 'EMP', type: 'page', label: 'Empleados' },
  { code: 'AEMP', type: 'action', label: 'Agregar Empleados' },
  { code: 'MEMP', type: 'action', label: 'Modificar Empleados' },
  { code: 'EEMP', type: 'action', label: 'Eliminar Empleados' },
  { code: 'CHQ', type: 'page', label: 'Cheque Restaurant' },
  { code: 'ACHQ', type: 'action', label: 'Agregar Cheque Restaurant' },
  { code: 'MCHQ', type: 'action', label: 'Modificar Cheque Restaurant' },
  { code: 'ECHQ', type: 'action', label: 'Eliminar Cheque Restaurant' },
  { code: 'VAL', type: 'page', label: 'Valores Cheques' },
  { code: 'AVAL', type: 'action', label: 'Agregar Valores Cheques' },
  { code: 'MVAL', type: 'action', label: 'Modificar Valores Cheques' },
  { code: 'EVAL', type: 'action', label: 'Eliminar Valores Cheques' },
  { code: 'IVD', type: 'page', label: 'Ingreso Venta Diaria' },
  { code: 'AIVD', type: 'action', label: 'Agregar Venta Diaria' },
  { code: 'MIVD', type: 'action', label: 'Modificar Venta Diaria' },
  { code: 'EIVD', type: 'action', label: 'Eliminar Venta Diaria' },
  { code: 'RCR', type: 'page', label: 'Reporte Cruzado' },
];

export class AppConfig {
  public static API_ENDPOINT = 'http://api.astoria.cl/api/';
  public static IMAGE_PREFIX = 'http://api.astoria.cl/storage';
  public static API_ENDPOINT_OLD = '/api';
  public static BASE_URL = 'http://homestead.test/';

  public static STORES = AppConfig.API_ENDPOINT + 'stores/';

  public static permissions = permissions.reduce((acc, p) => {
    return {
      ...acc,
      [p.code]: p,
    };
  }, {});
}
