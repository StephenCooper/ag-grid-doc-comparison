
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])





const GridExample = () => {
    
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState(getData());
    const [columnDefs, setColumnDefs] = useState([
    {
        headerName: 'Name',
        valueGetter: function (params) {
            return params.data.firstName + ' ' + params.data.lastName;
        },
        valueSetter: function (params) {
            var fullName = params.newValue;
            var nameSplit = fullName.split(' ');
            var newFirstName = nameSplit[0];
            var newLastName = nameSplit[1];
            var data = params.data;
            if (data.firstName !== newFirstName || data.lastName !== newLastName) {
                data.firstName = newFirstName;
                data.lastName = newLastName;
                // return true to tell grid that the value has changed, so it knows
                // to update the cell
                return true;
            }
            else {
                // return false, the grid doesn't need to update
                return false;
            }
        },
    },
    {
        headerName: 'A',
        field: 'a',
    },
    {
        headerName: 'B',
        valueGetter: function (params) {
            return params.data.b;
        },
        valueSetter: function (params) {
            var newValInt = parseInt(params.newValue);
            var valueChanged = params.data.b !== newValInt;
            if (valueChanged) {
                params.data.b = newValInt;
            }
            return valueChanged;
        },
    },
    {
        headerName: 'C.X',
        valueGetter: function (params) {
            if (params.data.c) {
                return params.data.c.x;
            }
            else {
                return undefined;
            }
        },
        valueSetter: function (params) {
            if (!params.data.c) {
                params.data.c = {};
            }
            params.data.c.x = params.newValue;
            return true;
        },
    },
    {
        headerName: 'C.Y',
        valueGetter: function (params) {
            if (params.data.c) {
                return params.data.c.y;
            }
            else {
                return undefined;
            }
        },
        valueSetter: function (params) {
            if (!params.data.c) {
                params.data.c = {};
            }
            params.data.c.y = params.newValue;
            return true;
        },
    },
]);
    const defaultColDef = useMemo(() => { return {
    flex: 1,
    resizable: true,
    editable: true,
} }, []);



const onCellValueChanged = useCallback((event) => {
    console.log('Data after change is', event.data);
}, [])


    return  (
            <div style={containerStyle}>
                
        <div  style={gridStyle} className="ag-theme-alpine-dark">             
            <AgGridReact
                
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
onCellValueChanged={onCellValueChanged}
            >
            </AgGridReact>
        </div>
            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
