import { getDetailRow } from "../helpers/Utils";
export function OrdenesEstatusModel() {
    let ordenes_estatus = {
        ordenes_estatus: [{
            IdTipoEstatusOK: String,
            Actual: String,
            Observacion: String,
            detail_row: getDetailRow(),
        }]
    };
    return ordenes_estatus;
};
