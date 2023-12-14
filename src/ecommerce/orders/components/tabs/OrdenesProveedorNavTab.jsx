import { Box, Tab, Tabs, Stack } from "@mui/material";
import React, { useState } from "react";

const OrdenesProveedorTabs = [
  "ordenes proveedor", 
  "ordenes estatus",
  "ordenes infoad",
  "ordenes detalle",
  "ordenes formapago"
];

const OrdenesProveedorNavTab = ({
  currentRowDetalleInOrdenesProveedorTab,
  setCurrentNameTabInOrdenesProveedorTab,
}) => {
  const [currenTabIndex, setCurrentTabIndex] = useState(0);

  //FIC: Evento Change
  const handleChange = (e) => {
    setCurrentNameTabInOrdenesProveedorTab(e.target.innerText.toUpperCase());
    switch (e.target.innerText.toUpperCase()) {
      case "ORDENES PROVEEDOR":
        setCurrentTabIndex(0);
        break;
      case "ORDENES ESTATUS":
        setCurrentTabIndex(1);
        break;
      case "ORDENES INFOAD":
        setCurrentTabIndex(2);
        break;
      case "ORDENES DETALLE":
        setCurrentTabIndex(3);
        break;
      case "ORDENES FORMAPAGO":
        setCurrentTabIndex(4);
        break;
      
    }
  };
  return (
    <Box
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        mx: 1,
        padding: 0.5,
      }}
    >
      <Tabs
        value={currenTabIndex}
        variant={"fullWidth"}
        onChange={handleChange}
        aria-label="icon tabs example"
        textColor="primary"
      >
        {OrdenesProveedorTabs.map((tab) => {
          return (
            <Tab
              key={tab}
              label={tab}
              disabled={currentRowDetalleInOrdenesProveedorTab === null}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default OrdenesProveedorNavTab;
