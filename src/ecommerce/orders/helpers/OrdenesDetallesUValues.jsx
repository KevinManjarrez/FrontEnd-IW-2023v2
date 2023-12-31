import { OrdenesDetalleUModel } from "../models/OrdenesDetalleUModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const OrdenesDetallesUValues = (values, ordenesDetallesU,index) => {
  let OrdenesDetallesU = ordenesDetallesU || OrdenesDetalleUModel();
  // Crear un nuevo objeto de estatus
  let nuevoDetalleU = {
    IdTipoEstatusOK: values.IdTipoEstatusOK,
    Actual: values.Actual,
    Observacion: values.Observacion,
    // Añadir otros campos si es necesario
  };

  // Agregar el nuevo objeto de estatus al array existente
  OrdenesDetallesU.ordenes_detalle[index].pedidos_detalle_ps_estatus_u.push(nuevoDetalleU);

  return OrdenesDetallesU;
};
