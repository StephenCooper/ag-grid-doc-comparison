
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MultiFilterModule, SetFilterModule, MenuModule, ClipboardModule])





const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
    {
        field: 'athlete',
        filter: 'agMultiColumnFilter',
        filterParams: {
            filters: [
                {
                    filter: 'agTextColumnFilter',
                    filterParams: {
                        buttons: ['apply', 'clear'],
                    },
                },
                {
                    filter: 'agSetColumnFilter',
                },
            ],
        },
    },
]);
    const defaultColDef = useMemo(() => { return {
    flex: 1,
    minWidth: 200,
    resizable: true,
    menuTabs: ['filterMenuTab'],
} }, []);


            const onGridReady = useCallback((params) => {
                
                fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => setRowData(data));
            }, []);

const getTextModel = useCallback(() => {
    var textFilter = (gridRef.current.api.getFilterInstance('athlete')).getChildFilterInstance(0);
    console.log('Current Text Filter model: ', textFilter.getModel());
}, [])

   const getSetMiniFilter = useCallback(() => {
    var setFilter = (gridRef.current.api.getFilterInstance('athlete')).getChildFilterInstance(1);
    console.log('Current Set Filter search text: ', setFilter.getMiniFilter());
}, [])


    return  (
            <div style={containerStyle}>
                <div className="example-wrapper">
    <div style={{"marginBottom":"1rem"}}>
        <button onClick={getTextModel}>Print Text Filter model</button>
        <button onClick={getSetMiniFilter}>Print Set Filter search text</button>
    </div>
    
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
onGridReady={onGridReady}
            >
            </AgGridReact>
        </div>
</div>
            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
