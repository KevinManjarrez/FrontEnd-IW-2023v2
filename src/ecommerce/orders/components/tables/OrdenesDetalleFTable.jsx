//FIC: React
import React, { useEffect, useMemo, useState } from "react";
//FIC: Material UI
import { MaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, Button, IconButton, Dialog } from "@mui/material";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import BarActionsTable from "../../../../share/components/elements/bars/BarActionsTable";

import { GetOneOrderByID } from "../../service/remote/get/GetOneOrderByID";

//FIC: Modals
import OrdenesDetalleFModal from "../modals/OrdenesDetalleFModal";
//REDUX
import { useSelector } from "react-redux";

const OrdenesDetallesFColumn = [
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

const OrdenesDetalleFTable = ({ }) => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [OrdenesDetalleFData, setOrdenesDetalleFData] = useState([]);
  const [pedidosDetalleEstatusF, setPedidosDetalleEstatusF] = useState([]);
  const [OrdenesDetalleFShowModal, setOrdenesDetalleFShowModal] = useState(false);
    //Con redux sacar la data que se envió del otro archivo (ShippingsTable)
  const [selectedRowIndex, setSelectedRowIndex] = useState(null); //Para saber cual es la fila y pasarla para el color de la tabla

  const selectedOrdenesData = useSelector((state) => state.ordenesReducer.selectedOrdenesData);

  useEffect(() => {
    async function fetchData() {
      try {
        setOrdenesDetalleFData(selectedOrdenesData.ordenes_detalle.pedidos_detalle_ps_estatus_f); //Se ponen los datos en el useState pero solo los del subdocumento info_ad
        setLoadingTable(false);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }
    fetchData();
  }, []);

  const handleReload = async () => {
    const OneOrdenesData = await GetOneOrderByID(selectedOrdenesData.IdInstitutoOK,selectedOrdenesData.IdNegocioOK,selectedOrdenesData.IdOrdenOK);
    setOrdenesEstatusData(OneOrdenesData.ordenes_detalle.pedidos_detalle_ps_estatus_f);
    setSelectedRowIndex(null);
  };

 
  return (
    <Box>
      <Box>
        <MaterialReactTable
          columns={OrdenesDetallesFColumn}
          data={OrdenesDetalleFData}
          state={{isLoading: loadingTable}}
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
            handleBtnAdd={() => setOrdenesDetalleFShowModal(true)}
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

      {/* M O D A L E S */}   
      <Dialog open={OrdenesDetalleFShowModal}>
        <OrdenesDetalleFModal
          OrdenesDetalleFShowModal={OrdenesDetalleFShowModal}
          setOrdenesDetalleFShowModal={setOrdenesDetalleFShowModal}
          handleReload={handleReload}
          row={selectedOrdenesData} //Pasar como prop los datos que sacamos de redux desde ordentable para 
          onClose={() => setOrdenesDetalleFShowModal(false)}   //usarlos en InfoAdModal y consecuentemente en formik.
        />
      </Dialog>

    </Box>
  );
};
export default OrdenesDetalleFTable;

