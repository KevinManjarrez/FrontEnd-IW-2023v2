import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  DialogActions,
  Box,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import * as Yup from "yup";
import { useFormik } from "formik";
// ... otras importaciones necesarias
//import { Componente } from "@mui/material"; // Sustituye "Componente" por el nombre del componente que desees importar


const OrdenesDetalleVModal = ({
  showModal,
  setShowModal,
  row,
  handleReload
  // Otros props que desees pasar al modal
}) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
        IdTipoEstatusOK: "",
        Actual: "S",
        Observacion: ""
    },
    validationSchema: Yup.object({
        IdTipoEstatusOK: Yup.string().required("Campo requerido"),
        Actual: Yup.string().required("Campo requerido").max(1, 'Solo se permite una letra').matches(/^[SN]$/, 'Solo se permite un caracter S/N'),
        Observacion: Yup.string().required("Campo requerido"),
    }),
    onSubmit: async (values) => {
      setMensajeExitoAlert("");
      setMensajeErrorAlert("");
      setLoading(true);

      try {
        // Lógica para guardar la información en la base de datos
        setMensajeExitoAlert("Envío actualizado correctamente");
        handleReload();
      } catch (e) {
        setMensajeErrorAlert("No se pudo registrar");
      }
      setLoading(false);
    },
  });

  const commonTextFieldProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    fullWidth: true,
    margin: "dense",
    disabled: !!mensajeExitoAlert,
  };

  return (
    <Dialog open={showModal} 
    onClose={() => setShowModal(false)}
    fullWidth>
      <form onSubmit={(e) => formik.handleSubmit(e)}>
        <DialogTitle>
          <Typography>
            <strong>Agregar Nuevo Estado de la Orden</strong>
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            id="IdTipoEstatusOK"
            label="IdTipoEstatusOK*"
            value={formik.values.IdTipoEstatusOK}
            {...commonTextFieldProps}
            error={
              formik.touched.IdTipoEstatusOK &&
              Boolean(formik.errors.IdTipoEstatusOK)
            }
            helperText={
              formik.touched.IdTipoEstatusOK && formik.errors.IdTipoEstatusOK
            }
          />
          <TextField
            id="Actual"
            label="Actual*"
            value={formik.values.Actual}
            {...commonTextFieldProps}
            error={formik.touched.Actual && Boolean(formik.errors.Actual)}
            helperText={formik.touched.Actual && formik.errors.Actual}
          />
          <TextField
            id="Observacion"
            label="Observacion*"
            value={formik.values.Observacion}
            {...commonTextFieldProps}
            error={
              formik.touched.Observacion &&
              Boolean(formik.errors.Observacion)
            }
            helperText={
              formik.touched.Observacion && formik.errors.Observacion
            }
          />
          {/* Agregar otros campos aquí si es necesario */}
        </DialogContent>
        <DialogActions sx={{ display: "flex", flexDirection: "row" }}>
          <Box m="auto">
            {mensajeErrorAlert && (
              <Alert severity="error">
                <b>¡ERROR!</b> ─ {mensajeErrorAlert}
              </Alert>
            )}
            {mensajeExitoAlert && (
              <Alert severity="success">
                <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
              </Alert>
            )}
          </Box>
          <LoadingButton
            color="secondary"
            loadingPosition="start"
            startIcon={<CloseIcon />}
            variant="outlined"
            onClick={()=>setShowModal(false)}
          >
            <span>CERRAR</span>
          </LoadingButton>
          <LoadingButton
            color="primary"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            type="submit"
            disabled={
              formik.isSubmitting || !!mensajeExitoAlert || Loading
            }
          >
            <span>GUARDAR</span>
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default OrdenesDetalleVModal;
