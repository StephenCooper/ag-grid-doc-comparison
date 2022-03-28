
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';





const GridExample = () => {
    
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', headerTooltip: "The athlete's name" },
    { field: 'age', headerTooltip: 'The athlete`s age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date', headerTooltip: 'The date of the Olympics' },
    { field: 'sport', headerTooltip: 'The sport the medal was for' },
    { field: 'gold', headerTooltip: 'How many gold medals' },
    { field: 'silver', headerTooltip: 'How many silver medals' },
    { field: 'bronze', headerTooltip: 'How many bronze medals' },
    { field: 'total', headerTooltip: 'The total number of medals' },
]);
    const defaultColDef = useMemo(() => { return {
    width: 150,
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
tooltipShowDelay={500}
onGridReady={onGridReady}
            >
            </AgGridReact>
        </div>

            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
