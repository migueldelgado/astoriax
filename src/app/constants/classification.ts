export const CLASSIFICATION = {
    COSTOVARIABLE: {
        PROVEEDOR: {
            ID: 8,
            name: "COSTO VARIABLE - PROVEEDOR",
            LABEL: "PROVEEDOR",
            CODE: "CV"
        },
        FINIQUITO: {
            ID: 9,
            name: "COSTO VARIABLE - FINIQUITOS",
            LABEL: "FINIQUITO",
            CODE: "CV",
        }
    },
    COSTOFIJO: {
        IMPOSICIONES: {
            ID: 1,
            name: "COSTO FIJO - IMPOSICIONES",
            LABEL: "IMPOSICIONES",
            CODE: "CF"
        },
        SUELDO: {
            ID: 2,
            name: "COSTO FIJO - SUELDO",
            LABEL: "SUELDO",
            CODE: "CF",
        },
        CONTADOR: {
            ID: 3,
            name: "COSTO FIJO - CONTADOR",
            LABEL: "CONTADOR",
            CODE: "CF"
        },
        GAS: {
            ID: 4,
            name: "COSTO FIJO - GAS",
            LABEL: "GAS",
            CODE: "CF",
            common_services: 1,
    
        },
        LUZ: {
            ID: 5,
            name: "COSTO FIJO - LUZ",
            LABEL: "LUZ",
            CODE: "CF",
            common_services: 1,
    
        },
        AGUA: {
            ID: 6,
            name: "COSTO FIJO - AGUA",
            LABEL: "AGUA",
            CODE: "CF"
        },
        TELEFONO: {
            ID: 7,
            name: "COSTO FIJO - TELEFONO",
            LABEL: "TELEFONO",
            CODE: "CF"
        },
    },
    GASTOSGENERALES: {
        ARRIENDO: {
            ID: 10,
            name: "GASTO GENERAL - ARRIENDO",
            LABEL: "ARRIENDO",
            CODE: "GG",
        },
        SEGUROLOCAL: {
            ID: 11,
            name: "GASTO GENERAL - SEGURO DEL LOCAL",
            LABEL: "SEGURO LOCAL",
            CODE: "GG",
        },
        MARKETING: {
            ID: 12,
            name: "GASTO GENERAL - MARKETING Y PUBLICIDAD",
            LABEL: "MARKETING Y PUBLICIDAD",
            CODE: "GG",
        }, 
        GASTOSVARIOS: {
            ID: 13,
            name: "GASTO GENERAL - GASTOS VARIOS",
            LABEL: "GASTOS VARIOS",
            CODE: "GG",
        }, 
        CAJACHICA: {
            ID: 14,
            name: "GASTO GENERAL - CAJA CHICA",
            LABEL: "CAJA CHICA",
            CODE: "GG",
        }, 
        VIATICO: {
            ID: 15,
            name: "GASTO GENERAL - VIATICO",
            LABEL: "VIATICO",
            CODE: "GG",
        }, 
        ASIGNACIONREPRESENTACION: {
            ID: 16,
            name: "GASTO GENERAL - ASIGNACIONES DE REPRESENTACION",
            LABEL: "ASIGNACIONES DE PRESENTACION",
            CODE: "GG",
        }, 
        REINVERSIONMAQUINARIA: {
            ID: 17,
            name: "GASTO GENERAL - REINVERSION EN MAQUINARIA",
            LABEL: "REINVERSION MAQUINARIA",
            CODE: "GG",
        },
    },
    OTROS: {
        PAGOCUOTACREDITO: {
            ID: 18,
            name: "PAGO CUOTA DE CREDITO",
            LABEL: "PAGO CUOTA DE CREDITO",
            CODE: "PC",
        }, 
        IMPUESTOS: {
            ID: 19,
            name: "IMPUESTOS (PPM-IVA -RETENCIONES)",
            LABEL: "IMPUESTOS",
            CODE: "IP",
        }, 
        RETIROSOCIOS: {
            ID: 20,
            name: "RETIRO SOCIOS",
            LABEL: "RETIRO SOCIOS",
            CODE: "RS",
        }, 
        AHORROFFMM: {
            ID: 21,
            name: "AHORRO FFMM",
            LABEL: "AHORRO FFMM",
            CODE: "AF",
        }
    }
}