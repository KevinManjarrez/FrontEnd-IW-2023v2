import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import "../../../../App.css";
const BarActionsTable = ({
  handleBtnAdd,
  handleBtnUpdate,
  handleBtnDelete,
  handleBtnDetails,
  handleBtnReload,
  isItemSelected,
  hideDelete = false,
  hideUpdate = false,
}) => {
  return (
    <Stack direction="row" sx={{ m: 1 }}>
      <Box
        sx={{
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 5,
          "& svg": { mx: 0.5 },
        }}
      >
        <Tooltip title="Agregar">
          <span>
            <IconButton onClick={() => handleBtnAdd()}>
              <AddCircleIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Editar">
          <span>
            <IconButton
              onClick={() => handleBtnUpdate()}
              disabled={!isItemSelected}
              hidden={hideUpdate}
            >
              <EditIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Eliminar">
          <span>
            <IconButton
              onClick={() => handleBtnDelete()}
              disabled={!isItemSelected}
              hidden={hideDelete}
            >
              <DeleteIcon />
            </IconButton>
          </span>
        </Tooltip>
        {/* <Tooltip title="Detalles">
          <span>
          <IconButton
            onClick={() => handleBtnDetails()}
            disabled={!isItemSelected}
          >
            <InfoIcon />
          </IconButton>
            </span>
        </Tooltip> */}
        <Tooltip title="Actualizar">
          <span>
            <IconButton onClick={() => handleBtnReload()}>
              <AutorenewIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    </Stack>
  );
};
export default BarActionsTable;