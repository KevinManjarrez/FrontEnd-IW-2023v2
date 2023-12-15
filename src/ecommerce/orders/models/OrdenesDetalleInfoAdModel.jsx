import { getDetailRow } from "../helpers/Utils";
export function OrdenesDetalleInfoAdModel() {
    let pedidos_detalle_ps_info_ad = {
    
        pedidos_detalle_ps_info_ad: [{
            IdTipoEstatusOK: String,
            Actual: String,
            Observacion: String,
            detail_row: getDetailRow(),
        }]
    

    };
    return pedidos_detalle_ps_info_ad
};