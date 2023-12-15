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
import { PatchOrdenesDetalle } from "../../service/remote/update/PatchOdenesDetalle";


const PatchOrdenesDetalleModal = ({ 
    OrdenesDetallePatchShowModal,
    setOrdenesDetallePatchShowModal,
    productSel, 
    row,
    handleReload,
    selectedRowIndex
}) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [isNuevaEtiqueta, setINuevaEtiqueta] = React.useState(false);

      useEffect(() => {
        console.log("isNuevaEtiqueta", isNuevaEtiqueta);
      }, [isNuevaEtiqueta]);

    //FIC: Definition Formik y Yup.
    const formik = useFormik({
        initialValues: {
            IdProdServOK: productSel.IdProdServOK,
            IdPresentaOK: productSel.IdPresentaOK,
            DesPresentaPS: productSel.DesPresentaPS,
            Cantidad: productSel.Cantidad,
            PrecioUniSinIVA: productSel.PrecioUniSinIVA,
            PrecioUniConIVA: productSel.PrecioUniConIVA,
            PorcentajeIVA: productSel.PorcentajeIVA,
            MontoUniIVA: productSel.MontoUniIVA,
            SubTotalSinIVA: productSel.SubTotalSinIVA,
            SubTotalConIVA: productSel.SubTotalConIVA,
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
          setMensajeExitoAlert(null);
          setMensajeErrorAlert(null);

            try {
                //Modificar el producto con el Formulario
                let product = JSON.parse(JSON.stringify(row));
                console.log("antes:",product)
                
                if (selectedRowIndex >= 0) {
                  // Crea una copia del objeto en idRowSel y modifica la propiedad IdEtiquetaOK
                  product.ordenes_detalle[selectedRowIndex]= {
                    //...product.ordenes_info_ad[idRowSel],
                      IdProdServOK: values.IdProdServOK,
                      IdPresentaOK: values.IdPresentaOK,
                      DesPresentaPS: values.DesPresentaPS,
                      Cantidad: Number(values.Cantidad),
                      PrecioUniSinIVA: Number(values.PrecioUniSinIVA),
                      PrecioUniConIVA: Number(values.PrecioUniConIVA),
                      PorcentajeIVA: Number(values.PorcentajeIVA),
                      MontoUniIVA: Number(values.MontoUniIVA),
                      SubTotalSinIVA: Number(values.SubTotalSinIVA),
                      SubTotalConIVA: Number(values.SubTotalConIVA)
                  };
                  
                }
                
                console.log("temp:",product)
                const dataToUpdate = {
                  ordenes_detalle: product.ordenes_detalle,
                };
                console.log("data",dataToUpdate);
                await PatchOrdenesDetalle(product.IdInstitutoOK,product.IdNegocioOK,product.IdOrdenOK, dataToUpdate);
                
                setMensajeExitoAlert("InfoAd modificada Correctamente");
                //handleReload();
                console.log("Se modifico")
            } catch (e) {
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

    const { etiquetas, etiquetaEspecifica } = useProducts({IdProdServOK: formik.values.IdProdServOK || ""});

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
                        <strong>Actualizar Detalle Orden</strong>
                    </Typography>
                </DialogTitle>
                {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
                <DialogContent sx={{ display: "flex", flexDirection: "column" }} dividers>
                    <Stack direction="row" alignItems="center">
                    <MyAutoComplete
                    disabled={!!mensajeExitoAlert || isNuevaEtiqueta}
                    label={"Selecciona un Producto"}
                    options={etiquetas} //Arreglo de objetos
                    displayProp="IdProdServOK" // Propiedad a mostrar
                    idProp="IdProdServOK" // Propiedad a guardar al dar clic
                    onSelectValue={(selectedValue) => {
                        console.log("Selección:", selectedValue);
                        formik.values.DesPresentaPS = selectedValue
                        ? selectedValue?.DesProdServ
                        : "";
                        formik.values.IdProdServOK = selectedValue
                        ? selectedValue?.IdProdServOK
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
          <FormControl fullWidth margin="normal">
                    <InputLabel>Selecciona una Precentacion</InputLabel>
                    <Select
                    value={formik.values.IdPresentaOK}
                    label="Selecciona una Pecentacion"
                    onChange={formik.handleChange}
                    name="IdPresentaOK" // Asegúrate de que coincida con el nombre del campo
                    onBlur={formik.handleBlur}
                    disabled={!!mensajeExitoAlert}
                    >
                    {etiquetaEspecifica?.cat_prod_serv_presenta.map((seccion) => {
                        return (
                        <MenuItem
                            value={`cat_prod_serv_presenta-${seccion.IdPresentaOK}`}
                            key={seccion.IdPresentaOK}
                        >
                            {seccion.DesPresenta}
                        </MenuItem>
                        );
                    })}
                </Select>
                    <FormHelperText>
                    {formik.touched.IdPresentaOK && formik.errors.IdPresentaOK}
                    </FormHelperText>
                </FormControl>
                
            <TextField
            id="Cantidad"
            label="Cantidad*"
            value={formik.values.Cantidad}
            onChange={(e) => {
              const cantidad = e.target.value;
              const nuevoValor = parseFloat(formik.values.PrecioUniSinIVA);
              const nuevoPrecioUniConIVA = nuevoValor * 0.16 || "";
              const PrecioUniConIVAt = parseFloat(nuevoPrecioUniConIVA) + parseFloat(nuevoValor) || 0;

              const SubTotalSinIVAt=cantidad * parseFloat(nuevoValor);
              const SubTotalConIVAt=cantidad * PrecioUniConIVAt;

              formik.setValues({
                ...formik.values,
                Cantidad: cantidad,
                SubTotalSinIVA: SubTotalSinIVAt,
                SubTotalConIVA:SubTotalConIVAt
              });
            }}
            onBlur={formik.handleBlur}
            error={
              formik.touched.Cantidad &&
              Boolean(formik.errors.Cantidad)
            }
            helperText={
              formik.touched.Cantidad && formik.errors.Cantidad
            }
          />
                    <div style={{ margin: '10px 0' }}></div>

          <TextField
            id="PrecioUniSinIVA"
            label="PrecioUniSinIVA*"
            value={formik.values.PrecioUniSinIVA}
            onChange={(e) => {
              const nuevoValor = e.target.value;
              const nuevoPrecioUniConIVA = nuevoValor * 0.16 || "";
              const PrecioUniConIVAt = parseFloat(nuevoPrecioUniConIVA) + parseFloat(nuevoValor) || 0;
              const cantidad = formik.values.Cantidad ?? 1;

              const SubTotalSinIVAt=cantidad * parseFloat(nuevoValor);
              const SubTotalConIVAt=cantidad * PrecioUniConIVAt;

              formik.setValues({
                ...formik.values,
                PrecioUniSinIVA: nuevoValor,
                PrecioUniConIVA: PrecioUniConIVAt,
                MontoUniIVA: PrecioUniConIVAt,
                SubTotalSinIVA: SubTotalSinIVAt,
                SubTotalConIVA:SubTotalConIVAt
              });
            }}
            onBlur={formik.handleBlur}
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