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
      defaultColDef: {
        sortable: true,
        filter: true,
        resizable: true,
        minWidth: 100,
        flex: 1,
      },
      columnDefs: [
        { field: 'athlete', minWidth: 200 },
        { field: 'country', minWidth: 200 },
        { field: 'sport', minWidth: 150 },
        { field: 'gold', hide: true },
        { field: 'silver', hide: true },
        { field: 'bronze', hide: true },
        { field: 'total', hide: true },
      ],
      excelStyles: [
        {
          id: 'coverHeading',
          font: {
            size: 26,
            bold: true,
          },
        },
        {
          id: 'coverText',
          font: {
            size: 14,
          },
        },
      ],
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) =>
      params.api.setRowData(data.filter((rec) => rec.country != null));

    fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onBtExport = () => {
    const spreadsheets = [];
    //set a filter condition ensuring no records are returned so only the header content is exported
    const filterInstance = this.gridApi.getFilterInstance('athlete');
    filterInstance.setModel({
      values: [],
    });
    this.gridApi.onFilterChanged();
    //custom content for cover page
    spreadsheets.push(
      this.gridApi.getSheetDataForExcel({
        prependContent: [
          [
            {
              styleId: 'coverHeading',
              mergeAcross: 3,
              data: { value: 'AG Grid', type: 'String' },
            },
          ],
          [
            {
              styleId: 'coverHeading',
              mergeAcross: 3,
              data: { value: '', type: 'String' },
            },
          ],
          [
            {
              styleId: 'coverText',
              mergeAcross: 3,
              data: {
                value:
                  'Data shown lists Olympic medal winners for years 2000-2012',
                type: 'String',
              },
            },
          ],
          [
            {
              styleId: 'coverText',
              data: {
                value:
                  'This data includes a row for each participation record - athlete name, country, year, sport, count of gold, silver, bronze medals won during the sports event',
                type: 'String',
              },
            },
          ],
        ],
        processHeaderCallback: () => '',
        sheetName: 'cover',
      })
    );
    //remove filter condition set above so all the grid data can be exported on a separate sheet
    filterInstance.setModel(null);
    this.gridApi.onFilterChanged();
    spreadsheets.push(this.gridApi.getSheetDataForExcel());
    this.gridApi.exportMultipleSheetsAsExcel({
      data: spreadsheets,
      fileName: 'ag-grid.xlsx',
    });
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="container">
          <div className="columns">
            <div>
              <button
                onClick={() => this.onBtExport()}
                style={{ fontWeight: 'bold', marginBottom: '5px' }}
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
                defaultColDef={this.state.defaultColDef}
                columnDefs={this.state.columnDefs}
                excelStyles={this.state.excelStyles}
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

render(<GridExample></GridExample>, document.querySelector('#root'));
