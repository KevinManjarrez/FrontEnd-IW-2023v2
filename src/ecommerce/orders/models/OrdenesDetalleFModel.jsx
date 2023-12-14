import { getDetailRow } from "../helpers/Utils";
export function OrdenesDetalleFModel() {
    let pedidos_detalle_ps_estatus_f = {
    
        pedidos_detalle_ps_estatus_f: [{
            IdTipoEstatusOK: String,
            Actual: String,
            Observacion: String,
            detail_row: getDetailRow(),
        }]
    

    };
    return pedidos_detalle_ps_estatus_f
};