import { Box } from "@mui/material";
import { useState } from "react";
//FIC:
import BusinessNavTab from "./BusinessNavTab";
import InfoAdTab from "./InfoAdTab";
import FilesTab from "./FilesTab";
import PhonsTab from "./PhonesTab";
import AddressesTab from "./AddressesTab.jsx";
import WebAddressesTab from "./WebAddressesTab.jsx";

export default function BusinessTab() {
  //FIC: indicamos que al iniciar no hay ningun Instituto seleccionado.
  const [currentRowInBusinessTab, setCurrentRowInBusinessTab] = useState(0);

  //FIC: indicamos que el estado inicial del tab page principal por default sera INSTITUTOS.

  const [currentNameTabInBusinessTab, setCurrentNameTabInBusinessTab] =
    useState("ORDENES_STATUS");

  return (
    <Box>
      <BusinessNavTab
        currentRowInBusinessTab={currentRowInBusinessTab}
        setCurrentNameTabInBusinessTab={setCurrentNameTabInBusinessTab}
      />

      {/* <h2>Tab con la tabla del subdocumento de Negocios de la coleccion de Institutos</h2>
            <h2>Este debera abrir otro NAVTAB DE NEGOCIOS porque tiene subdocumentos no es un objeto final</h2> */}

      {console.log(currentNameTabInBusinessTab)}
      {/* {currentNameTabInBusinessTab == "NEGOCIOS" && <BusinessTab />} */}

      {currentNameTabInBusinessTab == "INFO ADICIONAL" && <InfoAdTab />}
      {currentNameTabInBusinessTab == "ARCHIVOS" && <FilesTab />}
      {currentNameTabInBusinessTab == "TELEFONOS" && <PhonsTab />}
      {currentNameTabInBusinessTab == "DIR WEBS" && <WebAddressesTab />}
      {currentNameTabInBusinessTab == "DOMICILIOS" && <AddressesTab />}
    </Box>
  );
}
