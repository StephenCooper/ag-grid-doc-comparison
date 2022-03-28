
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
    { valueGetter: "'Drag'", dndSource: true },
    { field: 'id' },
    { field: 'color' },
    { field: 'value1' },
    { field: 'value2' },
],
    defaultColDef: {
    width: 80,
    sortable: true,
    filter: true,
    resizable: true,
},
    rowClassRules: {
    'red-row': 'data.color == "Red"',
    'green-row': 'data.color == "Green"',
    'blue-row': 'data.color == "Blue"',
},
    rowData: getData()
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    }

onDragOver = (event) => {
    var dragSupported = event.dataTransfer.length;
    if (dragSupported) {
        event.dataTransfer.dropEffect = 'move';
    }
    event.preventDefault();
}

   onDrop = (event) => {
    var jsonData = event.dataTransfer.getData('application/json');
    var eJsonRow = document.createElement('div');
    eJsonRow.classList.add('json-row');
    eJsonRow.innerText = jsonData;
    var eJsonDisplay = document.querySelector('#eJsonDisplay');
    eJsonDisplay.appendChild(eJsonRow);
    event.preventDefault();
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className="outer">

    <div className="grid-col">
        <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
rowClassRules={this.state.rowClassRules}
rowData={this.state.rowData}
rowDragManaged={true}
animateRows={true}
onGridReady={this.onGridReady}
            />
            </div>
    </div>

    <div className="drop-col" onDragOver={() => this.onDragOver(event)} onDrop={() => this.onDrop(event)}>
        <span id="eDropTarget" className="drop-target">
            ==&gt; Drop to here
        </span>
        <div id="eJsonDisplay" className="json-display">
        </div>
    </div>

</div>

            </div>
        );
    }
}



render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
