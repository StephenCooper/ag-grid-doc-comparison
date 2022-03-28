
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, SetFilterModule, MenuModule, ColumnsToolPanelModule, FiltersToolPanelModule])

var valueGetter = function (params) {
    return params.data['animalsString'].split('|');
};

var valueFormatter = function (params) {
    return params.value
        .map(function (animal) {
        return animal.name;
    })
        .join(', ');
};

var keyCreator = function (params) {
    return params.value.map(function (animal) {
        return animal.name;
    });
};



const GridExample = () => {
    
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState(getData());
    const [columnDefs, setColumnDefs] = useState([
    {
        headerName: 'Animals (array)',
        field: 'animalsArray',
        filter: 'agSetColumnFilter',
    },
    {
        headerName: 'Animals (string)',
        filter: 'agSetColumnFilter',
        valueGetter: valueGetter,
    },
    {
        headerName: 'Animals (objects)',
        field: 'animalsObjects',
        filter: 'agSetColumnFilter',
        valueFormatter: valueFormatter,
        keyCreator: keyCreator,
    },
]);
    const defaultColDef = useMemo(() => { return {
    flex: 1,
} }, []);






    return  (
            <div style={containerStyle}>
                
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
sideBar={'filters'}
            >
            </AgGridReact>
        </div>
            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
