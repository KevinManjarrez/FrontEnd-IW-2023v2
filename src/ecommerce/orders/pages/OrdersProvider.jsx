import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { /*getProduct,*/ getAllOrdenes } from "../service/remote/get/GetAllOrdenes";
import { GetOneOrderByID } from "../service/remote/get/GetOneOrderByID";
import { getDetailRow } from "../helpers/Utils";
//import { TOAST_EXITO } from "../../../components/elements/messages/MySwalAlerts";
// Crear un contexto para compartir datos y funciones, y un componente que contendrá todos los estados y funciones
const OrdenesContext = createContext();
export const OrdenesProvider = ({ children }) => {
  const [ordenes, setOrdenes] = useState([]);
  const [ordenSel, setOrdenSel] = useState(null);
  const [presentationSel, setPresentationSel] = useState(null);
  const [loadingTable, setLoadingTable] = useState(false);
  const [idSelectedRowOrden, setIdSelectedRowOrden] = useState(null);
  const [idSelectedRowPresentation, setIdSelectedRowPresentation] =
    useState(null);
  //const showToastExito = (mensaje) => TOAST_EXITO(mensaje);
  useEffect(() => {
    fetchDataOrdenes();
  }, []);

  const fetchDataOrdenes = async (id) => {
    setLoadingTable(true);
    await esperar(300);

    try {
      setOrdenes(await getAllOrdenes());
    } catch (error) {
      console.error(`Error al obtener los productos`, error);
    }
    setLoadingTable(false);
  };

  const fetchDataOrdenSelect = async (id) => {
    setLoadingTable(true);
    await esperar(200);
    try {
      setOrdenSel(await GetOneOrderByID(id));
    } catch (error) {
      console.error(`Error al obtener producto:${id}`, error);
    }
    setLoadingTable(false);
  };
  const fetchPresentationSelect = async (id) => {
    setLoadingTable(true);
    try {
      let ordenSel = await GetOneOrderByID(id);
      //let presentaciones = productoSel.cat_prod_serv_presenta;
      //let presentacion = presentaciones.find((p) => {
        //return p.IdPresentaOK === presentationSel.IdPresentaOK;
      //});
      //setPresentationSel(presentacion);
    } catch (error) {
      console.error(
        `Error al obtener la presentacion del producto ${id}`,
        error
      );
    }
    setLoadingTable(false);
  };
  // Pasar los datos y funciones a través del contexto
  const contextValue = {
    ordenes,
    ordenSel,
    loadingTable,
    idSelectedRowProduct: idSelectedRowOrden,
    idSelectedRowPresentation,
    presentationSel,
    setOrdenSel,
    fetchDataOrdenes,
    fetchDataOrdenSelect,
    //showToastExito,
    setIdSelectedRowOrden,
    setIdSelectedRowPresentation,
    //setPresentationSel,
    //fetchPresentationSelect,
  };
  return (
    <OrdenesContext.Provider value={contextValue}>
      {children} <ToastContainer />
    </OrdenesContext.Provider>
  );
};
// Crear un hook personalizado para acceder al contexto
export const useOrdenesContext = () => useContext(OrdenesContext);