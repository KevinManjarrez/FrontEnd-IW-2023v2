import { getDetailRow } from "../helpers/Utils";
export function OrdenesDetalleVModel() {
    let pedidos_detalle_ps_estatus_v = {
    
        pedidos_detalle_ps_estatus_v: [{
            IdTipoEstatusOK: String,
            Actual: String,
            Observacion: String,
            detail_row: getDetailRow(),
        }]
    

    };
    return pedidos_detalle_ps_estatus_v
};