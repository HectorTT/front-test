import * as React from "react";
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
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//import { compareSync } from "bcryptjs";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SignIn() {
  const [formValues, setFormValues] = useState({
    email: {
      value: "",
      error: false,
      errorMessage: "Inserta un email valido",
    },
    password: {
      value: "",
      error: false,
      errorMessage: "Inserta un password valido",
    },
  });

  const [signin, setSignIn] = useState({
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleCloseErr = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formFields = Object.keys(formValues);
    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signin),
      });
      const data = await response.json();
      console.log(data);
      //Cuando se loguea se guarda el token en localStorage
      //Si no se loguea se muestra un error por consola
      if (data.accessToken != null) {
        localStorage.clear();
        localStorage.setItem("token", data.accessToken);
        console.log(localStorage);
        navegate("/home");
      } else {
        //Si no se loguea se muestra un error en la pantalla
        console.log(data, data.message);
        handleClick();
      }
      //handleClick();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      setFormValues({
        ...formValues,
        [e.target.name]: {
          value: e.target.value,
          error: true,
          errorMessage: "Inserta un " + e.target.name + " valido",
        },
      });
    } else if (e.target.name === "email") {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(e.target.value)) {
        setFormValues({
          ...formValues,
          [e.target.name]: {
            value: e.target.value,
            error: false,
            errorMessage: "",
          },
        });
        setSignIn({ ...signin, [e.target.name]: e.target.value });
      } else {
        setFormValues({
          ...formValues,
          [e.target.name]: {
            value: e.target.value,
            error: true,
            errorMessage: "Inserta un " + e.target.name + " valido",
          },
        });
      }
    } else if (e.target.name === "password") {
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          e.target.value
        )
      ) {
        setFormValues({
          ...formValues,
          [e.target.name]: {
            value: e.target.value,
            error: false,
            errorMessage: "",
          },
        });
        setSignIn({ ...signin, [e.target.name]: e.target.value });
      } else {
        setFormValues({
          ...formValues,
          [e.target.name]: {
            value: e.target.value,
            error: true,
            errorMessage:
              "Inserta un " +
              e.target.name +
              " valido: 8 caracteres, 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial",
          },
        });
      }
    } else {
      setFormValues({
        ...formValues,
        [e.target.name]: {
          value: e.target.value,
          error: false,
          errorMessage: "",
        },
      });
      setSignIn({ ...signin, [e.target.name]: e.target.value });
    }
    console.log(signin);
  };

  /* TERMINA HANDLER --------------------------------*/

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link
          color="inherit"
          href="https://www.linkedin.com/in/hector-t-2a6680113/"
        >
          Linkedin Hector T
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const theme = createTheme();

  const navegate = useNavigate();
  /* const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  }; */

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
          <Avatar sx={{ m: 4, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ m: 1 }}
          >
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              onChange={handleChange}
              autoComplete="email"
              error={formValues.email.error}
              helperText={
                formValues.email.error && formValues.email.errorMessage
              }
            />
            <TextField
              required
              sx={{ mt: 1 }}
              fullWidth
              name="password"
              label="Password"
              onChange={handleChange}
              type="password"
              id="password"
              autoComplete="new-password"
              error={formValues.password.error}
              helperText={
                formValues.password.error && formValues.password.errorMessage
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert
                onClose={handleCloseErr}
                severity="error"
                sx={{ width: "100%" }}
              >
                Contraseña o correo incorrectos!
              </Alert>
            </Snackbar>
            <Grid container>
              <Grid item sx={{ mr: 4 }}>
                <Link variant="body2">Olvidaste tu contraseña?</Link>
              </Grid>
              <Grid item sx={{ mb: 8 }}>
                <Link onClick={() => navegate(`/signup`)} variant="body2">
                  {"No tienes cuenta? Registrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
