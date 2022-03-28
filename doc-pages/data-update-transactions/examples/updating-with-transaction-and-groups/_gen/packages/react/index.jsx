
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    { field: 'category', rowGroupIndex: 1, hide: true },
    { field: 'price', aggFunc: 'sum', valueFormatter: poundFormatter },
    { field: 'zombies' },
    { field: 'style' },
    { field: 'clothes' },
],
    defaultColDef: {
    flex: 1,
    width: 100,
    sortable: true,
},
    autoGroupColumnDef: {
    headerName: 'Group',
    minWidth: 250,
    field: 'model',
    rowGroupIndex: 1,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
        checkbox: true,
    },
},
    groupDefaultExpanded: 1,
    rowData: getData(),
    rowSelection: 'multiple',
    getRowClass: function (params) {
    var rowNode = params.node;
    if (rowNode.group) {
        switch (rowNode.key) {
            case 'In Workshop':
                return 'category-in-workshop';
            case 'Sold':
                return 'category-sold';
            case 'For Sale':
                return 'category-for-sale';
            default:
                return undefined;
        }
    }
    else {
        // no extra classes for leaf rows
        return undefined;
    }
}
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    }

getRowData = () => {
    var rowData = [];
    this.gridApi.forEachNode(function (node) {
        rowData.push(node.data);
    });
    console.log('Row Data:');
    console.log(rowData);
}

   onAddRow = (category) => {
    var rowDataItem = createNewRowData(category);
    this.gridApi.applyTransaction({ add: [rowDataItem] });
}

   onMoveToGroup = (category) => {
    var selectedRowData = this.gridApi.getSelectedRows();
    selectedRowData.forEach(function (dataItem) {
        dataItem.category = category;
    });
    this.gridApi.applyTransaction({ update: selectedRowData });
}

   onRemoveSelected = () => {
    var selectedRowData = this.gridApi.getSelectedRows();
    this.gridApi.applyTransaction({ remove: selectedRowData });
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className="example-wrapper">
    <div style={{"marginBottom":"5px"}}>
        <div>
            <button className="bt-action" onClick={() => this.onAddRow('For Sale')}>Add For Sale</button>
            <button className="bt-action" onClick={() => this.onAddRow('In Workshop')}>Add In Workshop</button>
            <button className="bt-action" onClick={() => this.onRemoveSelected()}>Remove Selected</button>
            <button className="bt-action" onClick={() => this.getRowData()}>Get Row Data</button>
        </div>
        <div style={{"marginTop":"5px"}}>
            <button className="bt-action" onClick={() => this.onMoveToGroup('For Sale')}>Move to For Sale</button>
            <button className="bt-action" onClick={() => this.onMoveToGroup('In Workshop')}>Move to In Workshop</button>
            <button className="bt-action" onClick={() => this.onMoveToGroup('Sold')}>Move to Sold</button>
        </div>
    </div>

    <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
autoGroupColumnDef={this.state.autoGroupColumnDef}
groupDefaultExpanded={this.state.groupDefaultExpanded}
rowData={this.state.rowData}
suppressRowClickSelection={true}
rowSelection={this.state.rowSelection}
animateRows={true}
groupSelectsChildren={true}
suppressAggFuncInHeader={true}
getRowClass={this.state.getRowClass}
onGridReady={this.onGridReady}
            />
            </div>
</div>

            </div>
        );
    }
}

function poundFormatter(params) {
    return ('£' +
        Math.floor(params.value)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
}

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
