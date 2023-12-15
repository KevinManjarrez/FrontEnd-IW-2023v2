import React, { useEffect, useState } from "react";
import {
  Box,
  Dialog
} from "@mui/material";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { MaterialReactTable } from "material-react-table";

import OrdenesDetalleUModal from "../modals/OrdenesDetalleUModal";
import BarActionsTable from "../../../../share/components/elements/bars/BarActionsTable";


import { useSelector } from "react-redux";

const OrdenesDetalleUTable = ({

}) => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [OrdenesDetalleUData, setOrdenesDetalleUData] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null); //Para saber cual es la fila y pasarla para el color de la tabla

  const [showModal, setShowModal] = useState(false);
    //Con redux sacar la data que se envió del otro archivo (ShippingsTable)
  const selectedOrdenesDetalleData = useSelector((state) => state.ordenesReducer.selectedOrdenesDetalleData);
  const selectedOrdenesData = useSelector((state) => state.ordenesReducer.selectedOrdenesData);
  const index=useSelector((state) => state.ordenesReducer.index)
  
  console.log("Orden detalle seleccionada:",index)
  useEffect(() => {
    async function fetchData() {
      try {
        setOrdenesDetalleUData(selectedOrdenesDetalleData.pedidos_detalle_ps_estatus_u); //Se ponen los datos en el useState pero solo los del subdocumento info_ad
        setLoadingTable(false);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }
    fetchData();
  }, []);

  const handleReload = async () => {
    const OneOrdenesData = await GetOneOrderByID(selectedOrdenesDetalleData.IdInstitutoOK,selectedOrdenesDetalleData.IdNegocioOK,selectedOrdenesDetalleData.IdOrdenOK);
    //setOrdenesEstatusData(OneOrdenesData.ordenes_estatus);
    setSelectedRowIndex(null);
  };

  const OrdenesDetalleUColumn = [
    {
        accessorKey: "IdTipoEstatusOK",
        header: "Id Tipo Estatus OK",
        size: 30, //small column
      },
      {
        accessorKey: "Actual",
        header: "Actual",
        size: 30, //small column
      },
      {
        accessorKey: "Observacion",
        header: "Observacion",
        size: 150, //small column
      },
  ];

  return (
    <Box>
      <Box>
      <MaterialReactTable
        columns={OrdenesDetalleUColumn}
        data={OrdenesDetalleUData}
        state={{ isLoading: loadingTable }}
        initialState={{ density: "compact", showGlobalFilter: true }}
        enableColumnActions={false}
        localization={MRT_Localization_ES}
        enableStickyHeader
        muiTableContainerProps={{
          sx: {
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            overflow: "auto",
            width: "parent",
          },
        }}
        positionToolbarAlertBanner="bottom"
        renderTopToolbarCustomActions={({ table }) => (
            <BarActionsTable
          handleBtnAdd={() => setShowModal(true)}
          handleBtnDetails={() => console.log("clic handleBtnDetails")}
          handleBtnReload={() => handleReload()}
        />
        )}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => {
            setSelectedRowIndex(row.original);
            setSelectedRowIndex(row.id);
          },
        })}
    />
    </Box>

      {/* Modal para la vista detallada */}
      <Dialog open={showModal}>
        <OrdenesDetalleUModal
          showModal={showModal}
          setShowModal={setShowModal}
          row={selectedOrdenesData}
          selectRow={selectedOrdenesDetalleData}
          index={index}
          //handleReload={handleReload}
          onClose={() => setShowModal(false)}

          // ...otros props necesarios
        />
      </Dialog>
    </Box>
  );
};

export default OrdenesDetalleUTable;

