
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

const getColumnDefs = () => {
    return [
        { field: 'athlete', initialWidth: 100, initialSort: 'asc' },
        { field: 'age' },
        { field: 'country', initialPinned: 'left' },
        { field: 'sport' },
        { field: 'year' },
        { field: 'date' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
    ];
}



const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState();
    const defaultColDef = useMemo(() => { return {
    initialWidth: 100,
    sortable: true,
    resizable: true,
} }, []);
    const [columnDefs, setColumnDefs] = useState(getColumnDefs());


            const onGridReady = useCallback((params) => {
                
                fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => setRowData(data));
            }, []);

const onBtWithDefault = useCallback(() => {
    gridRef.current.api.setColumnDefs(getColumnDefs());
}, [])

   const onBtRemove = useCallback(() => {
    gridRef.current.api.setColumnDefs([]);
}, [])


    return  (
            <div style={containerStyle}>
                <div className="test-container">
    <div className="test-header">
        <button onClick={onBtWithDefault}>Set Columns with Initials</button>
        <button onClick={onBtRemove}>Remove Columns</button>
    </div>
    
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
defaultColDef={defaultColDef}
columnDefs={columnDefs}
onGridReady={onGridReady}
            >
            </AgGridReact>
        </div>
</div>

            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
