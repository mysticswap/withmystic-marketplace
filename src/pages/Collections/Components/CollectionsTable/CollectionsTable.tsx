import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './CollectionsTable.css'
import { Collection } from '../../types';

interface IProps  {
  rows: Array<Collection>
}

export function CollectionsTable({rows}:IProps) {
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="right">#</TableCell>
            <TableCell align="right">Collection</TableCell>
            <TableCell align="right">Floor</TableCell>
            <TableCell align="right">Volume</TableCell>
            <TableCell align="right">1D Volume</TableCell>
            <TableCell align="right">Owners</TableCell>
            <TableCell align="right">Supply</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.number}</TableCell>
              <TableCell align="right" className='collection_wrapper'>
                <div className='collection_container'>
                  <img className='collection_image' src='https://i.seadn.io/gcs/files/6d4b873bd01107ff35489dbe69e031d1.png?auto=format&dpr=1&w=3840'/>
                {row.collection}
                </div>
                </TableCell>
              <TableCell align="right">{row.floor}</TableCell>
              <TableCell align="right">{row.volume}</TableCell>
              <TableCell align="right">{row.oneDVolume}</TableCell>
              <TableCell align="right">{row.owners}</TableCell>
              <TableCell align="right">{row.supply}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
