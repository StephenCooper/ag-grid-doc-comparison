
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule, SetFilterModule])

const getRowData = () => {
    var rowData = [];
    for (var i = 1; i <= 10; i++) {
        rowData.push({
            group: i < 5 ? 'A' : 'B',
            a: (i * 863) % 100,
            b: (i * 811) % 100,
            c: (i * 743) % 100,
            d: (i * 677) % 100,
        });
    }
    return rowData;
}



const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState(getRowData());
    const [columnDefs, setColumnDefs] = useState([
    // do NOT hide this column, it's needed for editing
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
    filter: true,
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



const onCellValueChanged = useCallback((params) => {
    var changedData = [params.data];
    gridRef.current.api.applyTransaction({ update: changedData });
}, [])


    return  (
            <div style={containerStyle}>
                


        <div  style={gridStyle} className="ag-theme-alpine-dark">             
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
autoGroupColumnDef={autoGroupColumnDef}
columnTypes={columnTypes}
groupDefaultExpanded={1}
suppressAggFuncInHeader={true}
animateRows={true}
onCellValueChanged={onCellValueChanged}
            >
            </AgGridReact>
        </div>
            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
