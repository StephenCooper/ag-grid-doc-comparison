
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import PersonFilter from './personFilter.jsx';
import YearFilter from './yearFilter.jsx';





const GridExample = () => {
    
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', minWidth: 150, filter: PersonFilter },
    { field: 'age', filter: 'agNumberColumnFilter' },
    { field: 'country', minWidth: 150 },
    { field: 'year', filter: YearFilter },
    {
        field: 'date',
        minWidth: 130,
        filter: 'agDateColumnFilter',
        filterParams: {
            comparator: function (filterLocalDateAtMidnight, cellValue) {
                const dateAsString = cellValue;
                const dateParts = dateAsString.split('/');
                const cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
                if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                    return 0;
                }
                if (cellDate < filterLocalDateAtMidnight) {
                    return -1;
                }
                if (cellDate > filterLocalDateAtMidnight) {
                    return 1;
                }
            },
        },
    },
    { field: 'sport' },
    { field: 'gold', filter: 'agNumberColumnFilter' },
    { field: 'silver', filter: 'agNumberColumnFilter' },
    { field: 'bronze', filter: 'agNumberColumnFilter' },
    { field: 'total', filter: 'agNumberColumnFilter' },
]);
    const defaultColDef = useMemo(() => { return {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
} }, []);


            const onGridReady = useCallback((params) => {
                
                fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => {
    setRowData(data);
});
            }, []);




    return  (
            <div style={containerStyle}>
                
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
onGridReady={onGridReady}
            >
            </AgGridReact>
        </div>

            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
