
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule, MenuModule, ColumnsToolPanelModule])

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    { field: 'country', rowGroup: true },
    { field: 'athlete' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
],
    rowData: getData(),
    groupDefaultExpanded: 1
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    }

setSwimmingHeight = (height) => {
    swimmingHeight = height;
    this.gridApi.resetRowHeights();
}

   setGroupHeight = (height) => {
    groupHeight = height;
    this.gridApi.resetRowHeights();
}

   setRussiaHeight = (height) => {
    // this is used next time resetRowHeights is called
    russiaHeight = height;
    this.gridApi.forEachNode(function (rowNode) {
        if (rowNode.data && rowNode.data.country === 'Russia') {
            rowNode.setRowHeight(height);
        }
    });
    this.gridApi.onRowHeightChanged();
}

   getRowHeight = (params) => {
    if (params.node.group && groupHeight != null) {
        return groupHeight;
    }
    else if (params.data &&
        params.data.country === 'Russia' &&
        russiaHeight != null) {
        return russiaHeight;
    }
    else if (params.data &&
        params.data.sport === 'Swimming' &&
        swimmingHeight != null) {
        return swimmingHeight;
    }
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className="example-wrapper">
    <div style={{"marginBottom":"5px","fontFamily":"Verdana, Geneva, Tahoma, sans-serif","fontSize":"13px"}}>
        <div>
            Top Level Groups:
            <button onClick={() => this.setGroupHeight(42)}>42px</button>
            <button onClick={() => this.setGroupHeight(75)}>75px</button>
            <button onClick={() => this.setGroupHeight(125)}>125px</button>
        </div>
        <div style={{"marginTop":"5px"}}>
            Swimming Leaf Rows:
            <button onClick={() => this.setSwimmingHeight(42)}>42px</button>
            <button onClick={() => this.setSwimmingHeight(75)}>75px</button>
            <button onClick={() => this.setSwimmingHeight(125)}>125px</button>
        </div>
        <div style={{"marginTop":"5px"}}>
            Russia Leaf Rows:
            <button onClick={() => this.setRussiaHeight(42)}>42px</button>
            <button onClick={() => this.setRussiaHeight(75)}>75px</button>
            <button onClick={() => this.setRussiaHeight(125)}>125px</button>
        </div>
    </div>
    <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
rowData={this.state.rowData}
animateRows={true}
groupDefaultExpanded={this.state.groupDefaultExpanded}
getRowHeight={this.getRowHeight}
onGridReady={this.onGridReady}
            />
            </div>
</div>
            </div>
        );
    }
}

var swimmingHeight;
var groupHeight;
var russiaHeight;

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
