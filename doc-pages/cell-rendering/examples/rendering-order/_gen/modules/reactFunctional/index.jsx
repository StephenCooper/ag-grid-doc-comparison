
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

let count = 0;

const getRowData = () => {
    // 1000 blank rows for the grid
    return Array.apply(null, Array(1000));
}

class SlowCellRenderer  {

    

    init(p) {
        const start = new Date().valueOf();
        while ((new Date().valueOf() - start) < 15) {
        this.eGui = document.createElement('span');
        }
        this.eGui = document.createElement('span');
        this.eGui.innerHTML = `${++count}`;
    }

    getGui() {
        return this.eGui;
    }

    refresh() { return false; }
}

const GridExample = () => {
    
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '95%', width: '100%'}), []);
    const [rowData, setRowData] = useState(getRowData());
    const [columnDefs, setColumnDefs] = useState([
    { field: '1' },
    { field: '2' },
    { field: '3' },
    { field: '4' },
    { field: '5' },
    { field: '6' },
    { field: '7' },
    { field: '8' },
    { field: '9' },
    { field: '10' },
    { field: '11' },
    { field: '12' },
    { field: '13' },
    { field: '14' },
    { field: '15' },
    { field: '16' },
    { field: '17' },
    { field: '18' },
    { field: '19' },
    { field: '20' },
]);
    const defaultColDef = useMemo(() => { return {
    flex: 1,
    minWidth: 80,
    cellRenderer: SlowCellRenderer
} }, []);






    return  (
            <div style={containerStyle}>
                <div><label className="infoLabel">Try Scrolling!</label></div>

        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
rowSelection={'single'}
rowBuffer={0}
            >
            </AgGridReact>
        </div>
            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
