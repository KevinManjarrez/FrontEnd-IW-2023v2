//FIC: React
import React, { useEffect, useMemo, useState } from "react";
//FIC: Material UI
import { MaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, Button, IconButton, Dialog } from "@mui/material";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import BarActionsTable from "../../../../share/components/elements/bars/BarActionsTable";

import { GetOneOrderByID } from "../../service/remote/get/GetOneOrderByID";

//FIC: Modals
import OrdenesEstatusModal from "../modals/OrdenesEstatusModal";
//REDUX
import { useSelector } from "react-redux";

//FIC: Columns Table Definition.
const OrdenesEstatusColumn = [
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

  //FIC: Table - FrontEnd.
  const OrdenesEstatusTable = ({ }) => {

    //FIC: controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);
    //FIC: controlar el estado de la data de InfoAd.
    const [OrdenesEstatusData, setOrdenesEstatusData] = useState([]);
    //FIC: controlar el estado que muesta u oculta la modal de nuevo InfoAd.
    const [OrdenesEstatusShowModal, setOrdenesEstatusShowModal] = useState(false);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null); //Para saber cual es la fila y pasarla para el color de la tabla

    //Con redux sacar la data que se envió del otro archivo (ShippingsTable)
    const selectedOrdenesData = useSelector((state) => state.ordenesReducer.selectedOrdenesData);
    // console.log(selectedShippingData);

    useEffect(() => {
      async function fetchData() {
        try {
          const OneOrdenesData = await GetOneOrderByID(selectedOrdenesData.IdInstitutoOK,selectedOrdenesData.IdNegocioOK,selectedOrdenesData.IdOrdenOK);
          setOrdenesEstatusData(OneOrdenesData.ordenes_estatus); //Se ponen los datos en el useState pero solo los del subdocumento info_ad
          setLoadingTable(false);
        } catch (error) {
          console.error("Error al obtener ordenes_estatus:", error);
        }
      }
      fetchData();
    }, []);

    const handleReload = async () => {
      const OneOrdenesData = await GetOneOrderByID(selectedOrdenesData.IdInstitutoOK,selectedOrdenesData.IdNegocioOK,selectedOrdenesData.IdOrdenOK);
      setOrdenesEstatusData(OneOrdenesData.ordenes_estatus);
      setSelectedRowIndex(null);
    };

    return (
        <Box>
          <Box>
            <MaterialReactTable
              columns={OrdenesEstatusColumn}
              data={OrdenesEstatusData}
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
                handleBtnAdd={() => setOrdenesEstatusShowModal(true)}
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
          <Dialog open={OrdenesEstatusShowModal}>
            <OrdenesEstatusModal
              OrdenesEstatusShowModal={OrdenesEstatusShowModal}
              setOrdenesEstatusShowModal={setOrdenesEstatusShowModal}
              handleReload={handleReload}
              row={selectedOrdenesData} //Pasar como prop los datos que sacamos de redux desde ordentable para 
              onClose={() => setOrdenesEstatusShowModal(false)}   //usarlos en InfoAdModal y consecuentemente en formik.
            />
          </Dialog>

        </Box>
      );
  };

  export default OrdenesEstatusTable;