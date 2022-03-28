
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
    const [rowData, setRowData] = useState(getData());
    const [columnDefs, setColumnDefs] = useState([
    { field: 'symbol', maxWidth: 120 },
    { field: 'name', minWidth: 250 },
    {
        field: 'change',
        cellRenderer: 'agSparklineCellRenderer',
        cellRendererParams: {
            sparklineOptions: {
                type: 'area',
                fill: 'rgba(216, 204, 235, 0.3)',
                line: {
                    stroke: 'rgb(119,77,185)',
                },
                highlightStyle: {
                    fill: 'rgb(143,185,77)',
                },
                axis: {
                    stroke: 'rgb(204, 204, 235)',
                },
            },
        },
    },
    {
        field: 'volume',
        type: 'numericColumn',
        maxWidth: 140,
    },
]);
    const defaultColDef = useMemo(() => { return {
    flex: 1,
    minWidth: 100,
    resizable: true,
} }, []);






    return  (
            <div style={containerStyle}>
                
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
rowHeight={50}
            >
            </AgGridReact>
        </div>
            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
