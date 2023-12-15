import axios from "axios";

export function PatchOrdenesDetalle(IdInstitutoOK,IdNegocioOK,id, dataToUpdate) {
  return new Promise((resolve, reject) => {
    axios.patch(`${import.meta.env.VITE_ORDERS_URL}one?IdInstitutoOK=${IdInstitutoOK}&IdNegocioOK=${IdNegocioOK}&IdOrdenOK=${id}`, dataToUpdate)
      .then((response) => {
        const data = response.data;
        
        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición <<updateProduct>>", data);
          reject(data);
        } else {
          console.log(`Producto con ID ${id} actualizado exitosamente`);
          resolve(data); // Puedes resolver con algún mensaje o datos adicionales si es necesario
        }
      })
      .catch((error) => {
        console.error("Error en <<updateProduct>>", error);
        reject(error);
      });
  });
}