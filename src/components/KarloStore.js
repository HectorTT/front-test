import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Navigate, useNavigate } from "react-router-dom";
import  FormProductos  from "./FormProductos";
import  TableProductos from "./tableProductos";
import  TableOrdenes from "./tableOrdenes";
import  FormOrdenes from "./FormOrdenes";


function VerticalTabs() {
    const navegate = useNavigate();
    //validar permisos
    try {
        const response = fetch("http://localhost:8080/api/test/user", {
            method: "GET",
             headers: { "x-access-token": localStorage.getItem("token") },
        }).then(function (response) {
            if (response.status !== 200) {
                navegate("/");
            }
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

  

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 500, mt: 3}}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Home" {...a11yProps(0)} />
        {/* <Tab label="Usuarios" {...a11yProps(1)} /> */}
        <Tab label="Productos" {...a11yProps(1)} />
        <Tab label="Lista de productos" {...a11yProps(2)} />
        <Tab label="Crear Ordenes " {...a11yProps(3)} />
        <Tab label="Ordenes de compra" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Welcom to Karlo
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
      </TabPanel> */}
      <TabPanel value={value} index={1}>
        CRUD Productos
        <FormProductos/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Lista de productos
      <TableProductos/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        Crear Ordenes de compra
        <FormOrdenes/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        Lista de ordenes de compra
        <TableOrdenes/>
      </TabPanel>
      
    </Box>
  );
}

export default VerticalTabs;