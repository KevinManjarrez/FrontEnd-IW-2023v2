import axios from "axios";

export function DeleteOneOrder(IdInstitutoOK,IdNegocioOK,id) {
  return new Promise((resolve, reject) => {
    // Puedes ajustar la URL según tu API
    axios.delete(`${import.meta.env.VITE_ORDERS_URL}one?IdInstitutoOK=${IdInstitutoOK}&IdNegocioOK=${IdNegocioOK}&IdOrdenOK=${id}`)
      .then((response) => {
        const data = response.data;
        
        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición <<deleteOrdenById - Services>>", data);
          reject(data);
        } else {
          console.log(`Orden con ID ${id} eliminada exitosamente`);
          resolve(data); // Puedes resolver con algún mensaje o datos adicionales si es necesario
        }
      })
      .catch((error) => {
        console.error("Error en <<deleteOrdenById - Services>>", error);
        reject(error);
      });
  });
}