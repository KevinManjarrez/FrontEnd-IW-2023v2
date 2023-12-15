import { getDetailRow } from "../helpers/Utils";
export function OrdenesDetalleUModel() {
    let pedidos_detalle_ps_estatus_u = {
    
        pedidos_detalle_ps_estatus_u: [{
            IdTipoEstatusOK: String,
            Actual: String,
            Observacion: String,
            detail_row: getDetailRow(),
        }]
    

    };
    return pedidos_detalle_ps_estatus_u
};