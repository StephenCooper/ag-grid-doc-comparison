
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

var minRowHeight = 25;

var currentRowHeight;

const updateRowHeight = (params) => {
    // get the height of the grid body - this excludes the height of the headers
    const bodyViewport = document.querySelector('.ag-body-viewport');
    if (!bodyViewport) {
        return;
    }
    var gridHeight = bodyViewport.clientHeight;
    // get the rendered rows
    var renderedRowCount = params.api.getDisplayedRowCount();
    // if the rendered rows * min height is greater than available height, just just set the height
    // to the min and let the scrollbar do its thing
    if (renderedRowCount * minRowHeight >= gridHeight) {
        if (currentRowHeight !== minRowHeight) {
            currentRowHeight = minRowHeight;
            params.api.resetRowHeights();
        }
    }
    else {
        // set the height of the row to the grid height / number of rows available
        currentRowHeight = Math.floor(gridHeight / renderedRowCount);
        params.api.resetRowHeights();
    }
};



const GridExample = () => {
    
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState(getData());
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
    const getRowHeight = useCallback(function () {
    return currentRowHeight;
}, []);


            const onGridReady = useCallback((params) => {
                
    minRowHeight = params.api.getSizesForCurrentTheme().rowHeight;
    currentRowHeight = minRowHeight;
    params.api.sizeColumnsToFit();

            }, []);

const onFirstDataRendered = useCallback((params) => {
    updateRowHeight(params);
}, [updateRowHeight])

   const onGridSizeChanged = useCallback((params) => {
    updateRowHeight(params);
}, [updateRowHeight])


    return  (
            <div style={containerStyle}>
                
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
getRowHeight={getRowHeight}
onGridReady={onGridReady}
onFirstDataRendered={onFirstDataRendered}
onGridSizeChanged={onGridSizeChanged}
            >
            </AgGridReact>
        </div>

            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
