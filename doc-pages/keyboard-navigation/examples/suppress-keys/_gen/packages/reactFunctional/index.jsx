
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const suppressEnter = (params) => {
    var KEY_ENTER = 'Enter';
    var event = params.event;
    var key = event.key;
    var suppress = key === KEY_ENTER;
    return suppress;
}

const suppressNavigation = (params) => {
    var KEY_A = 'A';
    var KEY_C = 'C';
    var KEY_V = 'V';
    var KEY_D = 'D';
    var KEY_PAGE_UP = 'PageUp';
    var KEY_PAGE_DOWN = 'PageDown';
    var KEY_TAB = 'Tab';
    var KEY_LEFT = 'ArrowLeft';
    var KEY_UP = 'ArrowUp';
    var KEY_RIGHT = 'ArrowRight';
    var KEY_DOWN = 'ArrowDown';
    var KEY_F2 = 'F2';
    var KEY_BACKSPACE = 'Backspace';
    var KEY_ESCAPE = 'Escape';
    var KEY_SPACE = ' ';
    var KEY_DELETE = 'Delete';
    var KEY_PAGE_HOME = 'Home';
    var KEY_PAGE_END = 'End';
    var event = params.event;
    var key = event.key;
    var keysToSuppress = [KEY_PAGE_UP, KEY_PAGE_DOWN, KEY_TAB, KEY_F2, KEY_ESCAPE];
    var editingKeys = [
        KEY_LEFT,
        KEY_RIGHT,
        KEY_UP,
        KEY_DOWN,
        KEY_BACKSPACE,
        KEY_DELETE,
        KEY_SPACE,
        KEY_PAGE_HOME,
        KEY_PAGE_END,
    ];
    if (event.ctrlKey || event.metaKey) {
        keysToSuppress.push(KEY_A);
        keysToSuppress.push(KEY_V);
        keysToSuppress.push(KEY_C);
        keysToSuppress.push(KEY_D);
    }
    if (!params.editing) {
        keysToSuppress = keysToSuppress.concat(editingKeys);
    }
    if (params.column.getId() === 'country' &&
        (key === KEY_UP || key === KEY_DOWN)) {
        return false;
    }
    var suppress = keysToSuppress.some(function (suppressedKey) {
        return suppressedKey === key || key.toUpperCase() === suppressedKey;
    });
    return suppress;
}

const suppressUpDownNavigation = (params) => {
    var key = params.event.key;
    return key === 'ArrowUp' || key === 'ArrowDown';
}



const GridExample = () => {
    
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
    {
        field: 'athlete',
        minWidth: 170,
        suppressKeyboardEvent: function (params) {
            return suppressEnter(params) || suppressNavigation(params);
        },
    },
    { field: 'age' },
    {
        field: 'country',
        minWidth: 130,
        suppressHeaderKeyboardEvent: function (params) {
            var key = params.event.key;
            return key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Enter';
        },
    },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
]);
    const defaultColDef = useMemo(() => { return {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
    suppressKeyboardEvent: suppressNavigation,
    suppressHeaderKeyboardEvent: suppressUpDownNavigation,
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
enableRangeSelection={true}
rowSelection={'multiple'}
suppressRowClickSelection={true}
onGridReady={onGridReady}
            >
            </AgGridReact>
        </div>
            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
