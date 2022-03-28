
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import CallsCellRenderer from './callsCellRenderer.jsx';





const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState();
    const isRowMaster = useCallback(function (dataItem) {
    return dataItem ? dataItem.callRecords.length > 0 : false;
}, []);
    const [columnDefs, setColumnDefs] = useState([
    // group cell renderer needed for expand / collapse icons
    { field: 'name', cellRenderer: 'agGroupCellRenderer' },
    { field: 'account' },
    { field: 'calls', cellRenderer: CallsCellRenderer },
    { field: 'minutes', valueFormatter: "x.toLocaleString() + 'm'" },
]);
    const defaultColDef = useMemo(() => { return {
    flex: 1,
} }, []);
    const getRowId = useCallback(function (params) {
    return params.data.account;
}, []);
    const detailCellRendererParams = useMemo(() => { return {
    detailGridOptions: {
        columnDefs: [
            { field: 'callId' },
            { field: 'direction' },
            { field: 'number', minWidth: 150 },
            { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
            { field: 'switchCode', minWidth: 150 },
        ],
        defaultColDef: {
            flex: 1,
        },
    },
    getDetailRowData: function (params) {
        params.successCallback(params.data.callRecords);
    },
} }, []);


            const onGridReady = useCallback((params) => {
                
                fetch('https://www.ag-grid.com/example-assets/master-detail-dynamic-data.json')
                .then(resp => resp.json())
                .then(data => {
    setRowData(data);
});
            }, []);

const onFirstDataRendered = useCallback((params) => {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
        gridRef.current.api.getDisplayedRowAtIndex(1).setExpanded(true);
    }, 0);
}, [])


    return  (
            <div style={containerStyle}>
                
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
masterDetail={true}
isRowMaster={isRowMaster}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
animateRows={true}
getRowId={getRowId}
detailCellRendererParams={detailCellRendererParams}
onGridReady={onGridReady}
onFirstDataRendered={onFirstDataRendered}
            >
            </AgGridReact>
        </div>

            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
