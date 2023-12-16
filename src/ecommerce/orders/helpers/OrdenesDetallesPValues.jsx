import { OrdenesDetallePModel } from "../models/OrdenesDetallePModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const OrdenesDetallesPValues = (values, ordenesDetallesP,index) => {
  let OrdenesDetallesP = ordenesDetallesP || OrdenesDetallePModel();
  // Crear un nuevo objeto de estatus
  let nuevoDetalleP = {
    IdTipoEstatusOK: values.IdTipoEstatusOK,
    Actual: values.Actual,
    Observacion: values.Observacion,
    // Añadir otros campos si es necesario
  };

  // Agregar el nuevo objeto de estatus al array existente
  OrdenesDetallesP.ordenes_detalle[index].pedidos_detalle_ps_estatus_p.push(
    nuevoDetalleP
  );

  return OrdenesDetallesP;
};
