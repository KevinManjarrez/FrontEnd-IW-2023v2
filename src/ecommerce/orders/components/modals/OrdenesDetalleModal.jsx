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
  Switch,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import { PatchOrdenesDetalle } from "../../service/remote/update/PatchOdenesDetalle";
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

    useEffect(() => {
      console.log("isNuevaEtiqueta", isNuevaEtiqueta);
    }, [isNuevaEtiqueta]);

  const formik = useFormik({
    initialValues: {
      IdProdServOK: "",
      IdPresentaOK: "",
      DesPresentaPS: "",
      Cantidad: "1",
      PrecioUniSinIVA: "",
      PrecioUniConIVA: "",
      PorcentajeIVA: "16",
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
                
                await PatchOrdenesDetalle(row.IdInstitutoOK,row.IdNegocioOK,row.IdOrdenOK,DetalleOrdenes); //se puede sacar el objectid con row._id para lo del fic aaaaaaaaaaaaaaaaaaa
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

  const { etiquetas, etiquetaEspecifica } = useProducts({IdProdServOK: formik.values.IdProdServOK || ""});
  
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
              const nuevoValor = formik.values.PrecioUniSinIVA ?? 1;
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
