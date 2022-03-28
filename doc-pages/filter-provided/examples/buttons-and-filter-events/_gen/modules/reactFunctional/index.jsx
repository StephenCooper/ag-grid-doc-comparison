
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





const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
    {
        field: 'athlete',
        filter: 'agTextColumnFilter',
        filterParams: {
            buttons: ['reset', 'apply'],
        },
    },
    {
        field: 'age',
        maxWidth: 100,
        filter: 'agNumberColumnFilter',
        filterParams: {
            buttons: ['apply', 'reset'],
            closeOnApply: true,
        },
    },
    {
        field: 'country',
        filter: 'agTextColumnFilter',
        filterParams: {
            buttons: ['clear', 'apply'],
        },
    },
    {
        field: 'year',
        filter: 'agNumberColumnFilter',
        filterParams: {
            buttons: ['apply', 'cancel'],
            closeOnApply: true,
        },
        maxWidth: 100,
    },
    { field: 'sport' },
    { field: 'gold', filter: 'agNumberColumnFilter' },
    { field: 'silver', filter: 'agNumberColumnFilter' },
    { field: 'bronze', filter: 'agNumberColumnFilter' },
    { field: 'total', filter: 'agNumberColumnFilter' },
]);
    const defaultColDef = useMemo(() => { return {
    flex: 1,
    minWidth: 150,
    filter: true,
} }, []);


            const onGridReady = useCallback((params) => {
                
                fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => setRowData(data));
            }, []);

const onFilterOpened = useCallback((e) => {
    console.log('onFilterOpened', e);
}, [])

   const onFilterChanged = useCallback((e) => {
    console.log('onFilterChanged', e);
    console.log('gridRef.current.api.getFilterModel() =>', e.api.getFilterModel());
}, [])

   const onFilterModified = useCallback((e) => {
    console.log('onFilterModified', e);
    console.log('filterInstance.getModel() =>', e.filterInstance.getModel());
    console.log('filterInstance.getModelFromUi() =>', (e.filterInstance).getModelFromUi());
}, [])


    return  (
            <div style={containerStyle}>
                
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
onGridReady={onGridReady}
onFilterOpened={onFilterOpened}
onFilterChanged={onFilterChanged}
onFilterModified={onFilterModified}
            >
            </AgGridReact>
        </div>

            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
