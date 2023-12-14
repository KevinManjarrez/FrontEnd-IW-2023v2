import { Box } from "@mui/material";
import React from 'react';
import OrdenesProveedorEstatusTable from '../tables/OrdenesProveedorEstatusTable';
//import React, { useState } from 'react';
//import OrdenesProveedorTable from "../tables/OrdenesProveedorTable";
//import OrdenesProveedorNavTab from "./OrdenesProveedorNavTab";
export default function OrdenesProveedorStatusTab() {
    return (
    <Box>
       <OrdenesProveedorEstatusTable></OrdenesProveedorEstatusTable>
    </Box>
    );
}