
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

const createRowData = () => {
    var data = [];
    for (var i = 0; i < 20; i++) {
        data.push({
            height: Math.floor(Math.random() * 100),
            width: Math.floor(Math.random() * 100),
            depth: Math.floor(Math.random() * 100)
        });
    }
    return data;
}



const GridExample = () => {
    
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState(createRowData());
    const [columnDefs, setColumnDefs] = useState([
    // colId will be 'firstCol'
    { headerName: 'Col 1', colId: 'firstCol', field: 'height' },
    // colId will be 'firstCol_1', cos 'firstCol' already taken
    { headerName: 'Col 2', colId: 'firstCol', field: 'height' },
    // colId will be 'height'
    { headerName: 'Col 3', field: 'height' },
    // colId will be 'height_1', cos 'height' already taken
    { headerName: 'Col 4', field: 'height' },
    // no colId, no field, so grid generated ID
    { headerName: 'Col 5', valueGetter: 'data.width' },
    { headerName: 'Col 6', valueGetter: 'data.width' }
]);


            const onGridReady = useCallback((params) => {
                
    var cols = params.columnApi.getAllColumns();
    cols.forEach(function (col) {
        var colDef = col.getColDef();
        console.log(colDef.headerName + ', Column ID = ' + col.getId(), JSON.stringify(colDef));
    });

            }, []);




    return  (
            <div style={containerStyle}>
                <div style={{"height":"100%","boxSizing":"border-box"}}>
    
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                
                rowData={rowData}
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
