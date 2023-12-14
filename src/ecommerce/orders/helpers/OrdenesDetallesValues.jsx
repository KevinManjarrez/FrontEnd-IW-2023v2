import { OrdenesDetalleModel } from "../models/OrdenesDetalleModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const OrdenesDetalleValues = (values, ordenesDetalle) => {
  let OrdenesDetalle = ordenesDetalle || OrdenesDetalleModel();
  // Crear un nuevo objeto de estatus
  let nuevoEstatus = {
    IdProdServOK: values.IdProdServOK,
    IdPresentaOK: values.IdPresentaOK,
    DesPresentaPS: values.DesPresentaPS,
    Cantidad: values.Cantidad,
    PrecioUniSinIVA: values.PrecioUniSinIVA,
    PrecioUniConIVA: values.PrecioUniConIVA,
    PorcentajeIVA: values.PorcentajeIVA,
    MontoUniIVA: values.MontoUniIVA,
    SubTotalSinIVA: values.SubTotalSinIVA,
    SubTotalConIVA: values.SubTotalConIVA
    // Añadir otros campos si es necesario
  };

  // Agregar el nuevo objeto de estatus al array existente
  OrdenesDetalle.ordenes_detalle.push(nuevoEstatus);

  return OrdenesDetalle;
};
