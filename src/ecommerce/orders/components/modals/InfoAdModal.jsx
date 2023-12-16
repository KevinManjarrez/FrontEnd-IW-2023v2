import React, { useEffect, useState } from "react";
import {
    TextField,
    Autocomplete,
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
    Button,
    Tooltip,
    ToggleButton,
    FormControlLabel,
    Switch,
  } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { InfoAdModel } from "../../models/InfoAdModel";
import useEtiquetas from "../../../orders/service/remote/useEtiquetas";
import MyAutoComplete from "../../../../share/components/elements/atomos/MyAutoComplete";

//FIC: Formik - Yup
import { useFormik } from "formik";
import * as Yup from "yup";

//helpers
import { OrdenesInfoAdValues } from "../../helpers/OrdenesInfoAdValues";
//SERVICES
import { PatchInfoAd } from "../../service/remote/update/PatchInfoAd";
import { GetOneOrderByID } from "../../service/remote/get/GetOneOrderByID";
import { UpdatePatchOneOrder } from "../../service/remote/post/AddOrdenesEstatus";
import { GetAllLabels } from "../../../labels/services/remote/get/GetAllLabels";


const InfoAdModal = ({ 
    openModalAdd,
    setOpenModalAdd,
    productSel, 
    handleReload
}) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [isNuevaEtiqueta, setINuevaEtiqueta] = React.useState(false);
    const [OrdenesValuesLabel, setOrdenesValuesLabel] = useState([]);

    async function getDataSelectOrdenesType2() {
        try {
          const Labels = await GetAllLabels();
          const OrdenesTypes = Labels.find(
            (label) => label.IdEtiquetaOK === "IdSeccionesOrdenes"
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

      useEffect(() => {
        getDataSelectOrdenesType2();
      }, []);

    /*useEffect(() => {
        console.log("Todas las Etiquetas", etiquetas);
        console.log(" etiquetaEspecifica", etiquetaEspecifica);
      }, [etiquetas, etiquetaEspecifica]);
*/
      useEffect(() => {
        console.log("isNuevaEtiqueta", isNuevaEtiqueta);
      }, [isNuevaEtiqueta]);


    //FIC: Definition Formik y Yup.
    const formik = useFormik({
        initialValues: {
          IdEtiquetaOK: "",
          IdEtiqueta: "",
          IdTipoSeccionOK: "",
          Valor: "",
          Secuencia: 0,
        },
        validationSchema: Yup.object({
          IdEtiquetaOK: Yup.string(),
          IdEtiqueta: Yup.string(),
          IdTipoSeccionOK: Yup.string().required("Campo requerido"),
          Valor: Yup.string("").required("Campo requerido"),
          Secuencia: Yup.string().required("Campo requerido"),
        }),

        
        onSubmit: async (values) => {
          setMensajeExitoAlert("");
          setMensajeErrorAlert("");
          setLoading(true);
          //console.log(values);

            try {
                //infoAd.Secuencia = Number(infoAd.Secuencia);
                const ordenExistente = await GetOneOrderByID(productSel.IdInstitutoOK,productSel.IdNegocioOK,productSel.IdOrdenOK);
                console.log("Realizo",ordenExistente)
                const EstatusOrdenes = OrdenesInfoAdValues(values, ordenExistente);

                console.log("<<Ordenes info ad>>", EstatusOrdenes);
                await UpdatePatchOneOrder(productSel.IdInstitutoOK,productSel.IdNegocioOK,productSel.IdOrdenOK,EstatusOrdenes);
                     
                setMensajeExitoAlert("Info Adicional creada y guardada Correctamente");
                handleReload();
            } catch (e) {
                setMensajeErrorAlert("No se pudo crear la Info Adicional");
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

    return(
        <Dialog
            open={openModalAdd}
            onClose={() => setOpenModalAdd(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                {/* FIC: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography >
                        <strong>Agregar Nueva Info Adicional</strong>
                    </Typography>
                </DialogTitle>
                {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
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
                        id="IdEtiqueta"
                        label="IdEtiqueta*"
                        value={formik.values.IdEtiqueta}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdEtiqueta && Boolean(formik.errors.IdEtiqueta) }
                        helperText={ formik.touched.IdEtiqueta && formik.errors.IdEtiqueta }
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Selecciona una Seccion</InputLabel>
                        <Select
                            value={formik.values.IdTipoSeccionOK}
                            label="Selecciona una opción"
                            onChange={formik.handleChange}
                            name="IdTipoSeccionOK" // Asegúrate de que coincida con el nombre del campo
                            onBlur={formik.handleBlur}
                            disabled={!!mensajeExitoAlert}
                            aria-label="TipoOrden"
                            >
                            {OrdenesValuesLabel.map((option, index) => (
                            <MenuItem key={option.IdValorOK} value={`IdSeccionesOrdenes-${option.key}`}>
                                {option.IdValorOK}
                            </MenuItem>
                            ))}
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
                        type="number"
                        id="Secuencia"
                        label="Secuencia*"
                        value={formik.values.Secuencia}
                        {...commonTextFieldProps}
                        error={ formik.touched.Secuencia && Boolean(formik.errors.Secuencia) }
                        helperText={ formik.touched.Secuencia && formik.errors.Secuencia }
                    />
                </DialogContent>
                {/* FIC: Aqui van las acciones del usuario como son las alertas o botones */}
                <DialogActions
                    sx={{ display: 'flex', flexDirection: 'row' }}
                >
                    <Box m="auto">
                    {!formik.isValid && (
                    <Alert severity="error">
                        {"El formulario aun no está completo"}
                    </Alert>
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
                    {/* FIC: Boton de Cerrar. */}
                    <LoadingButton
                        color="secondary"
                        loadingPosition="start"
                        startIcon={<CloseIcon />}
                        variant="outlined"
                        onClick={() => setOpenModalAdd(false)}
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
                        disabled={!formik.isValid || !!mensajeExitoAlert}
                        >
                        <span>GUARDAR</span>
                    </LoadingButton>
                </DialogActions>{" "}
            </form>
        </Dialog>
    );
};
export default InfoAdModal;