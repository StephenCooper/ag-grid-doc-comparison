
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';





const GridExample = () => {
    
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
    { field: 'country', rowGroup: true, hide: true },
    {
        field: 'gold',
        aggFunc: 'sum',
        enableValue: true,
        allowedAggFuncs: ['sum', 'min', 'max'],
    },
    { field: 'silver', aggFunc: 'min', enableValue: true },
    { field: 'bronze', aggFunc: 'max', enableValue: true },
    { field: 'total', aggFunc: 'avg', enableValue: true, minWidth: 200 },
    { field: 'age' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
]);
    const defaultColDef = useMemo(() => { return {
    flex: 1,
    minWidth: 150,
    filter: true,
    sortable: true,
    resizable: true,
} }, []);
    const autoGroupColumnDef = useMemo(() => { return {
    headerName: 'Athlete',
    field: 'athlete',
    minWidth: 250,
    cellRenderer: 'agGroupCellRenderer'
} }, []);


            const onGridReady = useCallback((params) => {
                
                fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => setRowData(data));
            }, []);




    return  (
            <div style={containerStyle}>
                
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
autoGroupColumnDef={autoGroupColumnDef}
sideBar={true}
onGridReady={onGridReady}
            >
            </AgGridReact>
        </div>
            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))