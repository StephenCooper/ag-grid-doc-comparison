
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
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule, MenuModule, ColumnsToolPanelModule, SetFilterModule])

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'year', rowGroup: true, hide: true },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
],
    defaultColDef: {
    flex: 1,
    minWidth: 150,
    filter: true,
    floatingFilter: true,
    resizable: true,
},
    autoGroupColumnDef: {
    // supplies filter values to the column filters based on the colId
    filterValueGetter: (params) => {
        const colId = params.column.getColId();
        if (colId.includes('country')) {
            return params.data.country;
        }
        if (colId.includes('year')) {
            return params.data.year;
        }
    },
},
    groupDisplayType: 'multipleColumns',
    rowData: getData()
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
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
autoGroupColumnDef={this.state.autoGroupColumnDef}
groupDisplayType={this.state.groupDisplayType}
animateRows={true}
rowData={this.state.rowData}
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
