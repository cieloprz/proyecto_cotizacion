import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const usd = [ ];

export default function CambioDolar() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>El cambio es establecido por el personal administrativo.</caption>
        <TableHead>
          <TableRow>
            <TableCell>Dolar estadounidense (USD)</TableCell>
            <TableCell align="right">Pesos Mexicanos (MXN)</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                1
              </TableCell>
              <TableCell align="right">{usd}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
