
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    { headerName: 'Student ID', field: 'student' },
    { headerName: 'Year Group', field: 'yearGroup', rowGroup: true },
    { headerName: 'Age', field: 'age' },
    { headerName: 'Course', field: 'course', pivot: true },
    {
        headerName: 'Age Range',
        valueGetter: ageRangeValueGetter,
        pivot: true,
    },
    { headerName: 'Points', field: 'points', aggFunc: 'sum' },
],
    defaultColDef: {
    flex: 1,
    minWidth: 150,
    sortable: true,
    resizable: true,
    cellRenderer: 'agAnimateShowChangeCellRenderer',
},
    rowData: getRowData(),
    groupDefaultExpanded: 1,
    getRowId: function (params) {
    return params.data.student;
}
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    (document.getElementById('pivot-mode')).checked = true;

    }

pivotMode = () => {
    var pivotModeOn = (document.getElementById('pivot-mode')).checked;
    this.gridColumnApi.setPivotMode(pivotModeOn);
    this.gridColumnApi.applyColumnState({
        state: [
            { colId: 'yearGroup', rowGroup: pivotModeOn },
            { colId: 'course', pivot: pivotModeOn },
            { colId: 'ageRange', pivot: pivotModeOn },
        ],
    });
}

   updateOneRecord = () => {
    var rowNodeToUpdate = pickExistingRowNodeAtRandom(this.gridApi);
    if (!rowNodeToUpdate)
        return;
    var randomValue = createNewRandomScore(rowNodeToUpdate.data);
    console.log('updating points to ' + randomValue + ' on ', rowNodeToUpdate.data);
    rowNodeToUpdate.setDataValue('points', randomValue);
}

   updateUsingTransaction = () => {
    var itemToUpdate = pickExistingRowItemAtRandom(this.gridApi);
    if (!itemToUpdate) {
        return;
    }
    console.log('updating - before', itemToUpdate);
    itemToUpdate.points = createNewRandomScore(itemToUpdate);
    var transaction = {
        update: [itemToUpdate],
    };
    console.log('updating - after', itemToUpdate);
    this.gridApi.applyTransaction(transaction);
}

   addNewGroupUsingTransaction = () => {
    var item1 = createRow();
    var item2 = createRow();
    item1.yearGroup = 'Year 5';
    item2.yearGroup = 'Year 5';
    var transaction = {
        add: [item1, item2],
    };
    console.log('add - ', item1);
    console.log('add - ', item2);
    this.gridApi.applyTransaction(transaction);
}

   addNewCourse = () => {
    var item1 = createRow();
    item1.course = 'Physics';
    var transaction = {
        add: [item1],
    };
    console.log('add - ', item1);
    this.gridApi.applyTransaction(transaction);
}

   removePhysics = () => {
    var allPhysics = [];
    this.gridApi.forEachLeafNode(function (rowNode) {
        if (rowNode.data.course === 'Physics') {
            allPhysics.push(rowNode.data);
        }
    });
    var transaction = {
        remove: allPhysics,
    };
    console.log('removing ' + allPhysics.length + ' physics items.');
    this.gridApi.applyTransaction(transaction);
}

   moveCourse = () => {
    var item = pickExistingRowItemAtRandom(this.gridApi);
    if (!item) {
        return;
    }
    item.course = item.course === 'History' ? 'Science' : 'History';
    var transaction = {
        update: [item],
    };
    console.log('moving ' + item);
    this.gridApi.applyTransaction(transaction);
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className="example-wrapper">
    <div className="example-header">
        <div>
            <label>
                <input type="checkbox" id="pivot-mode" onClick={() => this.pivotMode()} />
                Group &amp; Pivot
            </label>
        </div>
    
        <div style={{"marginTop":"6px"}}>
            <button onClick={() => this.updateOneRecord()}>Set One Value</button>
            <button onClick={() => this.updateUsingTransaction()}>Update Points</button>
            <button onClick={() => this.addNewGroupUsingTransaction()}>Add New Group</button>
            <button onClick={() => this.addNewCourse()}>Add Physics Row</button>
            <button onClick={() => this.removePhysics()}>Remove All Physics</button>
            <button onClick={() => this.moveCourse()}>Move Course</button>
        </div>
    </div>
    <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine-dark">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
rowData={this.state.rowData}
pivotMode={true}
groupDefaultExpanded={this.state.groupDefaultExpanded}
animateRows={true}
getRowId={this.state.getRowId}
onGridReady={this.onGridReady}
            />
            </div>
</div>

            </div>
        );
    }
}

function ageRangeValueGetter(params) {
    var age = params.getValue('age');
    if (age === undefined) {
        return null;
    }
    if (age < 20) {
        return '< 20';
    }
    else if (age > 30) {
        return '> 30';
    }
    else {
        return '20 to 30';
    }
}
// pretty basic, but deterministic (so same numbers each time we run), random number generator
var seed;
function random() {
    seed = ((seed || 1) * 16807) % 2147483647;
    return seed;
}
function getRowData() {
    var rowData = [];
    for (var i = 1; i <= 100; i++) {
        var row = createRow();
        rowData.push(row);
    }
    return rowData;
}
var studentId;
function createRow() {
    studentId = studentId ? studentId : 10023;
    var randomNumber = random();
    return {
        student: studentId++,
        points: (randomNumber % 60) + 40,
        course: ['Science', 'History'][randomNumber % 3 === 0 ? 0 : 1],
        yearGroup: 'Year ' + ((randomNumber % 4) + 1),
        age: (randomNumber % 25) + 15, // 15 to 40
    };
}
function createNewRandomScore(data) {
    var randomValue = createRandomNumber();
    // make sure random number is not actually the same number again
    while (randomValue === data.points) {
        randomValue = createRandomNumber();
    }
    return randomValue;
}
function createRandomNumber() {
    return Math.floor(Math.random() * 100);
}
function pickExistingRowNodeAtRandom(gridApi) {
    var allItems = [];
    gridApi.forEachLeafNode(function (rowNode) {
        allItems.push(rowNode);
    });
    if (allItems.length === 0) {
        return;
    }
    var result = allItems[Math.floor(Math.random() * allItems.length)];
    return result;
}
function pickExistingRowItemAtRandom(gridApi) {
    var rowNode = pickExistingRowNodeAtRandom(gridApi);
    return rowNode ? rowNode.data : null;
}

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
