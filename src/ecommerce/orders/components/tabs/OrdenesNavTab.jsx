import { Box, Tabs, Tab, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

const OrdenesTabs = [
  "ORDENES",
  "ORDENES_STATUS",
  "ORDENES_INFO",
  "ORDENES_DETALLES",
  "ORDENES_PROVEEDOR"
];

const OrdenesNavTab = ({
  currentRowInOrdenesTab,
  setCurrentTabInPrincipalTab,
  setOrdenesDetalleTabInPricipalTabIsSelected,
}) => {
  const [currenTabIndex, setCurrentTabIndex] = useState(0);

  const handleChange = (e,newIndex) => {
    setCurrentTabIndex((prevIndex) => newIndex);
    console.log("entro al handleChange", e.target.innerText.toUpperCase());
    //FIC: actualizar el nombre de la pestaña seleccionada.
    setCurrentTabInPrincipalTab(e.target.innerText.toUpperCase());
    //FIC: cada que realice un click en algun tap page
    //reiniciamos el valor del tap pase de business a false.
    setOrdenesDetalleTabInPricipalTabIsSelected(false);
    //FIC: opciones (subdocumentos de la coleccion principal de Ordenes).
    switch (e.target.innerText.toUpperCase()) {
      case "ORDENES":
        setCurrentTabIndex(0);
        break;
      case "ORDENES_STATUS":
        setCurrentTabIndex(1);
        break;

      case "ORDENES_INFO":
        setCurrentTabIndex(2);
        break;

      case "ORDENES_DETALLES":
        setCurrentTabIndex(3);
        break;

        case "ORDENES_PROVEEDOR":
        setCurrentTabIndex(4);
        break;
    }
    //FIC: cambiamos el estado de la tap de business a un true para indicar
    //que el usuario ya hizo click en esta pestaña y entonces se despliegue el
    //BusinessNavTap con los tab pages de este nivel (subdocumento) que contiene
    //mas subdocumentos como: negocio, info adicional, archivos, telefonos, etc.
    //if (e.target.innerText.toUpperCase() == "ORDENES_STATUS") setBusinessTabInPrincipalTabIsSelected(true);
    //if (e.target.innerText.toUpperCase() == "ORDENES_INFO") setUserTabInPrincipalTabIsSelected(true);
    //if (e.target.innerText.toUpperCase() == "ORDENES_DETALLES") setBusinessTabInPrincipalTabIsSelected(true);
  };

  return (
    <Box
      sx={{
        border: (theme) => `2px solid ${theme.palette.divider}`,
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
        {OrdenesTabs.map((tab) => {
          return (
            <Tab
              key={tab}
              label={tab}
              disabled={currentRowInOrdenesTab === null}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};
export default OrdenesNavTab;
