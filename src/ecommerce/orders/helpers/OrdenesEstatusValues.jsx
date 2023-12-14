import { OrdenesEstatusModel } from "../models/OrdenesEstatusModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const OrdenesEstatusValues = (values, ordenesEstatus) => {
  let OrdenesEstatus = ordenesEstatus || OrdenesEstatusModel();
  // Crear un nuevo objeto de estatus
  let nuevoEstatus = {
    IdTipoEstatusOK: values.IdTipoEstatusOK,
    Actual: values.Actual,
    Observacion: values.Observacion,
    // Añadir otros campos si es necesario
  };

  // Agregar el nuevo objeto de estatus al array existente
  OrdenesEstatus.ordenes_estatus.push(nuevoEstatus);

  return OrdenesEstatus;
};
