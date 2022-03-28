
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const getBoolean = (id) => {
    var field = document.querySelector('#' + id);
    return !!field.checked;
}

const getParams = () => {
    return {
        allColumns: getBoolean('allColumns'),
    };
}



const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState(getData());
    const defaultColDef = useMemo(() => { return {
    editable: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
} }, []);
    const popupParent = useMemo(() => { return document.body }, []);
    const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'gold', hide: true },
    { field: 'silver', hide: true },
    { field: 'bronze', hide: true },
    { field: 'total' },
]);



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
            <label for="allColumns"><input id="allColumns" type="checkbox" />All Columns</label>
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
