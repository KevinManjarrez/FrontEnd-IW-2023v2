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
//import { OrdenesProveedorEstatusModel } from "../../models/OrdenesProveedorEstatusModel";

import { useSelector } from "react-redux";

const OrdenesProveedorInfoAdTable = ({
  
}) => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [OrdenesDetalleData, setOrdenesProveedorInfoAdData] = useState([]);
  const [OrdenesProveedorInfoAd, setOrdenesProveedorInfoAd] = useState([]);
  const [showModal, setShowModal] = useState(false);
    //Con redux sacar la data que se envió del otro archivo (ShippingsTable)
    const selectedOrdenesData = useSelector((state) => state.ordenesReducer.selectedOrdenesDetalleData);

  useEffect(() => {
    async function fetchData() {
      try {
        setOrdenesProveedorInfoAdData(selectedOrdenesData.ordenes_info_ad); //Se ponen los datos en el useState pero solo los del subdocumento info_ad
        setLoadingTable(false);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }
    fetchData();
  }, []);

  const OrdenesProveedorInfoAdColumn = [
    {
        accessorKey: "IdTipoEstatusOK",
        header: "Id Tipo Estatus OK",
        size: 30, //small column
      },
      {
        accessorKey: "IdEtiqueta",
        header: "Id Etiqueta",
        size: 30, //small column
      },
      {
        accessorKey: "Etiqueta",
        header: "Etiqueta",
        size: 30, //small column
      },
      {
        accessorKey: "Valor",
        header: "Valor",
        size: 30, //small column
      },
      {
      accessorKey: "IdTipoSeccionOK",
        header: "Id Tipo SeccionOK",
        size: 30, //small column
      },
      {
      accessorKey: "Secuencia",
        header: "Secuencia",
        size: 30, //small column
      },
  ];

  return (
    <Box>
      <MaterialReactTable
        columns={OrdenesProveedorInfoAdColumn}
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

export default OrdenesProveedorInfoAdTable;

