import axios from "axios";
export function getAllOrdenes() {
    return new Promise((resolve, reject) => {
      //FIC: http://localhost:8080/api/pwa/institutes 
      //axios.get(import.meta.env.VITE_GET_ALL_INSTITUTES_URL)
      axios.get(import.meta.env.VITE_ORDERS_URL)
        .then((response) => {
          const data = response.data;
        // console.log("getProducts()", data);
 
          if (!data.success) {
            console.error("No se pudo realizar correctamente la petición <<getAllOrdenes - Services>>", data);
            reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
          } else if (data.data.length === 0) {
            console.info("🛈 No se encontraron documentos en <<ordenes>>");
            resolve([]);
          } else if (data.success) {
            const OrdenesData = data.data[0].dataRes;
            console.log("Colección: <<ordenes>>", OrdenesData);
            resolve(JSON.parse(JSON.stringify(OrdenesData))); // Resuelve la promesa y hace una copia profunda
          }
        })
        .catch((error) => {
          console.error("Error en <<getAllOrdenes - Services>>", error);
          reject(error); // Rechaza la promesa en caso de error
        });
    });
  }