import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import {Button} from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react'
//import DeleteIcon from '@mui/icons-material/DeleteIcon';
import {Navigate, useNavigate} from 'react-router-dom'



export default function TableOrdenes() {
    /* function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    } */
    function createData(nombre, cantidad, precio) {
        return { nombre, cantidad, precio };
    }
    const [Product, setProdcts] = useState([]);
    const navegate = useNavigate();

    const handlerDelete = async (id) => {
      const res = await fetch(`http://localhost:8080/product/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
            });
      const data = await res.json();
      console.log(data);
      loadproduct();
      //const datap = data.producto;
    }
    
    
    const loadproduct = async () => {
        const res = await fetch('http://localhost:8080/product')
        const data = await res.json();
        const datap = data.producto;
        console.log(datap);
        const dataRows = [];
        datap.forEach((item, i) => {
            //rows= [createData(item.nombre, item.precio, item.cantidad)];
            setProdcts(datap);
            });
        
        /* setTasks(data); */
    }
   // setProdcts(rows)
    
    
    
    useEffect(() => {
        loadproduct();
    }, []); 
    return (
        <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Precio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Product.map((row) => (
            <TableRow
              key={row.nombre}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                {row.nombre}
              </TableCell>
              <TableCell align="right">{row.cantidad}</TableCell>
              <TableCell align="right">{row.precio}</TableCell>
              <Button  size="small" variant="contained"
              color="secondary" onClick={() => handlerDelete(row.id)}>Delete</Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

// TableProductos;