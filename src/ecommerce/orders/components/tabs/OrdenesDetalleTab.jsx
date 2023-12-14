import { Box } from "@mui/material";
import OrdenesDetalleTable from "../tables/OrdenesDetalleTable";
import OrdenesDetalleNavTab from "./OrdenesDetalleNavTab";
import React, { useState } from 'react';
import OrdenesDetalleF from "./OrdenesDetalleF";
import OrdenesDetalleV from "./OrdenesDetalleV";
import OrdenesDetalleU from "./OrdenesDetalleU";
import OrdenesDetalleAD from "./OrdenesDetalleAD";
import OrdenesDetalleP from "./OrdenesDetalleP";

export default function OrdenesTab() {
  const [currentRowDetalleInOrdenesDetalleTab, setCurrentRowInOrdenesDetalleTab] = useState(0);
  const [currentNameTabInOrdenesDetalleTab, setCurrentNameTabInOrdenesDetalleTab] =
    useState("ORDEN DETALLE");

  return (
    <Box>
      <OrdenesDetalleNavTab
        currentRowDetalleInOrdenesDetalleTab={currentRowDetalleInOrdenesDetalleTab}
        setCurrentNameTabInOrdenesDetalleTab={setCurrentNameTabInOrdenesDetalleTab}
      />
      {console.log(currentNameTabInOrdenesDetalleTab)}

      {currentNameTabInOrdenesDetalleTab == "ESTATUS FISICO" && <OrdenesDetalleF/>}
      {currentNameTabInOrdenesDetalleTab == "ESTATUS VENTA" && <OrdenesDetalleV/>}
      {currentNameTabInOrdenesDetalleTab == "ESTATUS UBICACION" && <OrdenesDetalleU/>}
      {currentNameTabInOrdenesDetalleTab == "ESTATUS PROCESO" && <OrdenesDetalleP/>}
      {currentNameTabInOrdenesDetalleTab == "ESTATUS INFO AD" && <OrdenesDetalleAD/>}
      
      {currentNameTabInOrdenesDetalleTab === "ORDEN DETALLE" && <OrdenesDetalleTable />}
    </Box>
  );
}

