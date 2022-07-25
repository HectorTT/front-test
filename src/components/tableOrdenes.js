import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react'
import {Navigate, useNavigate} from 'react-router-dom'

export default function TableProductos() {
    /* function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    } */
    function createData(nombre, cantidad, precio) {
        return { nombre, cantidad, precio };
    }
    const [Ordenes, setOrdenes] = useState([]);
    const navegate = useNavigate();   
    
    const loadproduct = async () => {
        const res = await fetch('http://localhost:8080/ordenes_compra')
        const data = await res.json();
        const dataO = data.Ordenes;
        console.log(dataO);
        const dataRows = [];
        dataO.forEach((item, i) => {
            //rows= [createData(item.nombre, item.precio, item.cantidad)];
            setOrdenes(dataO);
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
            <TableCell>Total</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right">Creada</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Ordenes.map((row) => (
            <TableRow
              key={row.total}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                {row.total}
              </TableCell>
              <TableCell align="right">{row.subtotal}</TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
