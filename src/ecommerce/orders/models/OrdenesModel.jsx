import { getDetailRow } from "../helpers/Utils";
export function OrdenesModel() {
    let Ordenes = {
        IdInstitutoOK : { type: String },//automaticamente disabled 9001
        IdNegocioOK : { type: String },//automaticamente disabled 1101
        IdOrdenOK: { type: String },// 9001-uuid de 12
        IdOrdenBK: { type: String },// libre
        IdTipoOrdenOK: { type: String },// select cat_tipo_ordenes
        IdRolOK: { type: String },//select cat_rol
        IdPersonaOK: { type: String },// select persona
        ordenes_estatus: [],
        ordenes_info_ad: [],
        ordenes_detalle: [],
        detail_row: getDetailRow(),
    };
    return Ordenes
};