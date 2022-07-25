import {
  Button,
  Box,
  AppBar,
  Container,
  Toolbar,
  TextField,
  Card,
  Grid,
  CardContent,Typography
} from "@mui/material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

function Welcome() {
//Probar si tiene acceso
try {
  const response =  fetch("http://localhost:8080/api/test/user", {
    method: "GET",
    headers: { "x-access-token": localStorage.getItem("token") },
  }).then(async function (response) {
    console.log(response);
    console.log(response.status);
    console.log(response.ok);
    console.log(response.statusText);
    console.log(response.type);
    console.log(response.url);
    console.log(response.redirected);
    console.log(response.bodyUsed);
   
  }).catch(error => console.error('Error:', error))
}catch(error){
  console.log(error);
}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Grid container spacing={3} sx={{mt:15}}>
  <Grid item xs >
   
  </Grid>
  <Grid item xs={10}>
    <Item style={{backgroundColor:"#DFE7ED"}} sx={{height: 450}}>
        <Typography variant="h2" mt={15}> Welcom to Karlo App</Typography>
    </Item>
  </Grid>
  <Grid item xs>
    
  </Grid>
</Grid>
  );
}

export default Welcome;