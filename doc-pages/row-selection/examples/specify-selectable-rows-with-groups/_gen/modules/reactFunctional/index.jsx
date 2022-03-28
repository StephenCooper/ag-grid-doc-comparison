
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule, SetFilterModule, MenuModule, ColumnsToolPanelModule])





const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
    { field: 'country', rowGroup: true, hide: true },
    { field: 'year', maxWidth: 100 },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
    { field: 'date' },
    { field: 'sport' },
]);
    const defaultColDef = useMemo(() => { return {
    flex: 1,
    minWidth: 150,
    sortable: true,
    filter: true,
} }, []);
    const autoGroupColumnDef = useMemo(() => { return {
    headerName: 'Athlete',
    field: 'athlete',
    minWidth: 250,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
        checkbox: true,
    },
} }, []);
    const isRowSelectable = useCallback(function (node) {
    return node.data
        ? node.data.year === 2008 || node.data.year === 2004
        : false;
}, []);


            const onGridReady = useCallback((params) => {
                
                fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => {
    setRowData(data);
});
            }, []);

const filterBy2004 = useCallback(() => {
    gridRef.current.api.setFilterModel({
        year: {
            type: 'set',
            values: ['2008', '2012'],
        },
    });
}, [])

   const clearFilter = useCallback(() => {
    gridRef.current.api.setFilterModel(null);
}, [])


    return  (
            <div style={containerStyle}>
                <div style={{"display":"flex","flexDirection":"column","height":"100%"}}>
    <div style={{"paddingBottom":"1rem"}}>
        <button onClick={filterBy2004}>Filter by Year 2008 &amp; 2012</button>
        <button onClick={clearFilter}>Clear Filter</button>
    </div>
    
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
autoGroupColumnDef={autoGroupColumnDef}
rowSelection={'multiple'}
groupSelectsChildren={true}
groupSelectsFiltered={true}
suppressRowClickSelection={true}
groupDefaultExpanded={-1}
isRowSelectable={isRowSelectable}
onGridReady={onGridReady}
            >
            </AgGridReact>
        </div>
</div>
            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
