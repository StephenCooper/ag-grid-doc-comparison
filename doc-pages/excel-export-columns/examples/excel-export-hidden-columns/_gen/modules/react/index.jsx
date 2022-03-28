
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { MenuModule } from '@ag-grid-enterprise/menu';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule, ExcelExportModule, MenuModule])

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    {
        headerName: 'Top Level Column Group',
        children: [
            {
                headerName: 'Group A',
                children: [
                    { field: 'athlete', minWidth: 200 },
                    { field: 'country', minWidth: 200 },
                    { headerName: 'Group', valueGetter: 'data.country.charAt(0)' },
                ],
            },
            {
                headerName: 'Group B',
                children: [
                    { field: 'sport', minWidth: 150 },
                    { field: 'gold', hide: true },
                    { field: 'silver', hide: true },
                    { field: 'bronze', hide: true },
                    { field: 'total', hide: true },
                ],
            },
        ],
    },
],
    defaultColDef: {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
},
    popupParent: document.body,
    rowData: null
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
        const updateData = (data) => params.api.setRowData(data.filter((rec) => rec.country != null));
        
        fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
            .then(resp => resp.json())
            .then(data => updateData(data));
    }

onBtExport = () => {
    this.gridApi.exportDataAsExcel(getParams());
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className="container">
    <div className="columns">
        <label className="option" for="allColumns"><input id="allColumns" type="checkbox" />All Columns</label>
        <div>
            <button onClick={() => this.onBtExport()} style={{"fontWeight":"bold"}}>Export to Excel</button>
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
popupParent={this.state.popupParent}
onGridReady={this.onGridReady}
rowData={this.state.rowData}
            />
            </div>
    </div>
</div>
            </div>
        );
    }
}

function getBoolean(id) {
    return !!(document.querySelector('#' + id)).checked;
}
function getParams() {
    return {
        allColumns: getBoolean('allColumns'),
    };
}

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
