import React, { useEffect, useState } from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Stack,
  Tooltip,
  FormControlLabel,
  Switch,
} from "@mui/material";

//import { InfoAdModel } from "../../models/InfoAdModel";
import useEtiquetas from "../../../orders/service/remote/useEtiquetas";
import MyAutoComplete from "../../../../share/components/elements/atomos/MyAutoComplete";

import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import {  PatchInfoAd } from "../../service/remote/update/PatchInfoAd";
import { GetOneOrderByID } from "../../service/remote/get/GetOneOrderByID";
import {cloneDeep} from 'lodash/cloneDeep';


const UpdateInfoAd = ({
  infoAdSel,
  productSel,
  openModalUpdate,
  setOpenModalUpdate,
  idRowSel,
  handleReload,
}) => {
  const [loading, setLoading] = useState(false);
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  //
  const [isNuevaEtiqueta, setINuevaEtiqueta] = React.useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    console.log("isNuevaEtiqueta", isNuevaEtiqueta);
  }, [isNuevaEtiqueta]);
  
  const formik = useFormik({
    initialValues: {
      IdEtiquetaOK: infoAdSel.IdEtiquetaOK,
      IdEtiqueta: infoAdSel.IdEtiqueta,
      IdTipoSeccionOK: infoAdSel.IdTipoSeccionOK,
      Valor: infoAdSel.Valor,
      Secuencia: infoAdSel.Secuencia,
    },
    validationSchema: Yup.object({
      IdEtiquetaOK: Yup.string().required("Campo requerido"),
      IdEtiqueta: Yup.string().required("Campo requerido"),
      IdTipoSeccionOK: Yup.string().required("Campo requerido"),
      Valor: Yup.string("").required("Campo requerido"),
      Secuencia: Yup.string().required("Campo requerido"),
    }),
    onSubmit: async (values) => {
      setMensajeExitoAlert("");
      setMensajeErrorAlert("");
      setLoading(true);
      try {
        //Modificar el producto con el Formulario
        //let product = JSON.parse(JSON.stringify(productSel));
        console.log("algo",productSel)
        const ordenExistente = await GetOneOrderByID(productSel.IdInstitutoOK,productSel.IdNegocioOK,productSel.IdOrdenOK);
        console.log("antes:",ordenExistente)
        
        if (idRowSel >= 0) {
          // Crea una copia del objeto en idRowSel y modifica la propiedad IdEtiquetaOK
          ordenExistente.ordenes_info_ad[idRowSel]= {
            //...product.ordenes_info_ad[idRowSel],
              IdEtiquetaOK: values.IdEtiquetaOK,
              IdEtiqueta: values.IdEtiqueta,
              IdTipoSeccionOK:values.IdTipoSeccionOK,
              Valor: values.Valor,
              Secuencia:Number(values.Secuencia)
          };
          
        }
        
        console.log("temp:",ordenExistente)
        const dataToUpdate = {
          ordenes_info_ad: ordenExistente.ordenes_info_ad,
        };
        console.log("data",dataToUpdate);
        await PatchInfoAd(ordenExistente.IdInstitutoOK,ordenExistente.IdNegocioOK,ordenExistente.IdOrdenOK, dataToUpdate);
        
        setMensajeExitoAlert("InfoAd modificada Correctamente");
        handleReload();
        console.log("Se modifico")
      } catch (e) {
        setMensajeErrorAlert("No se pudo Modificar InfoAd");
      }
      setLoading(false);
    },
  });
  
  const { etiquetas, etiquetaEspecifica } = useEtiquetas({
    IdInstitutoOK: productSel.IdInstitutoOK,
    IdEtiquetaOK: formik.values.IdEtiquetaOK || "",
  });
  //FIC: props structure for TextField Control.
  const commonTextFieldProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    fullWidth: true,
    margin: "dense",
    disabled: !!mensajeExitoAlert,
  };


  return (
    <Dialog
      open={openModalUpdate}
      onClose={() => setOpenModalUpdate(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle
          style={{
            backgroundColor: "#1976d2", // Color de Fondo
            color: "white", // Color del Texto
          }}
        >
          <Typography style={{ fontSize: "25px" }}>
            <strong>Modificar Info Adicional</strong>
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Stack direction="row" alignItems="center">
            <MyAutoComplete
              disabled={!!mensajeExitoAlert || isNuevaEtiqueta}
              label={"Selecciona una Etiqueta"}
              options={etiquetas} //Arreglo de objetos
              displayProp="Etiqueta" // Propiedad a mostrar
              idProp="IdEtiquetaOK" // Propiedad a guardar al dar clic
              onSelectValue={(selectedValue) => {
              //console.log("Selección:", selectedValue);
                formik.values.IdEtiqueta = selectedValue
                ? selectedValue?.IdEtiquetaOK
                : "";
                formik.values.IdEtiquetaOK = selectedValue
                ? selectedValue?.IdEtiquetaOK
                : "";
                setRefresh(!refresh);
              }}
            />
            <Tooltip title="Agrega manualmente una etiqueta nueva">
              <FormControlLabel
                sx={{ ml: 2 }}
                control={<Switch defaultChecked />}
                label={
                  isNuevaEtiqueta
                  ? "Agregar Nueva Etiqueta"
                  : "Seleccionar una Etiqueta"
                }
                onChange={() => {
                  setINuevaEtiqueta(!isNuevaEtiqueta);
                  formik.values.IdEtiqueta = "";
                }}
              />
            </Tooltip>
          </Stack>
          <TextField
            id="IdEtiquetaOK"
            label="IdEtiquetaOK*"
            value={formik.values.IdEtiquetaOK}
            error={
              formik.touched.IdEtiquetaOK && Boolean(formik.errors.IdEtiquetaOK)
            }
            helperText={
              formik.touched.IdEtiquetaOK && formik.errors.IdEtiquetaOK
            }
            {...commonTextFieldProps}
            disabled={!!mensajeExitoAlert}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Selecciona una opción</InputLabel>
            <Select
              value={formik.values.IdTipoSeccionOK}
              label="Selecciona una opción"
              onChange={formik.handleChange}
              name="IdTipoSeccionOK" // Asegúrate de que coincida con el nombre del campo
              onBlur={formik.handleBlur}
              disabled={!!mensajeExitoAlert}
            >
              {etiquetaEspecifica?.valores.map((seccion) => {
                return (
                  <MenuItem
                    value={`IdEstatusCatProdServ-${seccion.IdValorOK}`}
                    key={seccion.IdValorOK}
                  >
                    {seccion.Valor}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>
              {formik.touched.IdTipoSeccionOK && formik.errors.IdTipoSeccionOK}
            </FormHelperText>
          </FormControl>
          <TextField
            id="Valor"
            label="Valor*"
            value={formik.values.Valor}
            error={formik.touched.Valor && Boolean(formik.errors.Valor)}
            helperText={formik.touched.Valor && formik.errors.Valor}
            {...commonTextFieldProps}
            disabled={!!mensajeExitoAlert}
          />
          <TextField
            id="IdTipoSeccionOK"
            label="IdTipoSeccionOK*"
            value={formik.values.IdTipoSeccionOK}
            error={
              formik.touched.Valor && Boolean(formik.errors.IdTipoSeccionOK)
            }
            helperText={
              formik.touched.IdTipoSeccionOK && formik.errors.IdTipoSeccionOK
            }
            {...commonTextFieldProps}
            disabled={!!mensajeExitoAlert}
          />
          <TextField
            id="Secuencia"
            label="Secuencia*"
            value={formik.values.Secuencia}
            error={formik.touched.Secuencia && Boolean(formik.errors.Secuencia)}
            helperText={formik.touched.Secuencia && formik.errors.Secuencia}
            {...commonTextFieldProps}
            disabled={!!mensajeExitoAlert}
          />
        </DialogContent>
        <DialogActions sx={{ width: "auto" }}>
          <Box m="auto">
            {!formik.isValid && (
              <Alert severity="error">{"El formulario contiene Errores"}</Alert>
            )}
            {mensajeErrorAlert !== "" && (
              <Alert severity="error">
                <b>¡ERROR!</b> ─ {mensajeErrorAlert}
              </Alert>
            )}
            {mensajeExitoAlert !== "" && (
              <Alert severity="success">
                <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
              </Alert>
            )}
          </Box>
          <LoadingButton
            sx={{ p: 1.5, px: 2 }}
            color="secondary"
            loadingPosition="start"
            startIcon={<CloseIcon />}
            variant="outlined"
            onClick={() => setOpenModalUpdate(false)}
          >
            <span>CERRAR</span>
          </LoadingButton>
          <LoadingButton
            type="submit"
            sx={{ p: 1.5, px: 2 }}
            color="primary"
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            disabled={!formik.isValid || !!mensajeExitoAlert}
          >
            <span>MODIFICAR</span>
          </LoadingButton>
        </DialogActions>{" "}
      </form>
    </Dialog>
  );
};
export default UpdateInfoAd;