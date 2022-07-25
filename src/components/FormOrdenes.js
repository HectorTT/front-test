import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TableOrdenes from "./ordersTable";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FormOrdenes = () => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [payload, setpayload] = useState([]);
  const params = useParams();
  const theme = createTheme();

  const [Product, setProdcts] = useState([]);
  const navegate = useNavigate();

  //Save seleted product
  const [Producto, setProducto] = useState([]);
  //const [Cantidad, setCantidad] = useState([]);
  // save productos selected for the ordersTable
  const [productoOrdenAll, setProductoOrdenAll] = useState([]);
  //const [productoOrdenAll, setProductoOrdenAll] = useState([]);

  useEffect(() => {
    console.log('lista ' + Producto);
  }, [Producto]);


  const handleChangeP = (event) => {
    /*     let temp = Producto;
        temp.push(event); */
    setProducto(event);

  };
  //Manda los id de los productos a guardar en la orden
  const handleSendOrden = () => {
    //setProductoOrden(Producto);
    let tempProduct = [];
    //Copia solo el id de los productos en un array
    productoOrdenAll.forEach(function (productOrd) {
      console.log(productOrd);
      tempProduct.push(productOrd.id);

    });
    setpayload(tempProduct);
    console.log(payload);
    //LLamado de la funcion qu guarda la orden
    handlerSubmitOrden(tempProduct);
  };

  const handleSendproducto = () => {
    //setProductoOrden(Producto);
    setProductoOrdenAll([...productoOrdenAll, Producto]);
  };


  const handleClick = () => {
    setOpen(true);
  };


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    navegate("/login");
    setOpen(false);
  };



  const [formValuesP, setFormValuesP] = useState({
    cantidad: {
      value: "",
      error: false,
      errorMessage: "Inserta una cantidad valido",
    },
  });

  const loadproduct = async () => {
    const res = await fetch('http://localhost:8080/product')
    const data = await res.json();
    const datap = data.producto
    console.log(datap);
    const dataRows = [];
    datap.forEach((item, i) => {
      //IF Product name is not specified then set default product name
      if (item.nombre == null || item.nombre.length == 0) {
        item.nombre = "No name specified " + i;
      }
      setProdcts(datap);
    });

  }

  useEffect(() => {
    loadproduct();
  }, []);

  /* Funcion que se ejecuta cuando se le da enviar */
  const handlerSubmitProductos = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (editing) {
      const res = await fetch(`http://localhost:8080/product/${params.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        //body: JSON.stringify(Producto),
      });
      const data = await res.json();
      console.log(data);

    } else {
      /* Mandar datos a la API con fetch  mediante POST*/
      /*  const res = await fetch('http://localhost:8080/product');
       const data = await res.json(); */
      console.log(Producto);
    }

    setLoading(false);
  }

  /* useEffect(() => {
   handlerSubmitOrden(payload);
 },[payload]); */


  //Guarda la orden de compra
  const handlerSubmitOrden = async (productos) => {
    const params = {
      "total": 100,
      "subtotal": 100,
      "iva": 16, "productos": productos
    };
    const res = await fetch(`http://localhost:8080/ordenes_compra`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    console.log(params);
    console.log(data);
    if(data.message === "OK") {
      setProductoOrdenAll([]);
      handleClick();
    }else{
      console.error(data);
    }
    //const datap = data.producto;
  }
  const handleChangeFormP = (e) => {
    if (e.target.name === "cantidad") {
      if (
        /^[0-9\b]+$/.test(
          e.target.value
        )
      ) {
        setFormValuesP({
          ...formValuesP,
          [e.target.name]: {
            value: e.target.value,
            error: false,
            errorMessage: "",
          },
        });
        setProducto({ ...Producto, [e.target.name]: e.target.value });

      } else {
        setFormValuesP({
          ...formValuesP,
          [e.target.name]: {
            value: e.target.value,
            error: true,
            errorMessage:
              "Inserta un " +
              e.target.name +
              " valido: solo numeros",
          },
        });
      }
    } else {
      setFormValuesP({
        ...formValuesP,
        [e.target.name]: {
          value: e.target.value,
          error: false,
          errorMessage: "",
        },
      });
      setProducto({ ...Producto, [e.target.name]: e.target.value });
    }
    console.log(Producto);
  };

  return (

    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "#DFE7ED",
          }}
        >
          <Avatar sx={{ m: 4, bgcolor: "primary.main" }}>
            <InventoryOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Agregar Orden de Compra
          </Typography>
          <Box
            component="form"
            onSubmit={handlerSubmitProductos}
            noValidate
            sx={{ m: 1 }}
          >
            <>
              <InputLabel id="demo-simple-select-label">Productos</InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                /* value={Product} */
                label="Productos"
                onChange={(e) => handleChangeP(e.target.value)}
              >
                {Product.map((item, i) => (

                  <MenuItem value={item} key={item.id}>{item.nombre} - ${item.precio} C/U</MenuItem>
                  //console.log(item.nombre);
                ))}
              </Select>
            </>
            <TextField
              required
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              sx={{ mt: 1 }}
              fullWidth
              name="cantidad"
              label="Cantidad"
              onChange={handleChangeFormP}
              type="Cantidad"
              id="cantidad"
              autoComplete="new-Cantidad"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleSendproducto()}
            >
              Agregar producto
            </Button>
            {/* <Snackbar open={open} autoHideDuration={500} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Registrado con exito!
              </Alert>
              <Alert severity="success">Ocurrio un error!</Alert>
            </Snackbar> */}
          </Box>
        </Box>
      </Container>
      <TableOrdenes table={productoOrdenAll} />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => handleSendOrden()}
      >
        Guadar Orden
      </Button>
    </ThemeProvider>

  );

}
export default FormOrdenes;
//FormOrdenes;