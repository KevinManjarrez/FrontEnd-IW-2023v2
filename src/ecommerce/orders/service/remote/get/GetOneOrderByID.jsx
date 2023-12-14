import axios from "axios";

export function GetOneOrderByID(IdInstitutoOK,IdNegocioOK,id) {
  return new Promise((resolve, reject) => {
    // Puedes ajustar la URL según tu API
    axios.get(`${import.meta.env.VITE_ORDERS_URL}one?IdInstitutoOK=${IdInstitutoOK}&IdNegocioOK=${IdNegocioOK}&IdOrdenOK=${id}`)
      .then((response) => {
        const data = response.data;
        
        if (!data.success) {
          console.error("No se pudo realizar correctamente la petición <<getOrdenById - Services>>", data);
          reject(data);
        } else if (data.data.length === 0) {
          console.info(`🛈 No se encontró la orden con ID: ${id}`);
          resolve(null); // Resuelve con null si no se encuentra la orden
        } else if (data.success) {
          const ordenData = data.data[0].dataRes;
          console.log(`Orden encontrada con ID ${id}:`, ordenData);
          resolve(JSON.parse(JSON.stringify(ordenData)));
        }
      })
      .catch((error) => {
        console.error("Error en <<getOrdenById - Services>>", error);
        reject(error);
      });
  });
}