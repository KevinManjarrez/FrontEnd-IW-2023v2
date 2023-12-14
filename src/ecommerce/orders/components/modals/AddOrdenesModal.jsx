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
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Stack,
  Tooltip,
  Switch
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
//FIC: Formik - Yup
//FIC: Helpers
import { OrdenesValues } from "../../helpers/OrdenesValues";

//FIC: Services
import { AddOneOrdenes } from "../../service/remote/post/AddOneOrdenes";
import { getAllOrdenes } from "../../service/remote/get/GetAllOrdenes";
import MyAutoComplete from "../../../../share/components/elements/atomos/MyAutoComplete";
import useInstitutos from "../../../orders/service/remote/useInstitutos";

//FIC: Services
import { GetAllLabels } from "../../../labels/services/remote/get/GetAllLabels";
import { GetPersona } from "../../../labels/services/remote/get/GetPersona";

import { useFormik } from "formik";
import * as Yup from "yup";

import { v4 as genID } from "uuid";

const AddOrdenesModal = ({
  AddOrdenesShowModal,
  setAddOrdenesShowModal,
  handleReload,
  productSel
}) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);
  const [OrdenesData, setOrdenesData] = useState([]);
  const [OrdenesValuesLabel, setOrdenesValuesLabel] = useState([]);
  const [RolValuesLabel, setRolValuesLabel] = useState([]);
  const [PersonaValuesLabel, setPersonaValuesLabel] = useState([]);
  const [isNuevoInstituto, setINuevoInstituto] = React.useState(false);
  const [refresh, setRefresh] = useState(false);

  /*useEffect(() => {
      console.log("Todas las Etiquetas", etiquetas);
      console.log(" etiquetaEspecifica", etiquetaEspecifica);
    }, [etiquetas, etiquetaEspecifica]);
*/
    useEffect(() => {
      console.log("isNuevoInstituto", isNuevoInstituto);
    }, [isNuevoInstituto]);
  

  const [IdGen, setIdGen] = useState(
    genID().replace(/-/g, "").substring(0, 12)
  );
  //FIC: en cuanto se abre la modal llama el metodo
  //que ejecuta la API que trae todas las etiquetas de la BD.
  

  //FIC: Ejecutamos la API que obtiene todas las etiquetas
  //y filtramos solo la etiqueta de Tipos Giros de Institutos
  //para que los ID y Nombres se agreguen como items en el
  //control <Select> del campo IdTipoGiroOK en la Modal.
  /*async function getDataSelectOrdenesType() {
    try {
      const Labels = await GetAllLabels();
      const OrdenesTypes = Labels.find(
        (label) => label.IdEtiquetaOK === "IdTipoOrdenes"
      );
      const valores = OrdenesTypes.valores; // Obtenemos el array de valores
      const IdValoresOK = valores.map((valor, index) => ({
        IdValorOK: valor.IdValorOK,
        key: index, // Asignar el índice como clave temporal
      }));
      setOrdenesValuesLabel(IdValoresOK);
      console.log(OrdenesValuesLabel)
    } catch (e) {
      console.error(
        "Error al obtener Etiquetas para Tipos Giros de Institutos:",
        e
      );
    }
  }*/


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
    //getDataSelectOrdenesType();
    getDataSelectOrdenesType2();
    getDataSelectOrdenesType3();
    getDataSelectOrdenesType4();
  }, []);
  

  //useEffect para si estamos actualizando el campo no se pueda editar, se usa dentro del mismo textfield
  // Dentro del componente AddShippingModal

  //Este metodo es para refrescar la tabla
 

  
  
  //FIC: Definition Formik y Yup.
  const formik = useFormik({
    initialValues: {
      IdInstitutoOK: "",
      IdNegocioOK: "",
      IdOrdenOK: `9001-${IdGen}`,
      IdOrdenBK: "",
      IdTipoOrdenOK: "",
      IdRolOK: "",
      /* Matriz: "", */
      //Matriz: false,
      IdPersonaOK: "",
    },
    validationSchema: Yup.object({
      IdOrdenOK: Yup.string()
        .required("Campo requerido")
        .matches(
          /^[a-zA-Z0-9-]+$/,
          "Solo se permiten caracteres alfanuméricos"
        ),
      IdOrdenBK: Yup.string().required("Campo requerido"),
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

        //FIC: mandamos a consola los datos extraidos
        console.log("<<Ordenes>>", Ordenes);
        //FIC: llamar el metodo que desencadena toda la logica
        //para ejecutar la API "AddOneInstitute" y que previamente
        //construye todo el JSON de la coleccion de Institutos para
        //que pueda enviarse en el "body" de la API y determinar si
        //la inserción fue o no exitosa.
        await AddOneOrdenes(Ordenes);
        //FIC: si no hubo error en el metodo anterior
        //entonces lanzamos la alerta de exito.
        setMensajeExitoAlert("Instituto fue creado y guardado Correctamente");
        //FIC: falta actualizar el estado actual (documentos/data) para que
        //despues de insertar el nuevo instituto se visualice en la tabla.
        handleReload();
        //}
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo crear el Instituto");
      }

      //FIC: ocultamos el Loading.
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
      open={AddOrdenesShowModal}
      onClose={() => setAddOrdenesShowModal(false)}
      fullWidth
    >
      <form onSubmit={(e) => {formik.handleSubmit(e); }}>
        {/* FIC: Aqui va el Titulo de la Modal */}
        <DialogTitle>
          <Typography>
            <strong>
              Agregar nueva Orden
            </strong>
          </Typography>
        </DialogTitle>
        {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
        {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
        {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          {/* FIC: Campos de captura o selección */}
          <Stack direction="row" alignItems="center">
                    <MyAutoComplete
                    disabled={!!mensajeExitoAlert || isNuevoInstituto}
                    label={"Selecciona un Instituto"}
                    options={etiquetas} //Arreglo de objetos
                    displayProp="IdInstitutoOK" // Propiedad a mostrar
                    idProp="IdInstitutoOK" // Propiedad a guardar al dar clic
                    onSelectValue={(selectedValue) => {
                        //console.log("Selección:", selectedValue);
                        formik.values.IdInstitutoOK = selectedValue
                        ? selectedValue?.IdInstitutoOK
                        : "";
                        formik.values.IdInstitutoOK = selectedValue
                        ? selectedValue?.IdInstitutoOK
                        : "";
                        setRefresh(!refresh);
                    }}
                    />
                    <Tooltip title="Agrega manualmente una etiqueta nueva">
                    <FormControlLabel
                        sx={{ ml: 2 }}
                        control={<Switch defaultChecked />}
                        label={
                        isNuevoInstituto
                            ? "Agregar Nuevo Instituto"
                            : "Seleccionar un Instituto"
                        }
                        onChange={() => {
                        setINuevoInstituto(!isNuevoInstituto);
                        formik.values.IdInstitutoOK = "";
                        }}
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
                    />


          {/*<TextField
            id="IdInstitutoOK"
            label="IdInstitutoOK*"
                      value={formik.values.IdInstitutoOK}
            /* onChange={formik.handleChange} */}
            {/*...commonTextFieldProps}
            error={formik.touched.IdInstitutoOK && Boolean(formik.errors.IdInstitutoOK)}
            helperText={formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK}
            disabled={true}
          />*/}
          {/*<TextField
            id="IdNegocioOK"
            label="IdNegocioOK*"
            value={formik.values.IdNegocioOK}
            
            /* onChange={formik.handleChange} */}
            {/*...commonTextFieldProps}
            error={formik.touched.IdNegocioOK && Boolean(formik.errors.IdNegocioOK)}
            helperText={formik.touched.IdNegocioOK && formik.errors.IdNegocioOK}
            disabled={true}
          />*/}
          <FormControl fullWidth margin="normal">
                    <InputLabel>Selecciona un Negocio</InputLabel>
                    <Select
                    value={formik.values.IdNegocioOK}
                    label="Selecciona una opción"
                    onChange={formik.handleChange}
                    name="IdNegocioOK" // Asegúrate de que coincida con el nombre del campo
                    onBlur={formik.handleBlur}
                    disabled={!!mensajeExitoAlert}
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
              <MenuItem key={option.IdValorOK} value={option.key}>
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
              <MenuItem key={option.IdValorOK} value={option.key}>
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
            onClick={() => setAddOrdenesShowModal(false)}
          >
            <span>CERRAR</span>
          </LoadingButton>
          {/* FIC: Boton de Guardar. */}
          {/* FIC: Boton de Guardar. */}
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
              Guardar
            </span>
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default AddOrdenesModal;
