
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import DetailCellRenderer from './detailCellRenderer.jsx';





const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState();
    const detailCellRenderer = useMemo(() => { return DetailCellRenderer }, []);
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


            const onGridReady = useCallback((params) => {
                
                fetch('https://www.ag-grid.com/example-assets/master-detail-data.json')
                .then(resp => resp.json())
                .then(data => {
    setRowData(data);
});
            }, []);

const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.forEachNode(function (node) {
        node.setExpanded(node.id === '1');
    });
}, [])


    return  (
            <div style={containerStyle}>
                
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
masterDetail={true}
detailCellRenderer={detailCellRenderer}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
onGridReady={onGridReady}
onFirstDataRendered={onFirstDataRendered}
            >
            </AgGridReact>
        </div>

            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
