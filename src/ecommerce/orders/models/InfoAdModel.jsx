import { getDetailRow } from "../helpers/Utils";

export function InfoAdModel() {
    let InfoAdModel = {
        IdEtiquetaOK: { type: String },
        IdEtiqueta: { type: String },
        Valor: { type: String },
        IdTipoSeccionOK: { type: String },
        Secuencia: { type: Number },
        detail_row: getDetailRow(),
    };
    return InfoAdModel
};
