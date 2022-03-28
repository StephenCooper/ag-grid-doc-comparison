
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';





const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', minWidth: 150 },
    { field: 'age', minWidth: 70, maxWidth: 90 },
    { field: 'country', minWidth: 130 },
    { field: 'year', minWidth: 70, maxWidth: 90 },
    { field: 'date', minWidth: 120 },
    { field: 'sport', minWidth: 120 },
    { field: 'gold', minWidth: 80 },
    { field: 'silver', minWidth: 80 },
    { field: 'bronze', minWidth: 80 },
    { field: 'total', minWidth: 80 },
]);
    const defaultColDef = useMemo(() => { return {
    resizable: true,
} }, []);


            const onGridReady = useCallback((params) => {
                
                fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => setRowData(data));
            }, []);

const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
}, [])

   const onGridSizeChanged = useCallback((params) => {
    // get the current grids width
    var gridWidth = document.getElementById('grid-wrapper').offsetWidth;
    // keep track of which columns to hide/show
    var columnsToShow = [];
    var columnsToHide = [];
    // iterate over all columns (visible or not) and work out
    // now many columns can fit (based on their minWidth)
    var totalColsWidth = 0;
    var allColumns = gridRef.current.columnApi.getAllColumns();
    if (allColumns && allColumns.length > 0) {
        for (var i = 0; i < allColumns.length; i++) {
            var column = allColumns[i];
            totalColsWidth += column.getMinWidth() || 0;
            if (totalColsWidth > gridWidth) {
                columnsToHide.push(column.getColId());
            }
            else {
                columnsToShow.push(column.getColId());
            }
        }
    }
    // show/hide columns based on current grid width
    gridRef.current.columnApi.setColumnsVisible(columnsToShow, true);
    gridRef.current.columnApi.setColumnsVisible(columnsToHide, false);
    // fill out any available space to ensure there are no gaps
    gridRef.current.api.sizeColumnsToFit();
}, [])


    return  (
            <div style={containerStyle}>
                <div id="grid-wrapper" style={{"width":"100%","height":"100%"}}>
    
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
onGridReady={onGridReady}
onFirstDataRendered={onFirstDataRendered}
onGridSizeChanged={onGridSizeChanged}
            >
            </AgGridReact>
        </div>
</div>
            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
