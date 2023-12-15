import { InfoAdModel } from "../models/InfoAdModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const OrdenesInfoAdValues = (values, ordenesEstatus) => {
  let OrdenesEstatus = ordenesEstatus || InfoAdModel();
  // Crear un nuevo objeto de estatus
  let nuevoInfoAd = {
    IdEtiquetaOK: values.IdEtiquetaOK,
    IdEtiqueta: values.IdEtiqueta ,
    Valor: values.Valor ,
    IdTipoSeccionOK: values.IdTipoSeccionOK,
    Secuencia: values.Secuencia,
    // Añadir otros campos si es necesario
  };
  

  // Agregar el nuevo objeto de estatus al array existente
  OrdenesEstatus.ordenes_info_ad.push(nuevoInfoAd);

  return OrdenesEstatus;
};
