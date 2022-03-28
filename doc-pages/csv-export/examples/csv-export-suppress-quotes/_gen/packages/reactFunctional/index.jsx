
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const getBoolean = (inputSelector) => {
    return !!(document.querySelector(inputSelector)).checked;
}

const getParams = () => {
    return {
        suppressQuotes: getBoolean('#suppressQuotes'),
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



const onBtnExport = useCallback(() => {
    const params = getParams();
    if (params.suppressQuotes) {
        alert('NOTE: you are downloading a file with non-standard quotes - it may not render correctly in Excel.');
    }
    gridRef.current.api.exportDataAsCsv(params);
}, [alert])

   const onBtnUpdate = useCallback(() => {
    (document.querySelector('#csvResult')).value = gridRef.current.api.getDataAsCsv(getParams());
}, [])


    return  (
            <div style={containerStyle}>
                

<div style={{"display":"flex","flexDirection":"column","height":"100%"}}>
    <div style={{"display":"flex"}}>
        <div>
            <div className="row">
                <label for="suppressQuotes"><input type="checkbox" id="suppressQuotes" />suppressQuotes</label>
            </div>
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
