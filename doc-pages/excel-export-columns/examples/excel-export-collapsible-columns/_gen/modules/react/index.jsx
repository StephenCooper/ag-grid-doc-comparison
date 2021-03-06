'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { MenuModule } from '@ag-grid-enterprise/menu';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CsvExportModule,
  ExcelExportModule,
  MenuModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: 'Athlete Details',
          children: [
            {
              field: 'athlete',
              width: 180,
              filter: 'agTextColumnFilter',
            },
            {
              field: 'age',
              width: 90,
              filter: 'agNumberColumnFilter',
            },
            { headerName: 'Country', field: 'country', width: 140 },
          ],
        },
        {
          headerName: 'Sports Results',
          children: [
            { field: 'sport', width: 140 },
            {
              columnGroupShow: 'closed',
              field: 'total',
              width: 100,
              filter: 'agNumberColumnFilter',
            },
            {
              columnGroupShow: 'open',
              field: 'gold',
              width: 100,
              filter: 'agNumberColumnFilter',
            },
            {
              columnGroupShow: 'open',
              field: 'silver',
              width: 100,
              filter: 'agNumberColumnFilter',
            },
            {
              columnGroupShow: 'open',
              field: 'bronze',
              width: 100,
              filter: 'agNumberColumnFilter',
            },
          ],
        },
      ],
      defaultColDef: {
        sortable: true,
        resizable: true,
        filter: true,
      },
      rowData: null,
      defaultExcelExportParams: {
        allColumns: true,
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => params.api.setRowData(data);

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onBtExport = () => {
    this.gridApi.exportDataAsExcel();
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="container">
          <div className="columns">
            <div>
              <button
                onClick={() => this.onBtExport()}
                style={{ fontWeight: 'bold' }}
              >
                Export to Excel
              </button>
            </div>
          </div>
          <div className="grid-wrapper">
            <div
              style={{
                height: '100%',
                width: '100%',
              }}
              className="ag-theme-alpine"
            >
              <AgGridReact
                columnDefs={this.state.columnDefs}
                defaultColDef={this.state.defaultColDef}
                rowData={this.state.rowData}
                defaultExcelExportParams={this.state.defaultExcelExportParams}
                onGridReady={this.onGridReady}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
