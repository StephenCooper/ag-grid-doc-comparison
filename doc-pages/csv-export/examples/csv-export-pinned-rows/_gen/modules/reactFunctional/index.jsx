
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { MenuModule } from '@ag-grid-enterprise/menu';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule, MenuModule])

const getBoolean = (id) => {
    var field = document.querySelector('#' + id);
    return !!field.checked;
}

const getParams = () => {
    return {
        skipPinnedTop: getBoolean('skipPinnedTop'),
        skipPinnedBottom: getBoolean('skipPinnedBottom'),
    };
}



const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState([
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
]);
    const defaultColDef = useMemo(() => { return {
    editable: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
} }, []);
    const popupParent = useMemo(() => { return document.body }, []);
    const [columnDefs, setColumnDefs] = useState([{ field: 'make' }, { field: 'model' }, { field: 'price' }]);
    const pinnedTopRowData = useMemo(() => { return [{ make: 'Top Make', model: 'Top Model', price: 0 }] }, []);
    const pinnedBottomRowData = useMemo(() => { return [
    { make: 'Bottom Make', model: 'Bottom Model', price: 10101010 },
] }, []);



const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv(getParams());
}, [])

   const onBtnUpdate = useCallback(() => {
    (document.querySelector('#csvResult')).value = gridRef.current.api.getDataAsCsv(getParams());
}, [])


    return  (
            <div style={containerStyle}>
                

<div style={{"display":"flex","flexDirection":"column","height":"100%"}}>
    <div style={{"display":"flex"}}>
        <div className="row">
            <label for="skipPinnedTop"><input id="skipPinnedTop" type="checkbox" />Skip Pinned Top Rows</label>
            <label for="skipPinnedBottom"><input id="skipPinnedBottom" type="checkbox" />Skip Pinned Bottom Rows</label>
        </div>
    </div>
    <div style={{"margin":"10px 0"}}>
        <button onClick={onBtnUpdate}>Show CSV export content text</button>
        <button onClick={onBtnExport}>Download CSV export file</button>
    </div>
    <div style={{"flex":"1 1 0px","position":"relative"}}>
        <div id="gridContainer">
            
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
defaultColDef={defaultColDef}
suppressExcelExport={true}
popupParent={popupParent}
columnDefs={columnDefs}
pinnedTopRowData={pinnedTopRowData}
pinnedBottomRowData={pinnedBottomRowData}
            >
            </AgGridReact>
        </div>
        </div>
        <textarea id="csvResult">Click the Show CSV export content button to view exported CSV here</textarea>
    </div>
</div>


            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
