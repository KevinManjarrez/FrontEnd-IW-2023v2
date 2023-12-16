import { OrdenesDetalleVModel } from "../models/OrdenesDetalleVModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const OrdenesDetallesVValues = (values, ordenesDetallesV,index) => {
  let OrdenesDetallesV = ordenesDetallesV || OrdenesDetalleVModel();
  // Crear un nuevo objeto de estatus
  let nuevoDetalleV = {
    IdTipoEstatusOK: values.IdTipoEstatusOK,
    Actual: values.Actual,
    Observacion: values.Observacion,
    // Añadir otros campos si es necesario
  };

  // Agregar el nuevo objeto de estatus al array existente
  OrdenesDetallesV.ordenes_detalle[index].pedidos_detalle_ps_estatus_v.push(
    nuevoDetalleV
  );

  return OrdenesDetallesV;
};
