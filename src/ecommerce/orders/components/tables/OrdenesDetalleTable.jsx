//FIC: React
import React, { useEffect, useMemo, useState } from "react";
//FIC: Material UI
import { MaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, Button, IconButton, Dialog , darken} from "@mui/material";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import BarActionsTable from "../../../../share/components/elements/bars/BarActionsTable";

//FIC: Modals
import OrdenesDetalleModal from "../modals/OrdenesDetalleModal";
import PatchOrdenesDetalleModal from "../modals/PatchOrdenesDetalleModal";

import OrdenesDetalleFTable from "./OrdenesDetalleFTable";
//REDUX
import { useDispatch } from "react-redux";
import { SET_SELECTED_ORDENES_DETALLE_DATA } from "../../redux/slices/OrdenesSlice";

import { useSelector } from "react-redux";

//FIC: Columns Table Definition.
const OrdenesDetalleColumn = [
    {
      accessorKey: "IdProdServOK",
      header: "Id Producto/Servicio OK",
      size: 30,
    },
    {
      accessorKey: "IdPresentaOK",
      header: "Id Presentación OK",
      size: 30,
    },
    {
      accessorKey: "DesPresentaPS",
      header: "Descripción Presentación",
      size: 150,
    },
    {
      accessorKey: "Cantidad",
      header: "Cantidad",
      size: 150,
    },
    {
      accessorKey: "PrecioUniSinIVA",
      header: "Precio Unidad Sin IVA",
      size: 150,
    },
    {
      accessorKey: "PrecioUniConIVA",
      header: "Precio Unidad Con IVA",
      size: 150,
    },
    {
      accessorKey: "PorcentajeIVA",
      header: "Porcentaje IVA",
      size: 150,
    },
    {
      accessorKey: "MontoUniIVA",
      header: "Monto Unidad IVA",
      size: 150,
    },
    {
      accessorKey: "SubTotalSinIVA",
      header: "SubTotal Sin IVA",
      size: 150,
    },
    {
      accessorKey: "SubTotalConIVA",
      header: "Subtotal Con IVA",
      size: 50,
    },
  ];
  
  //FIC: Table - FrontEnd.
  const OrdenesDetalleTable = ({ }) => {

    //FIC: controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);
    //FIC: controlar el estado de la data de InfoAd.
    const [OrdenesDetalleData, setOrdenesDetalleData] = useState([]);
    //FIC: controlar el estado que muesta u oculta la modal de nuevo InfoAd.
    const [OrdenesDetalleShowModal, setOrdenesDetalleShowModal] = useState(false);
    const [OrdenesDetallePatchShowModal, setOrdenesDetallePatchShowModal] = useState(false);
    
    const [selectedRowIndex, setSelectedRowIndex] = useState(null); //Para saber cual es la fila y pasarla para el color de la tabla

    //Con redux sacar la data que se envió del otro archivo (ShippingsTable)
    const selectedOrdenesData = useSelector((state) => state.ordenesReducer.selectedOrdenesData);
    // console.log(selectedShippingData);
    const dispatch = useDispatch();

    useEffect(() => {
      async function fetchData() {
        try {
          setOrdenesDetalleData(selectedOrdenesData.ordenes_detalle); //Se ponen los datos en el useState pero solo los del subdocumento info_ad
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
      const clickedRow = OrdenesDetalleData[index];
      if (clickedRow) {
        console.log("<<ID DEL DOCUMENTO SELECCIONADO>>:", clickedRow.IdProdServOK);
        setSelectedRowIndex(index);
        dispatch(SET_SELECTED_ORDENES_DETALLE_DATA(clickedRow));
      }
    };

    //Delimita el rango de selecion en la tabla
    const rows = document.querySelectorAll(".MuiTableRow-root");

    rows.forEach((row, index) => {
      row.addEventListener("click", () => handleRowClick(index - 1));
    });
  }, [OrdenesDetalleData]);

  const handleReload = async () => {
    const OneOrdenesData = await GetOneOrderByID(selectedOrdenesData.IdInstitutoOK,selectedOrdenesData.IdNegocioOK,selectedOrdenesData.IdOrdenOK);
    setOrdenesDetalleData(OneOrdenesData.ordenes_detalle);
    setSelectedRowIndex(null);
  };

    return (
        <Box>
          <Box>
            <MaterialReactTable
              columns={OrdenesDetalleColumn}
              data={OrdenesDetalleData}
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
                handleBtnAdd={() => setOrdenesDetalleShowModal(true)}
                handleBtnUpdate={() => setOrdenesDetallePatchShowModal(true)}
                handleBtnDetails={() => console.log("clic handleBtnDetails")}
                handleBtnReload={() => handleReload()}
                isItemSelected={!!selectedRowIndex}

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
          <Dialog open={OrdenesDetalleShowModal}>
            <OrdenesDetalleModal
              OrdenesDetalleShowModal={OrdenesDetalleShowModal}
              setOrdenesDetalleShowModal={setOrdenesDetalleShowModal}
              handleReload={handleReload}
              row={selectedOrdenesData} //Pasar como prop los datos que sacamos de redux desde ordentable para 
              onClose={() => setOrdenesDetalleShowModal(false)}   //usarlos en InfoAdModal y consecuentemente en formik.
            />
          </Dialog>
          <Dialog open={OrdenesDetallePatchShowModal}>
            <PatchOrdenesDetalleModal
              OrdenesDetallePatchShowModal={OrdenesDetallePatchShowModal}
              setOrdenesDetallePatchShowModal={setOrdenesDetallePatchShowModal}
              handleReload={handleReload}
              productSel={selectedOrdenesData} //Pasar como prop los datos que sacamos de redux desde ordentable para 
              onClose={() => setOrdenesDetalleShowModal(false)}   //usarlos en InfoAdModal y consecuentemente en formik.
            />
          </Dialog>
          
        </Box>
      );
  };

  export default OrdenesDetalleTable;