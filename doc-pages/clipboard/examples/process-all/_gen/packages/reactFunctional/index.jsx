
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
    { field: 'a' },
    { field: 'b' },
    { field: 'c' },
    { field: 'd' },
    { field: 'e' },
    { field: 'f' },
    { field: 'g' },
    { field: 'h' },
    { field: 'i' },
    { field: 'j' },
    { field: 'k' },
]);
    const defaultColDef = useMemo(() => { return {
    editable: true,
    minWidth: 120,
    resizable: true,
    flex: 1,
    cellClassRules: {
        'cell-green': 'value.startsWith("Green")',
        'cell-blue': 'value.startsWith("Blue")',
        'cell-red': 'value.startsWith("Red")',
        'cell-yellow': 'value.startsWith("Yellow")',
        'cell-orange': 'value.startsWith("Orange")',
        'cell-grey': 'value.startsWith("Grey")',
    },
} }, []);



const processDataFromClipboard = useCallback((params) => {
    var containsRed;
    var containsYellow;
    var data = params.data;
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        for (var j = 0; j < row.length; j++) {
            var value = row[j];
            if (value) {
                if (value.startsWith('Red')) {
                    containsRed = true;
                }
                else if (value.startsWith('Yellow')) {
                    containsYellow = true;
                }
            }
        }
    }
    if (containsRed) {
        // replace the paste request with another
        return [
            ['Orange', 'Orange'],
            ['Grey', 'Grey'],
        ];
    }
    if (containsYellow) {
        // cancels the paste
        return null;
    }
    return data;
}, [])


    return  (
            <div style={containerStyle}>
                
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                
                rowData={rowData}
columnDefs={columnDefs}
enableRangeSelection={true}
defaultColDef={defaultColDef}
processDataFromClipboard={processDataFromClipboard}
            >
            </AgGridReact>
        </div>

            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
