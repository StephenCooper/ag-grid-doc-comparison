
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const setTitle = (title) => {
    (document.querySelector('#title')).innerText = title;
}



const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
    { field: 'country', pivot: true, enablePivot: true },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
]);
    const defaultColDef = useMemo(() => { return {
    flex: 1,
    minWidth: 150,
    filter: true,
    sortable: true,
    resizable: true,
} }, []);


            const onGridReady = useCallback((params) => {
                
                fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => setRowData(data));
            }, []);

const clearFilter = useCallback(() => {
    gridRef.current.api.setFilterModel(null);
    setTitle('All Medals by Country');
}, [])

   const filterUKAndIrelandBoxing = useCallback(() => {
    gridRef.current.api.setFilterModel({
        country: {
            type: 'set',
            values: ['Ireland', 'Great Britain'],
        },
        sport: {
            type: 'set',
            values: ['Boxing'],
        },
    });
    setTitle('UK and Ireland - Boxing');
}, [])

   const filterUKAndIrelandEquestrian = useCallback(() => {
    gridRef.current.api.setFilterModel({
        country: {
            type: 'set',
            values: ['Ireland', 'Great Britain'],
        },
        sport: {
            type: 'set',
            values: ['Equestrian'],
        },
    });
    setTitle('UK and Ireland - Equestrian');
}, [])

   const filterUsaAndCanadaBoxing = useCallback(() => {
    gridRef.current.api.setFilterModel({
        country: {
            type: 'set',
            values: ['United States', 'Canada'],
        },
        sport: {
            type: 'set',
            values: ['Bobsleigh'],
        },
    });
    setTitle('USA and Canada - Boxing');
}, [])

   const filterUsaAndCanadaEquestrian = useCallback(() => {
    gridRef.current.api.setFilterModel({
        country: {
            type: 'set',
            values: ['United States', 'Canada'],
        },
        sport: {
            type: 'set',
            values: ['Equestrian'],
        },
    });
    setTitle('USA and Canada - Equestrian');
}, [])


    return  (
            <div style={containerStyle}>
                <div className="test-container">
    <div className="test-header">
        <div style={{"marginBottom":"10px"}}>
            <button onClick={clearFilter}>Clear Filter</button>
            <button onClick={filterUKAndIrelandBoxing}>UK and Ireland Boxing</button>
            <button onClick={filterUKAndIrelandEquestrian}>UK and Ireland Equestrian</button>
            <button onClick={filterUsaAndCanadaBoxing}>USA and Canada Bobsleigh</button>
            <button onClick={filterUsaAndCanadaEquestrian}>USA and Canada Equestrian</button>
        </div>
        <div id="title">All Medals by Country</div>
    </div>
    
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
pivotMode={true}
sideBar={true}
onGridReady={onGridReady}
            >
            </AgGridReact>
        </div>
</div>

            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
