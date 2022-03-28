
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';





const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
    // group cell renderer needed for expand / collapse icons
    { field: 'name', cellRenderer: 'agGroupCellRenderer' },
    { field: 'account' },
    { field: 'calls' },
    { field: 'minutes', valueFormatter: "x.toLocaleString() + 'm'" },
]);
    const defaultColDef = useMemo(() => { return {
    flex: 1,
} }, []);
    const detailCellRendererParams = useMemo(() => { return {
    detailGridOptions: {
        columnDefs: [
            { field: 'callId' },
            { field: 'direction' },
            { field: 'number' },
            { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
            { field: 'switchCode' },
        ],
        defaultColDef: {
            flex: 1,
        },
    },
    getDetailRowData: function (params) {
        params.successCallback(params.data.callRecords);
    },
    template: function (params) {
        var personName = params.data.name;
        return ('<div style="height: 100%; background-color: #EDF6FF; padding: 20px; box-sizing: border-box;">' +
            '  <div style="height: 10%; padding: 2px; font-weight: bold;">###### Name: ' +
            personName +
            '</div>' +
            '  <div ref="eDetailGrid" style="height: 90%;"></div>' +
            '</div>');
    },
} }, []);


            const onGridReady = useCallback((params) => {
                
                fetch('https://www.ag-grid.com/example-assets/master-detail-data.json')
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
columnDefs={columnDefs}
defaultColDef={defaultColDef}
masterDetail={true}
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
