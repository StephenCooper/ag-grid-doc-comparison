
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule])





const GridExample = () => {
    
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState([
    { orgHierarchy: ['A'] },
    { orgHierarchy: ['A', 'B'] },
    { orgHierarchy: ['C', 'D'] },
    { orgHierarchy: ['E', 'F', 'G', 'H'] },
]);
    const [columnDefs, setColumnDefs] = useState([
    // we're using the auto group column by default!
    {
        field: 'groupType',
        valueGetter: function (params) {
            return params.data ? 'Provided' : 'Filler';
        },
    },
]);
    const defaultColDef = useMemo(() => { return {
    flex: 1,
} }, []);
    const autoGroupColumnDef = useMemo(() => { return {
    headerName: 'Organisation Hierarchy',
    cellRendererParams: {
        suppressCount: true,
    },
} }, []);
    const getDataPath = useCallback(function (data) {
    return data.orgHierarchy;
}, []);






    return  (
            <div style={containerStyle}>
                
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
autoGroupColumnDef={autoGroupColumnDef}
treeData={true}
animateRows={true}
groupDefaultExpanded={-1}
getDataPath={getDataPath}
            >
            </AgGridReact>
        </div>
            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
