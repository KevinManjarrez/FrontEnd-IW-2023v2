
import { SET_SELECTED_ORDENES_DETALLE_DATA } from "../../redux/slices/OrdenesSlice";
import { darken } from '@mui/material/styles';

//FIC: React
import React, { useEffect, useMemo, useState } from "react";
//FIC: Material UI
import { MaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, Button, IconButton, Dialog } from "@mui/material";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import BarActionsTable from "../../../../share/components/elements/bars/BarActionsTable";
import { useDispatch } from "react-redux";
import { GetOneOrderByID } from "../../service/remote/get/GetOneOrderByID";

//FIC: Modals
import OrdenesProveedorModal from "../modals/OrdenesProveedorModal";
//REDUX
import { useSelector } from "react-redux";

//FIC: Columns Table Definition.
const OrdenesProveedorColumn = [
  {
    accessorKey: "IdOrdenOK",
    header: "Id Orden OK",
    size: 30, //small column
  },
  {
    accessorKey: "IdOrdenBK",
    header: "Id Orden BK",
    size: 30, //small column
  },
  {
    accessorKey: "IdTipoOrdenOK",
    header: "Id Tipo Orden OK",
    size: 150, //small column
  },
];

  //FIC: Table - FrontEnd.
  const OrdenesProveedorTable = ({ }) => {

    //FIC: controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);
    //FIC: controlar el estado de la data de InfoAd.
    const [OrdenesProveedorData, setOrdenesProveedorData] = useState([]);
    //FIC: controlar el estado que muesta u oculta la modal de nuevo InfoAd.
    const [OrdenesProveedorShowModal, setOrdenesProveedorShowModal] = useState(false);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null); //Para saber cual es la fila y pasarla para el color de la tabla

    //Con redux sacar la data que se envió del otro archivo (ShippingsTable)
    const selectedOrdenesData = useSelector((state) => state.ordenesReducer.selectedOrdenesData);
    // console.log(selectedShippingData);
    const dispatch = useDispatch();

    useEffect(() => {
      async function fetchData() {
        try {
          setOrdenesProveedorData(selectedOrdenesData.ordenes_proveedor); //Se ponen los datos en el useState pero solo los del subdocumento info_ad
          setLoadingTable(false);
        } catch (error) {
          console.error("Error al obtener ordenes_estatus:", error);
        }
      }
      fetchData();
    }, []);

    //Este es el metodo para seleccionar la orden de la tabla 
  useEffect(() => {
    const handleRowClick = (index) => {
      const clickedRow = OrdenesProveedorData[index];
      if (clickedRow) {
        console.log("<<ID DEL DOCUMENTO SELECCIONADO>>:", clickedRow.IdOrdenOK);
        setSelectedRowIndex(index);
        dispatch(SET_SELECTED_ORDENES_DETALLE_DATA(clickedRow));
      }
    };

    //Delimita el rango de selecion en la tabla
    const rows = document.querySelectorAll(".MuiTableRow-root");

    rows.forEach((row, index) => {
      row.addEventListener("click", () => handleRowClick(index - 1));
    });
  }, [OrdenesProveedorData]);

    return (
        <Box>
          <Box>
            <MaterialReactTable
              columns={OrdenesProveedorColumn}
              data={OrdenesProveedorData}
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
                handleBtnAdd={() => setOrdenesProveedorShowModal(true)}
                handleBtnDetails={() => console.log("clic handleBtnDetails")}
                handleBtnReload={() => handleReload()}
              />
              )}
              muiTableBodyRowProps={({ row }) => ({
                onClick: () => {
                  setSelectedRowIndex(row.original);
                  setSelectedRowIndex(row.id);
                  
                },
                sx: {
                  cursor: loadingTable ? "not-allowed" : "pointer",
                  backgroundColor:
                  selectedRowIndex === row.id ? darken("#EFF999", 0.01) : "inherit",
                },
              })}
            />
          </Box>
          {/* M O D A L E S */}   
          <Dialog open={OrdenesProveedorShowModal}>
            <OrdenesProveedorModal
              OrdenesProveedorShowModal={OrdenesProveedorShowModal}
              setOrdenesProveedorShowModal={setOrdenesProveedorShowModal}
              selectedOrdenesData={selectedOrdenesData} //Pasar como prop los datos que sacamos de redux desde ordentable para 
              onClose={() => setOrdenesProveedorShowModal(false)}   //usarlos en InfoAdModal y consecuentemente en formik.
            />
          </Dialog>

        </Box>
      );
  };

  export default OrdenesProveedorTable;