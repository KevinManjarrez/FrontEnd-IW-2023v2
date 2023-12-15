import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  DialogActions,
  Box,
  Alert,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import * as Yup from "yup";
import { useFormik } from "formik";
// ... otras importaciones necesarias
import { GetOneOrderByID } from "../../service/remote/get/GetOneOrderByID";
import { OrdenesDetallesUValues } from "../../helpers/OrdenesDetallesUValues";

const OrdenesDetalleUModal = ({
  showModal,
  setShowModal,
  row,
  selectRow,
  index
  //handleReload
  // Otros props que desees pasar al modal
}) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
        IdTipoEstatusOK: "",
        Actual: true,
        Observacion: ""
    },
    validationSchema: Yup.object({
        IdTipoEstatusOK: Yup.string().required("Campo requerido"),
        Actual: Yup.boolean().oneOf([true], 'Campo requerido'),    
    }),
    onSubmit: async (values) => {
      setMensajeExitoAlert("");
      setMensajeErrorAlert("");
      setLoading(true);
      //FIC: reiniciamos los estados de las alertas de exito y error.
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        // Lógica para guardar la información en la base de datos
        //console.log(row.IdInstitutoOK,row.IdNegocioOK,row.IdOrdenOK)
        const ordenExistente = await GetOneOrderByID(row.IdInstitutoOK,row.IdNegocioOK,row.IdOrdenOK);
        const ordenDetalleSeleccionada= {...selectRow};

        console.log("<<Ordenes>>",ordenExistente.ordenes_detalle[index].pedidos_detalle_ps_estatus_u);
        
        for (let i = 0; i < ordenExistente.ordenes_detalle[index].pedidos_detalle_ps_estatus_u.length; i++) {
            console.log("Entro")
            ordenExistente.ordenes_detalle[index].pedidos_detalle_ps_estatus_u[i]= {
                IdTipoEstatusOK: ordenExistente.ordenes_detalle[index].pedidos_detalle_ps_estatus_u[i].IdTipoEstatusOK,
                Actual: "N",
                Observacion:ordenExistente.ordenes_detalle[index].pedidos_detalle_ps_estatus_u[i].Observacion
              };
              console.log("Realizo",ordenExistente)
        }
        
        values.Actual == true ? (values.Actual = "S") : (values.Actual = "N");

        const EstatusOrdenes = OrdenesDetallesUValues(values, ordenExistente);
        //const EstatusOrdenes = OrdenesEstatusValues(values);
        
        console.log("<<Ordenes>>", EstatusOrdenes);
        // console.log("LA ID QUE SE PASA COMO PARAMETRO ES:", row._id);
        // Utiliza la función de actualización si estamos en modo de edición
        
        //await UpdatePatchOneOrder(row.IdInstitutoOK,row.IdNegocioOK,row.IdOrdenOK,EstatusOrdenes);
        setMensajeExitoAlert("Envío actualizado correctamente");
        //handleReload();
      } catch (e) {
        setMensajeExitoAlert(null);
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
            fullWidth
    >
      <form onSubmit={(e) => {formik.handleSubmit(e)}}>
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
          <FormControlLabel
              control={
              <Checkbox
                  id="Actual2"
                  checked={formik.values.Actual}  // Suponiendo que formik.values.Actual es un booleano
                  onChange={(event) => {
                  formik.setFieldValue('Actual2', event.target.checked);
                  }}
                  {...commonTextFieldProps}
                  disabled={!!mensajeExitoAlert}
              />
              }
              label="Actual*"
              error={formik.touched.Actual && Boolean(formik.errors.Actual)}
          />
          <TextField
            id="Observacion"
            label="Observacion*"
            value={formik.values.Observacion}
            {...commonTextFieldProps}
                        error={ formik.touched.Observacion && Boolean(formik.errors.Observacion) }
                        helperText={ formik.touched.Observacion && formik.errors.Observacion }
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
            onClick={() => setShowModal(false)}
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

export default OrdenesDetalleUModal;
