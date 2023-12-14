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

import MyAutoComplete from "../../../../share/components/elements/atomos/MyAutoComplete";

//FIC: Formik - Yup
import { useFormik } from "formik";
import * as Yup from "yup";

//HELPERS
import { InfoAdValues } from "../../helpers/InfoAdValues";
import useProducts from "../../service/remote/useProducts";
//SERVICES
import { AddOneInfoAd } from "../../service/remote/post/AddOneInfoAd";
import { GetAllLabels } from "../../../labels/services/remote/get/GetAllLabels";


const PatchOrdenesDetalleModal = ({ 
    OrdenesDetallePatchShowModal,
    setOrdenesDetallePatchShowModal,
    productSel, 
    handleReload
}) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [OrdenesValuesLabel, setOrdenesValuesLabel] = useState([]);
    const [isNuevaEtiqueta, setINuevaEtiqueta] = React.useState(false);

    const { etiquetas, etiquetaEspecifica } = useProducts({IdProductoOK:""});

    useEffect(() => {
        console.log("Todas las Etiquetas", etiquetas);
        console.log(" etiquetaEspecifica", etiquetaEspecifica);
      }, [etiquetas, etiquetaEspecifica]);
      useEffect(() => {
        console.log("isNuevaEtiqueta", isNuevaEtiqueta);
      }, [isNuevaEtiqueta]);

      async function getDataSelectOrdenesType() {
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
      }
      const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
      };
    //FIC: Definition Formik y Yup.
    const formik = useFormik({
        initialValues: {
            IdProdServOK: "",
            IdPresentaOK: "",
            DesPresentaPS: "",
            Cantidad: "",
            PrecioUniSinIVA: "",
            PrecioUniConIVA: "",
            PorcentajeIVA: "",
            MontoUniIVA: "",
            SubTotalSinIVA: "",
            SubTotalConIVA: "",
        },
        validationSchema: Yup.object({
            IdProdServOK: Yup.string().required("Campo requerido"),
            IdPresentaOK: Yup.string().required("Campo requerido"),
            DesPresentaPS: Yup.string().required("Campo requerido"),
            Cantidad: Yup.string().required("Campo requerido"),
            PrecioUniSinIVA: Yup.string().required("Campo requerido"),
            PrecioUniConIVA: Yup.string().required("Campo requerido"),
            PorcentajeIVA: Yup.string().required("Campo requerido"),
            MontoUniIVA: Yup.string().required("Campo requerido"),
            SubTotalSinIVA: Yup.string().required("Campo requerido"),
            SubTotalConIVA: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
          setMensajeExitoAlert("");
          setMensajeErrorAlert("");
          setLoading(true);

            try {
                console.log("algo",productSel)
                let model = InfoAdModel();
                const infoAd = {
                ...model,
                ...values,
                };
                infoAd.Secuencia = Number(infoAd.Secuencia);
                
                let product = JSON.parse(JSON.stringify(productSel));
                console.log("product", product);
                product.cat_prod_serv_info_ad.push(infoAd);
                const dataToUpdate = {
                cat_prod_serv_info_ad: product.cat_prod_serv_info_ad,
                };
                console.log(
                " product.cat_prod_serv_info_ad",
                product.cat_prod_serv_info_ad
                );
                //await updateProduct(product.IdProdServOK, dataToUpdate);

                setMensajeExitoAlert("Info Adicional creada y guardada Correctamente");
                handleReload();
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear la Info Adicional");
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

    return(
        <Dialog
            open={OrdenesDetallePatchShowModal}
            onClose={() => setOrdenesDetallePatchShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                {/* FIC: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography >
                        <strong>Actualizar Info Adicional</strong>
                    </Typography>
                </DialogTitle>
                {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
                <DialogContent sx={{ display: "flex", flexDirection: "column" }} dividers>
                    <Stack direction="row" alignItems="center">
                    <MyAutoComplete
                    disabled={!!mensajeExitoAlert || isNuevaEtiqueta}
                    label={"Selecciona una Etiqueta"}
                    options={etiquetas} //Arreglo de objetos
                    displayProp="Etiqueta" // Propiedad a mostrar
                    idProp="IdEtiquetaOK" // Propiedad a guardar al dar clic
                    onSelectValue={(selectedValue) => {
                        console.log("Selección:", selectedValue);
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
            id="IdProdServOK"
            label="IdProdServOK*"
            value={formik.values.IdProdServOK}
            {...commonTextFieldProps}
            error={
              formik.touched.IdProdServOK &&
              Boolean(formik.errors.IdProdServOK)
            }
            helperText={
              formik.touched.IdProdServOK && formik.errors.IdProdServOK
            }
            disabled={true}
          />
          <TextField
            id="IdPresentaOK"
            label="IdPresentaOK*"
            value={formik.values.IdPresentaOK}
            {...commonTextFieldProps}
            error={
              formik.touched.IdPresentaOK &&
              Boolean(formik.errors.IdPresentaOK)
            }
            helperText={
              formik.touched.IdPresentaOK && formik.errors.IdPresentaOK
            }
          />
          <TextField
            id="DesPresentaPS"
            label="DesPresentaPS*"
            value={formik.values.DesPresentaPS}
            {...commonTextFieldProps}
            error={
              formik.touched.DesPresentaPS &&
              Boolean(formik.errors.DesPresentaPS)
            }
            helperText={
              formik.touched.DesPresentaPS && formik.errors.DesPresentaPS
            }
            disabled={true}
          />
          <TextField
            id="Cantidad"
            label="Cantidad*"
            value={formik.values.Cantidad}
            {...commonTextFieldProps}
            error={
              formik.touched.Cantidad &&
              Boolean(formik.errors.Cantidad)
            }
            helperText={
              formik.touched.Cantidad && formik.errors.Cantidad
            }
          />
          <TextField
            id="PrecioUniSinIVA"
            label="PrecioUniSinIVA*"
            value={formik.values.PrecioUniSinIVA}
            {...commonTextFieldProps}
            error={
              formik.touched.PrecioUniSinIVA &&
              Boolean(formik.errors.PrecioUniSinIVA)
            }
            helperText={
              formik.touched.PrecioUniSinIVA && formik.errors.PrecioUniSinIVA
            }
          />
          <TextField
            id="PrecioUniConIVA"
            label="PrecioUniConIVA*"
            value={formik.values.PrecioUniConIVA}
            {...commonTextFieldProps}
            error={
              formik.touched.PrecioUniConIVA &&
              Boolean(formik.errors.PrecioUniConIVA)
            }
            helperText={
              formik.touched.PrecioUniConIVA && formik.errors.PrecioUniConIVA
            }
            disabled={true}
          />
          <TextField
            id="PorcentajeIVA"
            label="PorcentajeIVA*"
            value={formik.values.PorcentajeIVA}
            {...commonTextFieldProps}
            error={
              formik.touched.PorcentajeIVA &&
              Boolean(formik.errors.PorcentajeIVA)
            }
            helperText={
              formik.touched.PorcentajeIVA && formik.errors.PorcentajeIVA
            }
            disabled={true}
          />
          <TextField
            id="MontoUniIVA"
            label="MontoUniIVA*"
            value={formik.values.MontoUniIVA}
            {...commonTextFieldProps}
            error={
              formik.touched.MontoUniIVA &&
              Boolean(formik.errors.MontoUniIVA)
            }
            helperText={
              formik.touched.MontoUniIVA && formik.errors.MontoUniIVA
            }
          />
          <TextField
            id="SubTotalSinIVA"
            label="SubTotalSinIVA*"
            value={formik.values.SubTotalSinIVA}
            {...commonTextFieldProps}
            error={
              formik.touched.SubTotalSinIVA &&
              Boolean(formik.errors.SubTotalSinIVA)
            }
            helperText={
              formik.touched.SubTotalSinIVA && formik.errors.SubTotalSinIVA
            }
          />
          <TextField
            id="SubTotalConIVA"
            label="SubTotalConIVA*"
            value={formik.values.SubTotalConIVA}
            {...commonTextFieldProps}
            error={
              formik.touched.SubTotalConIVA &&
              Boolean(formik.errors.SubTotalConIVA)
            }
            helperText={
              formik.touched.SubTotalConIVA && formik.errors.SubTotalConIVA
            }
            disabled={true}
          />
          {/* Agregar el resto de los campos aquí */}
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
                        onClick={() => setOrdenesDetallePatchShowModal(false)}
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
                        <span>Actualizar</span>
                    </LoadingButton>
                </DialogActions>{" "}
            </form>
        </Dialog>
    );
};
export default PatchOrdenesDetalleModal;