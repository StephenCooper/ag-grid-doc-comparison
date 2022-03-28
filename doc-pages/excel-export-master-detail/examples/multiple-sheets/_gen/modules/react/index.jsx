
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MasterDetailModule, MenuModule, ColumnsToolPanelModule, ClipboardModule, ExcelExportModule])

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    // group cell renderer needed for expand / collapse icons
    { field: 'name', cellRenderer: 'agGroupCellRenderer' },
    { field: 'account' },
    { field: 'calls' },
    { field: 'minutes', valueFormatter: "x.toLocaleString() + 'm'" },
],
    defaultColDef: {
    flex: 1,
},
    getRowId: function (params) {
    return params.data.name;
},
    groupDefaultExpanded: 1,
    rowBuffer: 100,
    detailCellRendererParams: {
    detailGridOptions: {
        columnDefs: [
            { field: 'callId' },
            { field: 'direction' },
            { field: 'number', minWidth: 150 },
            { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
            { field: 'switchCode', minWidth: 150 },
        ],
        defaultColDef: {
            flex: 1,
        },
    },
    getDetailRowData: function (params) {
        params.successCallback(params.data.callRecords);
    },
},
    rowData: null
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
        const updateData = (data) => {
    this.setState({ rowData: data });
};
        
        fetch('https://www.ag-grid.com/example-assets/master-detail-data.json')
            .then(resp => resp.json())
            .then(data => updateData(data));
    }

onFirstDataRendered = (params) => {
    params.api.forEachNode(function (node) {
        node.setExpanded(true);
    });
}

   onBtExport = () => {
    var spreadsheets = [];
    const mainSheet = this.gridApi.getSheetDataForExcel();
    if (mainSheet) {
        spreadsheets.push(mainSheet);
    }
    this.gridApi.forEachDetailGridInfo(function (node) {
        const sheet = node.api.getSheetDataForExcel({
            sheetName: node.id.replace('detail_', ''),
        });
        if (sheet) {
            spreadsheets.push(sheet);
        }
    });
    this.gridApi.exportMultipleSheetsAsExcel({
        data: spreadsheets,
        fileName: 'ag-grid.xlsx',
    });
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className="container">
    <div>
        <button onClick={() => this.onBtExport()} style={{"marginBottom":"5px","fontWeight":"bold"}}>Export to Excel</button>
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
getRowId={this.state.getRowId}
groupDefaultExpanded={this.state.groupDefaultExpanded}
rowBuffer={this.state.rowBuffer}
masterDetail={true}
detailCellRendererParams={this.state.detailCellRendererParams}
onGridReady={this.onGridReady}
onFirstDataRendered={this.onFirstDataRendered.bind(this)}
rowData={this.state.rowData}
            />
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
