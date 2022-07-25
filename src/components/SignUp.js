import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { CircularProgress } from "@mui/material"
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, navegate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignUpForm = () => {
  const [signUp, setSignUp] = useState({
    email: "",
    username: "",
    lastName: "",
    password: "",
    roles: ["user"],
  });

  const [formValues, setFormValues] = useState({
    email: {
      value: "",
      error: false,
      errorMessage: "Inserta un email valido",
    },
    username: {
      value: "",
      error: false,
      errorMessage: "Inserta un username valido",
    },
    lastName: {
      value: "",
      error: false,
      errorMessage: "Inserta un apellido valido",
    },
    password: {
      value: "",
      error: false,
      errorMessage: "Inserta un password valido",
    },
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

  const navegate = useNavigate();
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formFields = Object.keys(formValues);
    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUp),
      });
      await response.json();
      console.log(response);
      handleClick();
      setLoading(false);
      navegate("/login");
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
        setSignUp({ ...signUp, [e.target.name]: e.target.value });
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
        setSignUp({ ...signUp, [e.target.name]: e.target.value });

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
      setSignUp({ ...signUp, [e.target.name]: e.target.value });
    }
    console.log(signUp);
  };
  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const theme = createTheme();

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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ m: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  onChange={handleChange}
                  required
                  fullWidth
                  id="username"
                  label="Nombres"
                  autoFocus
                  error={formValues.username.error}
                  helperText={
                    formValues.username.error &&
                    formValues.username.errorMessage
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  onChange={handleChange}
                  label="Apellidos"
                  name="lastName"
                  autoComplete="family-name"
                  error={formValues.lastName.error}
                  helperText={
                    formValues.lastName.error &&
                    formValues.lastName.errorMessage
                  }
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={formValues.password.error}
                  helperText={
                    formValues.password.error &&
                    formValues.password.errorMessage
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <CircularProgress color="inherit" size={25} />
              ) : (
                " Sign Up"
              )}
            </Button>
            <Snackbar open={open} autoHideDuration={500} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Registrado con exito!
              </Alert>
              <Alert severity="error">Ocurrio un error!</Alert>
            </Snackbar>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" onClick={() => navegate(`/login`)}>
                  Ya tienes cuenta? Inicia sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};
export default SignUpForm;
