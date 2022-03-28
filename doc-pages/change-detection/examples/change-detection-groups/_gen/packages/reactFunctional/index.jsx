
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const getRowData = () => {
    var rowData = [];
    for (var i = 1; i <= 16; i++) {
        rowData.push({
            group: i < 8 ? 'A' : 'B',
            a: (i * 863) % 100,
            b: (i * 811) % 100,
            c: (i * 743) % 100,
            d: (i * 677) % 100,
        });
    }
    return rowData;
}



const GridExample = () => {
    
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState(getRowData());
    const [columnDefs, setColumnDefs] = useState([
    { field: 'group', rowGroup: true, editable: true },
    { field: 'a', type: 'valueColumn' },
    { field: 'b', type: 'valueColumn' },
    { field: 'c', type: 'valueColumn' },
    { field: 'd', type: 'valueColumn' },
    {
        headerName: 'Total',
        type: 'totalColumn',
        // we use getValue() instead of data.a so that it gets the aggregated values at the group level
        valueGetter: 'getValue("a") + getValue("b") + getValue("c") + getValue("d")',
    },
]);
    const defaultColDef = useMemo(() => { return {
    flex: 1,
    sortable: true,
} }, []);
    const autoGroupColumnDef = useMemo(() => { return {
    minWidth: 100,
} }, []);
    const columnTypes = useMemo(() => { return {
    valueColumn: {
        editable: true,
        aggFunc: 'sum',
        valueParser: 'Number(newValue)',
        cellClass: 'number-cell',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agNumberColumnFilter',
    },
    totalColumn: {
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellClass: 'number-cell',
    },
} }, []);






    return  (
            <div style={containerStyle}>
                


        <div  style={gridStyle} className="ag-theme-alpine-dark">             
            <AgGridReact
                
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
autoGroupColumnDef={autoGroupColumnDef}
columnTypes={columnTypes}
groupDefaultExpanded={1}
suppressAggFuncInHeader={true}
animateRows={true}
            >
            </AgGridReact>
        </div>
            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
