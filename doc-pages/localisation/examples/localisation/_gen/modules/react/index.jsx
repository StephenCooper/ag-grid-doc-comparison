
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { GridChartsModule } from '@ag-grid-enterprise/charts';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';
import { StatusBarModule } from '@ag-grid-enterprise/status-bar';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule, ColumnsToolPanelModule, FiltersToolPanelModule, SetFilterModule, CsvExportModule, ExcelExportModule, GridChartsModule, ClipboardModule, RangeSelectionModule, RowGroupingModule, MultiFilterModule, SideBarModule, StatusBarModule])

class NodeIdRenderer  {
  

  init(params) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = params.node.id + 1;
  }

  getGui() {
    return this.eGui;
  }

  refresh(params) {
    return false;
  }
}

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    // this row just shows the row index, doesn't use any data from the row
    {
        headerName: '#',
        cellRenderer: NodeIdRenderer,
        checkboxSelection: true,
        headerCheckboxSelection: true,
    },
    { field: 'athlete', filterParams: { buttons: ['clear', 'reset', 'apply'] } },
    {
        field: 'age',
        filterParams: { buttons: ['apply', 'cancel'] },
        enablePivot: true,
    },
    { field: 'country', enableRowGroup: true },
    { field: 'year', filter: 'agNumberColumnFilter' },
    { field: 'date' },
    {
        field: 'sport',
        filter: 'agMultiColumnFilter',
        filterParams: {
            filters: [
                {
                    filter: 'agTextColumnFilter',
                    display: 'accordion',
                },
                {
                    filter: 'agSetColumnFilter',
                    display: 'accordion',
                },
            ],
        },
    },
    { field: 'gold', enableValue: true },
    { field: 'silver', enableValue: true },
    { field: 'bronze', enableValue: true },
    { field: 'total', enableValue: true },
],
    localeText: AG_GRID_LOCALE_ZZZ,
    defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
},
    statusBar: {
    statusPanels: [
        { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
        { statusPanel: 'agAggregationComponent' },
    ],
},
    rowGroupPanelShow: 'always',
    paginationPageSize: 500,
    rowData: null
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
        const updateData = (data) => params.api.setRowData(data);
        
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then(resp => resp.json())
            .then(data => updateData(data));
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
localeText={this.state.localeText}
defaultColDef={this.state.defaultColDef}
sideBar={true}
statusBar={this.state.statusBar}
rowGroupPanelShow={this.state.rowGroupPanelShow}
pagination={true}
paginationPageSize={this.state.paginationPageSize}
enableRangeSelection={true}
enableCharts={true}
onGridReady={this.onGridReady}
rowData={this.state.rowData}
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
