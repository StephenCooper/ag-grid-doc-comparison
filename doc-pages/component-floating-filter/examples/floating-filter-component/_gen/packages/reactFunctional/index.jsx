
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import SliderFloatingFilter from './sliderFloatingFilter.jsx';





const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState(getData());
    const [columnDefs, setColumnDefs] = useState([
    { field: 'country', filter: false },
    { field: 'language', filter: false },
    { field: 'name', filter: false },
    {
        field: 'gold',
        floatingFilterComponent: SliderFloatingFilter,
        floatingFilterComponentParams: {
            maxValue: 7,
            suppressFilterButton: true,
        },
        filter: 'agNumberColumnFilter',
        suppressMenu: false,
    },
    {
        field: 'silver',
        filter: 'agNumberColumnFilter',
        floatingFilterComponent: SliderFloatingFilter,
        floatingFilterComponentParams: {
            maxValue: 5,
            suppressFilterButton: true,
        },
        suppressMenu: false,
    },
    {
        field: 'bronze',
        filter: 'agNumberColumnFilter',
        floatingFilterComponent: SliderFloatingFilter,
        floatingFilterComponentParams: {
            maxValue: 10,
            suppressFilterButton: true,
        },
        suppressMenu: false,
    },
]);
    const defaultColDef = useMemo(() => { return {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    floatingFilter: true,
    resizable: true,
} }, []);


            const onGridReady = useCallback((params) => {
                gridRef.current.api.sizeColumnsToFit();
            }, []);




    return  (
            <div style={containerStyle}>
                

<div style={{"height":"100%","boxSizing":"border-box"}}>
    
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
onGridReady={onGridReady}
            >
            </AgGridReact>
        </div>
</div>

            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
