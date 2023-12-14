import React, { useState,useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  DialogActions,
  Box,
  Alert,
  Stack,
  Tooltip,
  FormControlLabel,
  Switch
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import * as Yup from "yup";
import { useFormik } from "formik";
import { UpdatePatchOneOrderDetalle } from "../../service/remote/post/AddOrdenesDetalle";
import { OrdenesDetalleModel } from "../../models/OrdenesDetalleModel";
import { OrdenesDetalleValues } from "../../helpers/OrdenesDetallesValues";
import { GetOneOrderByID } from "../../service/remote/get/GetOneOrderByID";
import useProducts from "../../service/remote/useProducts";
import MyAutoComplete from "../../../../share/components/elements/atomos/MyAutoComplete";


const OrdenesDetalleModal = ({
  OrdenesDetalleShowModal,
  setOrdenesDetalleShowModal,
  row,
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
        const ordenDetalleExistente = await GetOneOrderByID(row.IdInstitutoOK,row.IdNegocioOK,row.IdOrdenOK);
                //console.log("<<Ordenes>>", ordenExistente.ordenes_estatus[0].Actual);
                
                const DetalleOrdenes = OrdenesDetalleValues(values, ordenDetalleExistente);
                //const EstatusOrdenes = OrdenesEstatusValues(values);
                
                console.log("<<Ordenes>>", DetalleOrdenes);
                // console.log("LA ID QUE SE PASA COMO PARAMETRO ES:", row._id);
                // Utiliza la función de actualización si estamos en modo de edición
                
                await UpdatePatchOneOrderDetalle(row.IdInstitutoOK,row.IdNegocioOK,row.IdOrdenOK,DetalleOrdenes); //se puede sacar el objectid con row._id para lo del fic aaaaaaaaaaaaaaaaaaa
                setMensajeExitoAlert("Envío actualizado Correctamente");
                handleReload(); //usar la función para volver a cargar
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
    <Dialog
      open={OrdenesDetalleShowModal}
      onClose={() => setOrdenesDetalleShowModal(false)}
      fullWidth
    >
      <form onSubmit={(e) => formik.handleSubmit(e)}>
        <DialogTitle>
          <Typography>
            <strong>Agregar Nuevo Estado de la Orden</strong>
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }} dividers>
                    <Stack direction="row" alignItems="center">
                    <MyAutoComplete
                    disabled={!!mensajeExitoAlert || isNuevaEtiqueta}
                    label={"Selecciona un Producto"}
                    options={etiquetas} //Arreglo de objetos
                    displayProp="Producto" // Propiedad a mostrar
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
            onClick={() => setOrdenesDetalleShowModal(false)}
          >
            <span>CERRAR</span>
          </LoadingButton>
          <LoadingButton
            color="primary"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            type="submit"
            disabled={formik.isSubmitting || !!mensajeExitoAlert || Loading}
          >
            <span>GUARDAR</span>
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default OrdenesDetalleModal;
