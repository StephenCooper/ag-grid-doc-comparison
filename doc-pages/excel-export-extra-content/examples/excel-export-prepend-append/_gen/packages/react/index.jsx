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
        { field: 'athlete', minWidth: 200 },
        { field: 'country', minWidth: 200 },
        { field: 'sport', minWidth: 150 },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
      defaultColDef: {
        sortable: true,
        filter: true,
        resizable: true,
        minWidth: 100,
        flex: 1,
      },
      popupParent: document.body,
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
    this.gridApi.exportDataAsExcel(getParams());
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="container">
          <div className="columns">
            <label className="option" for="prependContent">
              <input type="checkbox" id="prependContent" />
              Prepend Content
            </label>
            <label className="option" for="appendContent">
              <input type="checkbox" id="appendContent" /> Append Content
            </label>
          </div>
          <div>
            <button
              onClick={() => this.onBtExport()}
              style={{ margin: '5px 0px', fontWeight: 'bold' }}
            >
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

const getRows = () => [
  [],
  [
    {
      data: { value: 'Here is a comma, and a some "quotes".', type: 'String' },
    },
  ],
  [
    {
      data: {
        value:
          'They are visible when the downloaded file is opened in Excel because custom content is properly escaped.',
        type: 'String',
      },
    },
  ],
  [
    { data: { value: 'this cell:', type: 'String' }, mergeAcross: 1 },
    {
      data: {
        value: 'is empty because the first cell has mergeAcross=1',
        type: 'String',
      },
    },
  ],
  [],
];
const getBoolean = (inputSelector) =>
  !!document.querySelector(inputSelector).checked;
const getParams = () => ({
  prependContent: getBoolean('#prependContent') ? getRows() : undefined,
  appendContent: getBoolean('#appendContent') ? getRows() : undefined,
});

render(<GridExample></GridExample>, document.querySelector('#root'));
