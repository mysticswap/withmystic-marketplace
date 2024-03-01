import './CollectionsTable.css'
import { ICollection } from './../../pages/Collections/types';
import { useNavigate } from 'react-router-dom';

interface IProps  {
  rows: Array<ICollection>
}

export function CollectionsTable({rows}:IProps) {
  const navigate = useNavigate()
  return (
    <div className='collection-table-container'>
      <table className='collections-table'>
        <thead className='collections-table-header'>
          <tr className='collections-table-header-row'>
            <th className='collections-table-header-item' align="right">#</th>
            <th className='collections-table-header-item' align="right">Collection</th>
            <th className='collections-table-header-item' align="right">Floor</th>
            <th className='collections-table-header-item' align="right">Volume</th>
            <th className='collections-table-header-item' align="right">1D Volume</th>
            <th className='collections-table-header-item' align="right">Owners</th>
            <th className='collections-table-header-item' align="right">Supply</th>
          </tr>
        </thead>
        <tbody className='collections-table-body'>
          {rows.map((row, index) => (
              <tr key={index} className='collection-table-row' onClick={()=> navigate(`/collection/${row.id}`)}>
                <td align="right" className='collections-table-row-item'>{row.number}</td>
                <td align="right" className="collection_wrapper collections-table-row-item">
                  <div className="collection_container">
                    <img
                      className="collection_image"
                      src="https://i.seadn.io/gcs/files/6d4b873bd01107ff35489dbe69e031d1.png?auto=format&dpr=1&w=3840"
                    />
                    {row.collection}
                  </div>
                </td>
                <td align="right" className='collections-table-row-item'>{row.floor}</td>
                <td align="right" className='collections-table-row-item'>{row.volume}</td>
                <td align="right" className='collections-table-row-item'>{row.oneDVolume}</td>
                <td align="right" className='collections-table-row-item'>{row.owners}</td>
                <td align="right" className='collections-table-row-item'>{row.supply}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
