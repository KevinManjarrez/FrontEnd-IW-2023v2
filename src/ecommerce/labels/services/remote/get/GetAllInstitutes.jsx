import axios from "axios";
export function GetAllInstitutes() {
    return new Promise((resolve, reject) => {
      //FIC: URL = http://localhost:8080/api/pwa/labels 
      //axios.get("http://localhost:8080/api/pwa/labels") 
      axios.get(import.meta.env.VITE_CAT_INSTITUTES_URL)
        .then((response) => {
          const data = response.data;
        //console.log("getAllLabels()", data);
          if (!data.success) {
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<GetInstitutes>> de forma correcta", data);
            reject(data); //FIC: Rechaza la promesa con la respuesta si no fue exitosa
          } else if (data.data.length === 0) {
            console.info("🛈 <<NO>> se encontraron documentos <<GetInstitutes>>");
            resolve([]);
          } else if (data.success) {
            const labels = data.data[0].dataRes;
            console.log("Coleccion: <<GetInstitutes>>", labels);
            resolve(JSON.parse(JSON.stringify(labels))); // Resuelve la promesa y hace una copia profunda
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<GetInstitutes>>", error);
          reject(error); // Rechaza la promesa en caso de error
        });
    });
  }