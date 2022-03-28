
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
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
],
    defaultColDef: {
    resizable: true,
},
    rowData: getData(),
    getRowHeight: function () {
    return currentRowHeight;
}
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    minRowHeight = params.api.getSizesForCurrentTheme().rowHeight;
    currentRowHeight = minRowHeight;
    params.api.sizeColumnsToFit();

    }

onFirstDataRendered = (params) => {
    updateRowHeight(params);
}

   onGridSizeChanged = (params) => {
    updateRowHeight(params);
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
rowData={this.state.rowData}
getRowHeight={this.state.getRowHeight}
onGridReady={this.onGridReady}
onFirstDataRendered={this.onFirstDataRendered.bind(this)}
onGridSizeChanged={this.onGridSizeChanged.bind(this)}
            />
            </div>

            </div>
        );
    }
}

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

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
