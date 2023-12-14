import { Box, Tab, Tabs, Stack } from "@mui/material";
import React, { useState } from "react";

const OrdenesDetalleTabs = [
  "Orden Detalle",
  "ESTATUS FISICO",
  "ESTATUS VENTA",
  "ESTATUS UBICACION",
  "ESTATUS PROCESO",
  "ESTATUS INFO AD"
];

const OrdenesDetalleNavTab = ({
  currentRowDetalleInOrdenesDetalleTab,
  setCurrentNameTabInOrdenesDetalleTab,
}) => {
  const [currenTabIndex, setCurrentTabIndex] = useState(0);

  //FIC: Evento Change
  const handleChange = (e) => {
    setCurrentNameTabInOrdenesDetalleTab(e.target.innerText.toUpperCase());
    switch (e.target.innerText.toUpperCase()) {
      case "ORDEN DETALLE":
        setCurrentTabIndex(0);
        break;
      case "ESTATUS FISICO":
        setCurrentTabIndex(1);
        break;
      case "ESTATUS VENTA":
        setCurrentTabIndex(2);
        break;
      case "ESTATUS UBICACION":
        setCurrentTabIndex(3);
        break;
      case "ESTATUS PROCESO":
        setCurrentTabIndex(4);
        break;
      case "ESTATUS INFO AD":
        setCurrentTabIndex(5);
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
        {OrdenesDetalleTabs.map((tab) => {
          return (
            <Tab
              key={tab}
              label={tab}
              disabled={currentRowDetalleInOrdenesDetalleTab === null}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default OrdenesDetalleNavTab;
