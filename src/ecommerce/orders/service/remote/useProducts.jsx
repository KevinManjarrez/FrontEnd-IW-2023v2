import { useState, useEffect } from 'react';
import { GetAllProdServ } from '../../../products/services/remote/get/GetAllProdServ';
function useProducts({ IdProductoOK }) {
const [etiquetas, setEtiquetas] = useState([]);
useEffect(() => {
    async function fetchData() {
    try {
        const etiquetasData = await GetAllProdServ();
        console.log("etiquetasData",etiquetasData)
        setEtiquetas(etiquetasData);
    } catch (error) {
        console.error("useEtiquetas():", error);
    }
    }
    fetchData();
}, []);

let etiquetaEspecifica = null
if(IdProductoOK){ //Si recibe IdInstitutoOK
etiquetaEspecifica= etiquetas.find(etiqueta => etiqueta.IdProductoOK === IdProductoOK) ;
}else if(!IdProductoOK){//Si NO recibe IdInstitutoOK
etiquetaEspecifica= etiquetas.find(etiqueta => etiqueta.IdProductoOK === IdProductoOK)
}

return { etiquetas, etiquetaEspecifica };
}
export default useProducts;