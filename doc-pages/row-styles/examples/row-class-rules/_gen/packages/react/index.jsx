
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
            rowData: getData(),
    columnDefs: [
    { headerName: 'Employee', field: 'employee' },
    { headerName: 'Number Sick Days', field: 'sickDays', editable: true },
],
    rowClassRules: {
    // row style function
    'sick-days-warning': function (params) {
        var numSickDays = params.data.sickDays;
        return numSickDays > 5 && numSickDays <= 7;
    },
    // row style expression
    'sick-days-breach': 'data.sickDays >= 8',
}
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    }

setDataValue = () => {
    this.gridApi.forEachNode(function (rowNode) {
        rowNode.setDataValue('sickDays', randomInt());
    });
}

   setData = () => {
    this.gridApi.forEachNode(function (rowNode) {
        var newData = {
            employee: rowNode.data.employee,
            sickDays: randomInt(),
        };
        rowNode.setData(newData);
    });
}

   applyTransaction = () => {
    var itemsToUpdate = [];
    this.gridApi.forEachNode(function (rowNode) {
        var data = rowNode.data;
        data.sickDays = randomInt();
        itemsToUpdate.push(data);
    });
    this.gridApi.applyTransaction({ update: itemsToUpdate });
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className="example-wrapper">
    <div style={{"marginBottom":"5px"}}>
        <button onClick={() => this.setDataValue()}>rowNode.setDataValue</button>
        <button onClick={() => this.setData()}>rowNode.setData</button>
        <button onClick={() => this.applyTransaction()}>api.applyTransaction</button>
    </div>

    <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                rowData={this.state.rowData}
columnDefs={this.state.columnDefs}
rowClassRules={this.state.rowClassRules}
onGridReady={this.onGridReady}
            />
            </div>
</div>
            </div>
        );
    }
}

function randomInt() {
    return Math.floor(Math.random() * 10);
}

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
