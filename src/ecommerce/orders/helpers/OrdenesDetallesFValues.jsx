import { OrdenesDetallesFModel } from "../models/OrdenesDetallesFModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const OrdenesDetallesFValues = (values, ordenesDetallesF) => {
  let OrdenesDetallesF = ordenesDetallesF || OrdenesDetallesFModel();
  // Crear un nuevo objeto de estatus
  let nuevoDetalleF = {
    IdTipoEstatusOK: values.IdTipoEstatusOK,
    Actual: values.Actual,
    Observacion: values.Observacion,
    // Añadir otros campos si es necesario
  };

  // Agregar el nuevo objeto de estatus al array existente
  OrdenesDetallesF.ordenes_detalles.pedidos_detalle_ps_estatus_f.push(nuevoDetalleF);

  return OrdenesDetallesF;
};
