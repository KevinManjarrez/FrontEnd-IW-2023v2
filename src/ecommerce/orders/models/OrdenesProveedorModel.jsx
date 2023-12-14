import { getDetailRow } from "../helpers/Utils";
export function OrdenesProveedorModel() {
    let ordenes_proveedor = {
        ordenes_proveedor:[{
        IdOrdenOK: { type: String },// 9001-uuid de 12
        IdOrdenBK: { type: String },// libre
        IdTipoOrdenOK: { type: String },// select cat_tipo_ordenes
        ordenes_estatus: [],
        ordenes_info_ad: [],
        ordenes_detalle: [],
        ordenes_forma_pago: []
    }]
};
    return ordenes_proveedor
};
