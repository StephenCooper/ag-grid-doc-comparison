
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule, RangeSelectionModule, ClipboardModule])

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    { field: 'a' },
    { field: 'b' },
    { field: 'c' },
    { field: 'd' },
    { field: 'e' },
    { field: 'f' },
    { field: 'g' },
    { field: 'h' },
    { field: 'i' },
    { field: 'j' },
    { field: 'k' },
],
    rowData: getData(),
    defaultColDef: {
    editable: true,
    minWidth: 120,
    resizable: true,
    flex: 1,
    cellClassRules: {
        'cell-green': 'value.startsWith("Green")',
        'cell-blue': 'value.startsWith("Blue")',
        'cell-red': 'value.startsWith("Red")',
        'cell-yellow': 'value.startsWith("Yellow")',
        'cell-orange': 'value.startsWith("Orange")',
        'cell-grey': 'value.startsWith("Grey")',
    },
}
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    }

processDataFromClipboard = (params) => {
    var containsRed;
    var containsYellow;
    var data = params.data;
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        for (var j = 0; j < row.length; j++) {
            var value = row[j];
            if (value) {
                if (value.startsWith('Red')) {
                    containsRed = true;
                }
                else if (value.startsWith('Yellow')) {
                    containsYellow = true;
                }
            }
        }
    }
    if (containsRed) {
        // replace the paste request with another
        return [
            ['Orange', 'Orange'],
            ['Grey', 'Grey'],
        ];
    }
    if (containsYellow) {
        // cancels the paste
        return null;
    }
    return data;
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
rowData={this.state.rowData}
enableRangeSelection={true}
defaultColDef={this.state.defaultColDef}
processDataFromClipboard={this.processDataFromClipboard}
onGridReady={this.onGridReady}
            />
            </div>

            </div>
        );
    }
}



render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
