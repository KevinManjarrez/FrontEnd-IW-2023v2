import { getDetailRow } from "../helpers/Utils";
export function OrdenesDetallePModel() {
    let pedidos_detalle_ps_estatus_p = {
    
        pedidos_detalle_ps_estatus_p: [{
            IdTipoEstatusOK: String,
            Actual: String,
            Observacion: String,
            detail_row: getDetailRow(),
        }]
    

    };
    return pedidos_detalle_ps_estatus_p
};