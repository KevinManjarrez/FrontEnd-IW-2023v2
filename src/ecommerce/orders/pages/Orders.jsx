import { Box } from "@mui/material";
import { useState } from "react";
import OrdenesNavTab from "../components/tabs/OrdenesNavTab";
import OrdenesTab from "../components/tabs/OrdenesTab";
//import OrdenesDetalleNavTap from "../components/tabs/OrdenesDetalleNavTab"
import OrdenesDetalleTab from "../components/tabs/OrdenesDetalleTab";
import OrdenesStatusTab from "../components/tabs/OrdenesStatusTab";
import InfoAdModal from "../components/tabs/InfoAdTab";
import ProveedorTab from "../components/tabs/OrdenesProveedorTab";
import { useSelector } from "react-redux";
 


const Ordenes = () => {

    //FIC: indicamos que el estado inicial del tab page principal por default sera INSTITUTOS.
    const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] = useState("ORDENES");
    const [currentTabInPrincipalTabe, setOrdenesDetalleTabInPricipalTabIsSelected] = useState(false);

    //const selectedOrdenesData = useSelector((state) => state.ordenesReducer);    
    return (
        <Box>

            <OrdenesNavTab
                setCurrentTabInPrincipalTab={setCurrentTabInPrincipalTab}
                setOrdenesDetalleTabInPricipalTabIsSelected={setOrdenesDetalleTabInPricipalTabIsSelected}

            />
            
            {currentTabInPrincipalTab === "ORDENES" && <OrdenesTab />}

            {currentTabInPrincipalTab === "ORDENES_STATUS" && <OrdenesStatusTab />}

            {currentTabInPrincipalTab === "ORDENES_INFO" && <InfoAdModal/>}

            {currentTabInPrincipalTab == "ORDENES_DETALLES" && <OrdenesDetalleTab/>} 
            
            {currentTabInPrincipalTab == "ORDENES_PROVEEDOR" && <ProveedorTab/>} 

        </Box>
    );
}

export default Ordenes;
