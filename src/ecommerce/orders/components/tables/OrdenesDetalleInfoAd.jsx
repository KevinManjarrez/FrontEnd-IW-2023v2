import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Tooltip,
  Dialog
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
//import InfoIcon from "@mui/icons-material/Info";
//import { Componente } from "@mui/material"; // Sustituye "Componente" por el nombre del componente que desees importar

import OrdenesDetalleFModal from "../modals/OrdenesDetalleFModal"; 
import { OrdenesDetalleFModel } from "../../models/OrdenesDetalleFModel";

import { useSelector } from "react-redux";

const OrdenesDetalleInfoAdTable = ({
  
}) => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [OrdenesDetalleData, setOrdenesDetalleData] = useState([]);
  const [pedidosDetalleEstatusInfoAd, setPedidosDetalleEstatusInfoAd] = useState([]);
  const [showModal, setShowModal] = useState(false);
    //Con redux sacar la data que se envió del otro archivo (ShippingsTable)
    const selectedOrdenesData = useSelector((state) => state.ordenesReducer.selectedOrdenesDetalleData);

  useEffect(() => {
    async function fetchData() {
      try {
        setOrdenesDetalleData(selectedOrdenesData.pedidos_detalle_ps_info_ad); //Se ponen los datos en el useState pero solo los del subdocumento info_ad
        setLoadingTable(false);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }
    fetchData();
  }, []);

  const OrdenesDetalleColumn = [
    {
      accessorKey: "IdEtiquetaOK",
      header: "Id Etiqueta OK",
      size: 30,
    },
    {
      accessorKey: "IdEtiqueta",
      header: "Id Etiqueta",
      size: 30,
    },
    {
      accessorKey: "Valor",
      header: "Valor",
      size: 50,
    },
    {
      accessorKey: "IdTipoSeccionOK",
      header: "Tipo seccion",
      size: 30,
    },
    {
      accessorKey: "Secuencia",
      header: "Secuencia",
      size: 150,
    },
  ];


  return (
    <Box>
      <MaterialReactTable
        columns={OrdenesDetalleColumn}
        data={OrdenesDetalleData}
        state={{ isLoading: loadingTable }}
        // Otras props de tu tabla...
      />

      {/* Modal para la vista detallada */}
      <Dialog open={showModal} >
        <OrdenesDetalleFModal
          open={showModal}
          // ...otros props necesarios
        />
      </Dialog>
    </Box>
  );
};

export default OrdenesDetalleInfoAdTable;

