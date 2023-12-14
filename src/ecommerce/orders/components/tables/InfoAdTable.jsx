import React, { useMemo, useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, darken, Dialog } from "@mui/material";

import InfoAdModal from "../modals/InfoAdModal";
import { useOrdenesContext } from "../../pages/OrdersProvider";
import BarActionsTable from "../../../../share/components/elements/bars/BarActionsTable";
import UpdateInfoAd from "../modals/UpdateInfoAd";
import {
  showMensajeConfirm,
  showMensajeError,
} from "../../../../share/components/elements/messages/MySwalAlerts";

import { GetOneOrderByID } from "../../service/remote/get/GetOneOrderByID";
import { PatchInfoAd } from "../../service/remote/update/PatchInfoAd";
import { useSelector } from "react-redux";

const InfoAdTable = ({
  showToastExito,ordenSel
}) => {
  /*
  const contextData = useOrdenesContext() || {};
  const {
    ordenSel,
    loadingTable,
    showToastExito,
    fetchDataOrdenSelect,
    fetchDataOrden,
  } = contextData;
*/
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [infoAdSel, setInfoAdSel] = useState(null);
  const [infoAdData, setinfoAdEstatusData] = useState([]);
  const [idRowSel, setIdRowSel] = useState(null);
  const [loadingTable, setLoadingTable] = useState(true);

  const selectedOrdenesData = useSelector((state) => state.ordenesReducer.selectedOrdenesData);
/*
  useEffect(() => {
    if (!ordenSel) {
      console.error("ordenSel es undefined");
    }
  }, [ordenSel]);
*/
  useEffect(() => {
    async function fetchData() {
      try {
        setinfoAdEstatusData(selectedOrdenesData.ordenes_info_ad); //Se ponen los datos en el useState pero solo los del subdocumento info_ad
        setLoadingTable(false);
      } catch (error) {
        console.error("Error al obtener ordenes_info_ad:", error);
      }
    }
    fetchData();
  }, []);

  const handleReload = async () => {
    const OneOrdenesData = await GetOneOrderByID(selectedOrdenesData.IdInstitutoOK,selectedOrdenesData.IdNegocioOK,selectedOrdenesData.IdOrdenOK);
    setinfoAdEstatusData(OneOrdenesData.ordenes_info_ad);
    //setIdRowSel(null);
    //setInfoAdSel(null);
  };

  const handleDelete = async () => {
    if (!selectedOrdenesData || idRowSel === null) {
      console.error("ordenSel es undefined o idRowSel es null");
      return;
    }

    const res = await showMensajeConfirm(
      `La Info Adicional #${Number(idRowSel) + 1} será eliminada, ¿Desea continuar?`
    );

    if (res) {
      try {
        const infoAd = [...selectedOrdenesData.ordenes_info_ad];
        infoAd.splice(idRowSel, 1);
        const dataToUpdate = {
          ordenes_info_ad: infoAd,
        };

        console.log("se",selectedOrdenesData.IdInstitutoOK)
        await PatchInfoAd?.(selectedOrdenesData.IdInstitutoOK,selectedOrdenesData.IdNegocioOK,selectedOrdenesData.IdOrdenOK, dataToUpdate);
        showMensajeConfirm("Info Ad Eliminado");
        //handleReload();
      } catch (e) {
        console.error("handleDelete", e);
        showMensajeError(`No se pudo Eliminar el Info Ad`);
      }
    }
  };

  const InfoAdColumns = [
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
      <Box className="box-tables">
        <MaterialReactTable
          columns={InfoAdColumns}
          data={//ordenSel?.InfoAdModel || []
            infoAdData
          }
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
              handleBtnAdd={() => setOpenModalAdd(true)}
              handleBtnUpdate={() => setOpenModalUpdate(true)}
              handleBtnDelete={() => handleDelete()}
              handleBtnDetails={() => console.log("clic handleBtnDetails")}
              handleBtnReload={() => handleReload()}
              isItemSelected={!!infoAdSel}
            />
          )}
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => {
              setInfoAdSel(row.original);
              setIdRowSel(row.id);
              console.log("selecciono:",idRowSel)
            },
            sx: {
              cursor: loadingTable ? "not-allowed" : "pointer",
              backgroundColor:
                idRowSel === row.id ? darken("#EFF999", 0.01) : "inherit",
            },
          })}
        />
      </Box>

      <Dialog open={openModalAdd} onClose={() => openModalAdd(false)}>
        <InfoAdModal
          openModalAdd={openModalAdd}
          setOpenModalAdd={setOpenModalAdd}
          productSel={selectedOrdenesData}
          handleReload={handleReload}
          onClose={() => setOpenModalAdd(false)}
        />
      </Dialog>

      <Dialog open={openModalUpdate}>
        <UpdateInfoAd
          idRowSel={idRowSel}
          infoAdSel={infoAdSel}
          productSel={selectedOrdenesData}
          openModalUpdate={openModalUpdate}
          handleReload={handleReload}
          setOpenModalUpdate={setOpenModalUpdate}
          onClose={() => setOpenModalUpdate(false)}
        />
        </Dialog>
    </Box>
  );
};

export default InfoAdTable;
