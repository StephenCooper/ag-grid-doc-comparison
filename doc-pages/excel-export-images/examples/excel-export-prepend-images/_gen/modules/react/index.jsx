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
        { field: 'athlete' },
        { field: 'country' },
        { field: 'age' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
      defaultColDef: {
        width: 150,
        resizable: true,
      },
      defaultExcelExportParams: {
        prependContent: [
          [
            {
              data: {
                type: 'String',
                value: logos.AgGrid, // see imageUtils
              },
              mergeAcross: 1,
            },
          ],
        ],
        rowHeight: (params) => (params.rowIndex === 1 ? 82 : 20),
        addImageToCell: (rowIndex, col, value) => {
          if (rowIndex !== 1 || col.getColId() !== 'athlete') {
            return;
          }
          return {
            image: {
              id: 'logo',
              base64: value,
              imageType: 'png',
              width: 295,
              height: 100,
              position: {
                colSpan: 2,
              },
            },
          };
        },
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
      .then((response) => response.json())
      .then((data) => params.api.setRowData(data));
  };

  onBtExport = () => {
    this.gridApi.exportDataAsExcel();
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="container">
          <div>
            <button className="export" onClick={() => this.onBtExport()}>
              Export to Excel
            </button>
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
