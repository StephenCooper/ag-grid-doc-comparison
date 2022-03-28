
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import CustomStatsToolPanel from './customStatsToolPanel.jsx';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, ColumnsToolPanelModule, FiltersToolPanelModule, SetFilterModule])





const GridExample = () => {
    
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', width: 150, filter: 'agTextColumnFilter' },
    { field: 'age', width: 90 },
    { field: 'country', width: 120 },
    { field: 'year', width: 90 },
    { field: 'date', width: 110 },
    { field: 'gold', width: 100, filter: false },
    { field: 'silver', width: 100, filter: false },
    { field: 'bronze', width: 100, filter: false },
    { field: 'total', width: 100, filter: false },
]);
    const defaultColDef = useMemo(() => { return {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
} }, []);
    const icons = useMemo(() => { return {
    'custom-stats': '<span class="ag-icon ag-icon-custom-stats"></span>',
} }, []);
    const sideBar = useMemo(() => { return {
    toolPanels: [
        {
            id: 'columns',
            labelDefault: 'Columns',
            labelKey: 'columns',
            iconKey: 'columns',
            toolPanel: 'agColumnsToolPanel',
        },
        {
            id: 'filters',
            labelDefault: 'Filters',
            labelKey: 'filters',
            iconKey: 'filter',
            toolPanel: 'agFiltersToolPanel',
        },
        {
            id: 'customStats',
            labelDefault: 'Custom Stats',
            labelKey: 'customStats',
            iconKey: 'custom-stats',
            toolPanel: CustomStatsToolPanel,
        },
    ],
    defaultToolPanel: 'customStats',
} }, []);


            const onGridReady = useCallback((params) => {
                
                fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => {
    setRowData(data);
});
            }, []);




    return  (
            <div style={containerStyle}>
                <div style={{"height":"100%","boxSizing":"border-box"}}>
    
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
icons={icons}
sideBar={sideBar}
onGridReady={onGridReady}
            >
            </AgGridReact>
        </div>
</div>
            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
