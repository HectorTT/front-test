import * as React from "react";
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
const TableOrdenes = (props) => { 

    //const [productos, setProductos] = useState([props.table]);
    /* if((props.table).length > 0) {

        setProductos(props.table);
        props.table = [];
    } */
    const productos = props.table;
    console.log(productos);
    return (
<>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Precio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {productos.length > 0                 ?
                productos.map((row) => (
                    <TableRow
                      key={row.nombre}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        {row.nombre}
                      </TableCell>
                      <TableCell align="right">{row.cantidad}</TableCell>
                      <TableCell align="right">{row.precio}</TableCell>
                    </TableRow>
                  ))
                  :
                 ( <Typography variant='h6'>Agrega productos a la orden</Typography>)
            } 
        </TableBody>
      </Table>
    </TableContainer>
    </>
    ) 
};
export default TableOrdenes;