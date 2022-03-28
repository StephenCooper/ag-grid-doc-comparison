
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
    { field: "make" },
    { field: "model" },
    { field: "price" }
],
    rowData: rowDataA,
    rowSelection: 'single'
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    }

onRowDataA = () => {
    this.gridApi.setRowData(rowDataA);
}

   onRowDataB = () => {
    this.gridApi.setRowData(rowDataB);
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div style={{"height":"100%","width":"100%","display":"flex","flexDirection":"column"}}>
    <div style={{"marginBottom":"5px","minHeight":"30px"}}>
        <button onClick={() => this.onRowDataA()}>Row Data A</button>
        <button onClick={() => this.onRowDataB()}>Row Data B</button>
    </div>
    <div style={{"flex":"1 1 0px"}}>
        <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
rowData={this.state.rowData}
rowSelection={this.state.rowSelection}
animateRows={true}
onGridReady={this.onGridReady}
            />
            </div>
    </div>
</div>
            </div>
        );
    }
}

// specify the data
var rowDataA = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
    { make: "Aston Martin", model: "DBX", price: 190000 }
];
var rowDataB = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
    { make: "BMW", model: "M50", price: 60000 },
    { make: "Aston Martin", model: "DBX", price: 190000 }
];

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
