import { OrdenesModel } from "../models/OrdenesModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const OrdenesValues = (values)=>{
  let Ordenes =  OrdenesModel()
  Ordenes.IdInstitutoOK=values.IdInstitutoOK,
  Ordenes.IdNegocioOK=values.IdNegocioOK,
  Ordenes.IdOrdenOK=values.IdOrdenOK,
  Ordenes.IdOrdenBK=values.IdOrdenBK,
  Ordenes.IdTipoOrdenOK=values.IdTipoOrdenOK,
  Ordenes.IdRolOK=values.IdRolOK,
  Ordenes.IdPersonaOK=values.IdPersonaOK
  Ordenes.ordenes_estatus= [],
  Ordenes.ordenes_info_ad= [],
  Ordenes.ordenes_detalle= []
  return Ordenes
}