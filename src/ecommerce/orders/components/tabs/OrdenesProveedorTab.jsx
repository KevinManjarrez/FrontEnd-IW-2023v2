import { Box } from "@mui/material";
import React, { useState } from 'react';
import OrdenesProveedorTable from "../tables/OrdenesProveedorTable";
import OrdenesProveedorNavTab from "./OrdenesProveedorNavTab";
import OrdenesProveedorStatusTab from "./OrdenesProveedorStatusTab";
import OrdenesProveedorDetalleTab from "./OrdenesProveedorDetalleTab";
import OrdenesProveedorInfoAdTab from "./OrdenesProveedorInfoAdTab";
import OrdenesProveedorPagoTab from "./OrdenesProveedorPagoTab";

export default function OrdenesProveedorTab() {
  const [currentRowDetalleInOrdenesProveedorTab, setCurrentRowInOrdenesProveedorTab] = useState(0);
  const [currentNameTabInOrdenesProveedorTab, setCurrentNameTabInOrdenesProveedorTab] =
    useState("ORDENES PROVEEDOR");
  return (
    <Box>
       <OrdenesProveedorNavTab
        currentRowDetalleInOrdenesProveedorTab={currentRowDetalleInOrdenesProveedorTab}
        setCurrentNameTabInOrdenesProveedorTab={setCurrentNameTabInOrdenesProveedorTab}
      />
      {console.log(currentNameTabInOrdenesProveedorTab)}

      {currentNameTabInOrdenesProveedorTab == "ORDENES ESTATUS" && <OrdenesProveedorStatusTab/>}
      {currentNameTabInOrdenesProveedorTab == "ORDENES INFOAD" && <OrdenesProveedorInfoAdTab/>}
      {currentNameTabInOrdenesProveedorTab == "ORDENES DETALLE" && <OrdenesProveedorDetalleTab/>}
      {currentNameTabInOrdenesProveedorTab == "ORDENES FORMAPAGO" && <OrdenesProveedorPagoTab/>}
      
      {currentNameTabInOrdenesProveedorTab === "ORDENES PROVEEDOR" && <OrdenesProveedorTable />}
    
    </Box>
  );
}