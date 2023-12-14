//FIC: React
import React, { useEffect, useMemo, useState } from "react";
//FIC: Material UI
import { MaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, Button, IconButton, Dialog, darken } from "@mui/material";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import BarActionsTable from "../../../../share/components/elements/bars/BarActionsTable";
//FIC: DB
//import InstitutesStaticData from '../../../../../db/security/json/institutes/InstitutesData';
import { getAllOrdenes } from "../../service/remote/get/GetAllOrdenes";
import { DeleteOneOrder } from "../../service/remote/delete/DeleteOneOrder";
//FIC: Modals
import { useDispatch } from "react-redux";
import AddOrdenesModal from "../modals/AddOrdenesModal";
import PatchOrdenesModal from "../modals/PatchOrdenesModal";
import { SET_SELECTED_ORDENES_DATA } from "../../redux/slices/OrdenesSlice";
import OrdenesEstatusModal from "../modals/OrdenesEstatusModal";
import InfoAdModal from "../modals/InfoAdModal";
//REutilizables
import {
  showMensajeConfirm,
  showMensajeError,
} from "../../../../share/components/elements/messages/MySwalAlerts";

//FIC: Columns Table Definition.
const OdenesColumns = [
  {
    accessorKey: "IdInstitutoOK",
    header: "ID OK",
    size: 30, //small column
  },
  {
    accessorKey: "IdNegocioOK",
    header: "ID BK",
    size: 30, //small column
  },
  {
    accessorKey: "IdOrdenOK",
    header: "ID Orden OK",
    size: 150, //small column
  },
  {
    accessorKey: "IdOrdenBK",
    header: "ID Orden BK",
    size: 50, //small column
  },
  {
    accessorKey: "IdTipoOrdenOK",
    header: "ID Tipo Orden OK",
    size: 150, //small column
  },
  {
    accessorKey: "IdRolOK",
    header: "ID ROL OK",
    size: 50, //small column
  },
  {
    accessorKey: "IdPersonaOK",
    header: "ID Persona OK ",
    size: 50, //small column
  },
];
//FIC: Table - FrontEnd.
const OrdenesTable = () => {
  //FIC: controlar el estado del indicador (loading).
  const [loadingTable, setLoadingTable] = useState(true);

  //FIC: controlar el estado de la data de Institutos.
  const [OrdenesData, setOrdenesData] = useState([]);
  //FIC: controlar el estado que muesta u oculta la modal de nuevo Instituto.
  const [AddOrdenesShowModal, setAddOrdenesShowModal] = useState(false);
  //Constante para patch model
  const [PatchOrdenesShowModal, setPatchOrdenesShowModal] = useState(false);
  const [editData, setEditData] = useState(false);     //Para saber si hay que rellenar los textfield con datos en caso de estar en modo de edición

  //PARA CONTROLAR LO DE GUARDAR O ACTUALIZAR
  const [selectedRowIndex, setSelectedRowIndex] = useState(null); //Para saber cual es la fila y pasarla para el color de la tabla
  const [idRowSel, setIdRowSel] = useState(null);
  //Este funciona para extraer la informacion de la orden que seleccionemos
  const dispatch = useDispatch();

  //Codigo para optener las todas ordenes
  useEffect(() => {
    async function fetchData() {
      try {
        const AllOrdenesData = await getAllOrdenes();
        setOrdenesData(AllOrdenesData);
        setLoadingTable(false);
      } catch (error) {
        console.error("Error al obtener las ordenes ", error);
      }
    }
    fetchData();
  }, []);

  //Este es el metodo para seleccionar la orden de la tabla 
  useEffect(() => {
    const handleRowClick = (index) => {
      const clickedRow = OrdenesData[index];
      if (clickedRow) {
        console.log("<<ID DEL DOCUMENTO SELECCIONADO>>:", clickedRow.IdOrdenOK);
        setIdRowSel(clickedRow.IdOrdenOK);
        setSelectedRowIndex(index);
        setEditData(clickedRow);
        dispatch(SET_SELECTED_ORDENES_DATA(clickedRow));
      }
    };

    //Delimita el rango de selecion en la tabla
    const rows = document.querySelectorAll(".MuiTableRow-root");

    rows.forEach((row, index) => {
      row.addEventListener("click", () => handleRowClick(index - 1));
    });
  }, [OrdenesData]);

  

  //Este metodo es para refrescar la tabla
  const handleReload = async () => {
    const AllOrdenesData = await getAllOrdenes();
    setOrdenesData(AllOrdenesData);
    setSelectedRowIndex(null);
    //setInfoAdSel(null);
  };

  //Para funcion Ordenes Delete en Tabla Ordenes
  const handleDelete = async () => {
    const res = await showMensajeConfirm(
      `La Orden con el ID: ${
        (idRowSel) 
      } será eliminada, ¿Desea continuar?`
    );
    if (res) {
      try {
        let orden = idRowSel;
        //const indexToDelete = idRowSel;
        //orden.splice(indexToDelete, 1);
        await DeleteOneOrder(orden.IdInstitutoOK,orden.IdNegocioOK,orden.IdOrdenOK);
        /*const dataToUpdate = {
          cat_prod_serv_info_ad: orden,
        };

        await updateProduct(productSel.IdProdServOK, dataToUpdate);*/
        showMensajeConfirm("Orden Eliminada");
        handleReload();
      } catch (e) {
        console.error("handleDelete", e);
        showMensajeError(`No se pudo Eliminar el Info Ad`);
      }
    }
  };

  return (
    <Box>
      <Box>
        <MaterialReactTable
          columns={OdenesColumns}
          data={OrdenesData}
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
              handleBtnAdd={() => setAddOrdenesShowModal(true)}
              handleBtnUpdate={() => setPatchOrdenesShowModal(true)}
              handleBtnDelete={() => handleDelete()}
              handleBtnDetails={() => console.log("clic handleBtnDetails")}
              handleBtnReload={() => handleReload()}
              isItemSelected={!!selectedRowIndex}
            />
          )}
            muiTableBodyRowProps={({ row }) => ({
              onClick: () => {
                setSelectedRowIndex(row.original);
                setSelectedRowIndex(row.id);
                <OrdenesEstatusModal
                row={editData}
                />,
                <InfoAdModal
                row={editData}
                />
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
      <Dialog open={AddOrdenesShowModal} onClose={() => AddOrdenesShowModal(false)}>
        <AddOrdenesModal
          AddOrdenesShowModal={AddOrdenesShowModal}
          setAddOrdenesShowModal={setAddOrdenesShowModal}
          handleReload={handleReload}
          productSel={editData}
          onClose={() => {
            setAddOrdenesShowModal(false);
          }}
        />
      </Dialog>
      <Dialog open={PatchOrdenesShowModal} onClose={() => PatchOrdenesShowModal(false)}>
        <PatchOrdenesModal
          PatchOrdenesShowModal={PatchOrdenesShowModal}
          setPatchOrdenesShowModal={setPatchOrdenesShowModal}
          handleReload={handleReload}
          row={editData}         //actualizar se ponga la info si es que hay
          onClose={() => {
            setPatchOrdenesShowModal(false); //Cerrar la modal
          }}
          
          />
          
      </Dialog>
    </Box>
  );
};
export default OrdenesTable;
