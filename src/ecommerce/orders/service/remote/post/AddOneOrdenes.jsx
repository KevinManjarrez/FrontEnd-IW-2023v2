import axios from "axios";

export function AddOneOrdenes(ordenes) {
   
    console.log("<<EJECUTA>> API <<AddOneOrden>> Requiere:", ordenes)
    return new Promise((resolve, reject) => {
      //FIC: URL = http://localhost:8080/api/pwa/institutes
      //axios.get("http://localhost:8080/api/pwa/institute")
      axios.post(import.meta.env.VITE_ORDERS_URL, ordenes)
        .then((response) => {
          console.log("<<RESPONSE>> AddOneOrden", ordenes)
          const data = response.data;
          //console.log("<<RESPONSE>> DATA:", data);
          if (!data.success) { 
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOneOrden>> de forma correcta", data);
            reject(data);
          } else if (data.success) {
            resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<AddOneOrden>>", error);
          reject(error);
        });   
    });
}