//FIC: React
import React, { useState, useEffect } from "react";
//FIC: Material
import {
  Dialog,
  Autocomplete,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  DialogActions,
  Box,
  Alert,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Stack,
  Tooltip,
  Switch,
  FormControl
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
//FIC: Formik - Yup
import MyAutoComplete from "../../../../share/components/elements/atomos/MyAutoComplete";
import useInstitutos from "../../../orders/service/remote/useInstitutos";

//FIC: Helpers
import { OrdenesValues } from "../../helpers/OrdenesValues";

//FIC: Services
import { GetAllLabels } from "../../../labels/services/remote/get/GetAllLabels";
import { GetPersona } from "../../../labels/services/remote/get/GetPersona";
import { UpdatePatchOneOrder } from "../../service/remote/update/UpdatePatchOneOrder";

//FIC: Formik - Yup
import { useFormik } from "formik";
import * as Yup from "yup";

import { v4 as genID } from "uuid";

const PatchOrdenesModal = ({
  PatchOrdenesShowModal,
  setPatchOrdenesShowModal,
  row,
  handleReload
}) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);
  const [OrdenesValuesLabel, setOrdenesValuesLabel] = useState([]);
  const [RolValuesLabel, setRolValuesLabel] = useState([]);
  const [PersonaValuesLabel, setPersonaValuesLabel] = useState([]);
  const [isNuevoInstituto, setINuevoInstituto] = React.useState(false);

  useEffect(() => {
    console.log("isNuevoInstituto", isNuevoInstituto);
  }, [isNuevoInstituto]);

  const [IdGen, setIdGen] = useState(
    genID().replace(/-/g, "").substring(0, 12)
  );

  useEffect(() => {
    getDataSelectOrdenesType2();
    getDataSelectOrdenesType3();
    getDataSelectOrdenesType4();
  }, []);


  async function getDataSelectOrdenesType2() {
    try {
      const Labels = await GetAllLabels();
      const OrdenesTypes = Labels.find(
        (label) => label.IdEtiquetaOK === "IdTipoOrdenes"
      );
      const valores = OrdenesTypes.valores; // Obtenemos el array de valores
      const IdValoresOK = valores.map((valor, index) => ({
        IdValorOK: valor.Valor,
        key: valor.IdValorOK, // Asignar el índice como clave temporal
      }));
      setOrdenesValuesLabel(IdValoresOK);
      console.log(OrdenesValuesLabel)
    } catch (e) {
      console.error(
        "Error al obtener Etiquetas para Tipos Giros de Institutos:",
        e
      );
    }
  }
  async function getDataSelectOrdenesType3() {
    try {
      const Labels = await GetAllLabels();
      const OrdenesTypes = Labels.find(
        (label) => label.IdEtiquetaOK === "IdTipoRol"
      );
      const valores = OrdenesTypes.valores; // Obtenemos el array de valores
      const IdValoresOK = valores.map((valor, index) => ({
        IdValorOK: valor.Valor,
        key: valor.IdValorOK, // Asignar el índice como clave temporal
      }));
      setRolValuesLabel(IdValoresOK);
      console.log(RolValuesLabel)
    } catch (e) {
      console.error(
        "Error al obtener Etiquetas para Tipos Giros de Institutos:",
        e
      );
    }
  }
  async function getDataSelectOrdenesType4() {
    try {
      const Labels = await GetPersona();
      
      // Comprueba si Labels es un array y si tiene datos
      if (Array.isArray(Labels) && Labels.length > 0) {
        const IdValoresOK = Labels.map((valor, index) => ({
          IdValorOK: valor.Nombre,
          key: valor.IdPersonaOK,
        }));
        
        setPersonaValuesLabel(IdValoresOK);
        console.log(PersonaValuesLabel);
      } else {
        console.log('El resultado de GetPersona() no es un array o está vacío');
      }
    } catch (e) {
      console.error(
        "Error al obtener Etiquetas para Tipos Giros de Institutos:",
        e
      );
    }
  }

  useEffect(() => {
    getDataSelectOrdenesType2();
    getDataSelectOrdenesType3();
    getDataSelectOrdenesType4();
  }, []);

  //FIC: Definition Formik y Yup.
  const formik = useFormik({
    initialValues: {
      IdInstitutoOK: row.IdInstitutoOK,
      IdNegocioOK: row.IdNegocioOK,
      IdOrdenOK: row.IdOrdenOK,
      IdOrdenBK: row.IdOrdenBK,
      IdTipoOrdenOK: row.IdTipoOrdenOK,
      IdRolOK: row.IdRolOK,
      IdPersonaOK: row.IdPersonaOK,
    },
    validationSchema: Yup.object({
      IdOrdenOK: Yup.string()
        .required("Campo requerido")
        .matches(
          /^[a-zA-Z0-9-]+$/,
          "Solo se permiten caracteres alfanuméricos"
        ),
      IdOrdenBK: Yup.string().required("Campo requerido"),
      IdTipoOrdenOK: Yup.string().required("Campo requerido"),
      IdRolOK: Yup.string().required("Campo requerido"),
      IdPersonaOK: Yup.string().required("Campo requerido"),
    }),

    onSubmit: async (values) => {
      //FIC: mostramos el Loading.
      setMensajeExitoAlert("");
      setMensajeErrorAlert("");
      setLoading(true);

      //FIC: notificamos en consola que si se llamo y entro al evento.
      console.log(
        "FIC: entro al onSubmit despues de hacer click en boton Guardar"
      );
      //FIC: reiniciamos los estados de las alertas de exito y error.
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        const Ordenes = OrdenesValues(values);
        console.log("<<Ordenes>>", Ordenes);

        await UpdatePatchOneOrder(row.IdInstitutoOK,row.IdNegocioOK,row.IdOrdenOK,Ordenes); //se puede sacar el objectid con row._id para lo del fic aaaaaaaaaaaaaaaaaaa
        setMensajeExitoAlert("Envío actualizado Correctamente");
        handleReload(); //usar la función para volver a cargar los datos de la tabla y que se vea la actualizada
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo Modificar");
      }
      setLoading(false);
    },
  });
  //FIC: props structure for TextField Control.
  const commonTextFieldProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    fullWidth: true,
    margin: "dense",
    disabled: !!mensajeExitoAlert,
  };

  const { etiquetas, etiquetaEspecifica } = useInstitutos({IdInstitutoOK: formik.values.IdInstitutoOK || "",});

  return (
    <Dialog
      open={PatchOrdenesShowModal}
      onClose={() => setPatchOrdenesShowModal(false)}
      fullWidth
    >
      <form onSubmit={(e) => {formik.handleSubmit(e); }}>
        {/* FIC: Aqui va el Titulo de la Modal */}
        <DialogTitle>
          <Typography>
            <strong>
              Modificar Orden
            </strong>
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          {/* FIC: Campos de captura o selección */}
          <Stack direction="row" alignItems="center">
        <MyAutoComplete
          
          label="Selecciona un Instituto"
          options={etiquetas}
          displayProp="IdInstitutoOK"
          idProp="IdInstitutoOK"
          onSelectValue={(selectedValue) => {
            formik.values.IdInstitutoOK = selectedValue ? selectedValue?.IdInstitutoOK : "";
            setRefresh(!refresh);
          }}
          disabled
        />
        <Tooltip title="Agrega manualmente una etiqueta nueva">
          <FormControlLabel
            sx={{ ml: 2 }}
            control={<Switch defaultChecked />}
            label={isNuevoInstituto ? "Agregar Nuevo Instituto" : "Seleccionar un Instituto"}
            
            onChange={() => {
              setINuevoInstituto(!isNuevoInstituto);
              formik.values.IdInstitutoOK = "";
            }}
            disabled
          />
        </Tooltip>
        </Stack> 
        <TextField
            id="IdInstitutoOK"
            label="IdInstitutoOK*"
            value={formik.values.IdInstitutoOK}
            
            {...commonTextFieldProps}
            error={ formik.touched.IdInstitutoOK && Boolean(formik.errors.IdInstitutoOK) }
            helperText={ formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK }
            disabled
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Selecciona un Negocio</InputLabel>
          <Select
            value={formik.values.IdNegocioOK}
            label="Selecciona una opción"
            onChange={formik.handleChange}
            name="IdNegocioOK" // Asegúrate de que coincida con el nombre del campo
            onBlur={formik.handleBlur}
            disabled
            >
            {etiquetaEspecifica?.cat_negocios.map((seccion) => {
                return (
                <MenuItem
                    value={seccion.IdNegocioOK}
                    key={seccion.IdNegocioOK}
                >
                    {seccion.Alias}
                </MenuItem>
                );
            })}
          </Select>
            <FormHelperText>
            {formik.touched.IdNegocioOK && formik.errors.IdNegocioOK}
            </FormHelperText>
          </FormControl>
          <TextField
            id="IdOrdenOK"
            label="IdOrdenOK*"
            value={formik.values.IdOrdenOK}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={formik.touched.IdOrdenOK && Boolean(formik.errors.IdOrdenOK)}
            helperText={formik.touched.IdOrdenOK && formik.errors.IdOrdenOK}
            disabled={true}
          />
          <TextField
            id="IdOrdenBK"
            label="IdOrdenBK*"
            value={formik.values.IdOrdenBK}
            {...commonTextFieldProps}
            error={formik.touched.IdOrdenBK && Boolean(formik.errors.IdOrdenBK)}
            helperText={formik.touched.IdOrdenBK && formik.errors.IdOrdenBK}
          />
          <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="dynamic-select-tipo-orden">Tipo de Orden</InputLabel>
          <Select
            id="dynamic-select-tipo-orden"
            value={formik.values.IdTipoOrdenOK}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="IdTipoOrdenOK"
            aria-label="TipoOrden"
          >
            {OrdenesValuesLabel.map((option, index) => (
              <MenuItem key={option.IdValorOK} value={`IdTipoOrdenes-${option.key}`}>
                {option.IdValorOK}
              </MenuItem>
            ))}
          </Select>
          </FormControl >
          <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="dynamic-select-rol">Rol</InputLabel>
          <Select
            id="dynamic-select-rol"
            value={formik.values.IdRolOK}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="IdRolOK"
            aria-label="Rol"
          >
            {RolValuesLabel.map((option, index) => (
              <MenuItem key={option.IdValorOK} value={`IdTipoRol-${option.key}`}>
                {option.IdValorOK}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
          <div style={{ margin: '10px 0' }}></div>
          <Autocomplete
            id="dynamic-autocomplete-persona"
            options={PersonaValuesLabel}
            
            getOptionLabel={(option) => option.IdValorOK}
            value={PersonaValuesLabel.find((option) => option.key === formik.values.IdPersonaOK) || null}
            onChange={(e, newValue) => {
              formik.setFieldValue("IdPersonaOK", newValue ? newValue.key : "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={"Selecciona una Persona"}
                error={formik.touched.IdPersonaOK && Boolean(formik.errors.IdPersonaOK)}
                helperText={formik.touched.IdPersonaOK && formik.errors.IdPersonaOK}
              />
            )}
          />          
        </DialogContent>
        {/* FIC: Aqui van las acciones del usuario como son las alertas o botones */}
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
          {/* FIC: Boton de Cerrar. */}
          <LoadingButton
            color="secondary"
            loadingPosition="start"
            startIcon={<CloseIcon />}
            variant="outlined"
            onClick={() => setPatchOrdenesShowModal(false)}
          >
            <span>CERRAR</span>
          </LoadingButton>
          {/* FIC: Boton de Guardar. */}
          <LoadingButton
            color="primary"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            type="submit"
            disabled={formik.isSubmitting || !!mensajeExitoAlert || Loading}
            loading={Loading}
          >
            <span>
              Actualiar
            </span>
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default PatchOrdenesModal;
