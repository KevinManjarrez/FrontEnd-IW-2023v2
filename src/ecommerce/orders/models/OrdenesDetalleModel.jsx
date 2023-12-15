import { getDetailRow } from "../helpers/Utils";
export function OrdenesDetalleModel() {
    let ordenes_detalle = {
        IdProdServOK: { type: String, require: true }, //"9001-64e148b5ae58"
        IdPresentaOK: { type: String, require: true }, //"9001-64e148b5ae58-64e148b5"(64e148b5: se extrae la precentacion que se desea desede la colecion)
        DesPresentaPS: { type: String },
        Cantidad: { type: Number },
        PrecioUniSinIVA: { type: Number },
        PrecioUniConIVA: { type: Number },
        PorcentajeIVA: { type: Number },
        MontoUniIVA: { type: Number },
        SubTotalSinIVA: { type: Number },
        SubTotalConIVA: { type: Number },
        pedidos_detalle_ps_estatus_f: [],
        pedidos_detalle_ps_estatus_v: [],
        pedidos_detalle_ps_estatus_u: [],
        pedidos_detalle_ps_estatus_p: [],
        pedidos_detalle_ps_info_ad: [],
        detail_row: getDetailRow()
    };
    return ordenes_detalle
};