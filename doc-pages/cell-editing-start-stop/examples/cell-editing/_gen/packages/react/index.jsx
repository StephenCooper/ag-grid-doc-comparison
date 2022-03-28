
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'gender' },
    { field: 'age' },
    { field: 'mood' },
    { field: 'country' },
    { field: 'address', minWidth: 550 },
],
    defaultColDef: {
    flex: 1,
    minWidth: 110,
    editable: true,
    resizable: true,
},
    rowData: getData(),
    pinnedTopRowData: getPinnedTopData(),
    pinnedBottomRowData: getPinnedBottomData()
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    }

onBtStopEditing = () => {
    this.gridApi.stopEditing();
}

   onBtStartEditing = (key, char, pinned) => {
    this.gridApi.setFocusedCell(0, 'lastName', pinned);
    this.gridApi.startEditingCell({
        rowIndex: 0,
        colKey: 'lastName',
        // set to 'top', 'bottom' or undefined
        rowPinned: pinned,
        key: key,
        charPress: char,
    });
}

   onBtNextCell = () => {
    this.gridApi.tabToNextCell();
}

   onBtPreviousCell = () => {
    this.gridApi.tabToPreviousCell();
}

   onBtWhich = () => {
    var cellDefs = this.gridApi.getEditingCells();
    if (cellDefs.length > 0) {
        var cellDef = cellDefs[0];
        console.log('editing cell is: row = ' +
            cellDef.rowIndex +
            ', col = ' +
            cellDef.column.getId() +
            ', floating = ' +
            cellDef.rowPinned);
    }
    else {
        console.log('no cells are editing');
    }
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className="example-wrapper">
    <div style={{"marginBottom":"5px","display":"flex","justifyContent":"space-between"}}>
        <div>
            <button onClick={() => this.onBtStartEditing()}>edit (0)</button>
            <button onClick={() => this.onBtStartEditing('Delete')}>edit (0, Delete)</button>
            <button onClick={() => this.onBtStartEditing(undefined, 'T')}>edit (0, 'T')</button>
            <button onClick={() => this.onBtStartEditing(undefined, undefined, 'top')}>edit (0, Top)</button>
            <button onClick={() => this.onBtStartEditing(undefined, undefined, 'bottom')}>edit (0, Bottom)</button>
        </div>
        <div>
            <button onClick={() => this.onBtStopEditing()}>stop ()</button>
            <button onClick={() => this.onBtNextCell()}>next ()</button>
            <button onClick={() => this.onBtPreviousCell()}>previous ()</button>
        </div>
        <div>
            <button onClick={() => this.onBtWhich()}>which ()</button>
        </div>
    </div>
    <div className="grid-wrapper">
        <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
rowData={this.state.rowData}
pinnedTopRowData={this.state.pinnedTopRowData}
pinnedBottomRowData={this.state.pinnedBottomRowData}
onGridReady={this.onGridReady}
            />
            </div>
    </div>
</div>
            </div>
        );
    }
}

function getPinnedTopData() {
    return [
        {
            firstName: '##',
            lastName: '##',
            gender: '##',
            address: '##',
            mood: '##',
            country: '##',
        },
    ];
}
function getPinnedBottomData() {
    return [
        {
            firstName: '##',
            lastName: '##',
            gender: '##',
            address: '##',
            mood: '##',
            country: '##',
        },
    ];
}

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
