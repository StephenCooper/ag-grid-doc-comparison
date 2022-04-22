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
                { field: 'date', minWidth: 150 },
                { field: 'sport', minWidth: 150 },
                { field: 'gold' },
                { field: 'silver' },
                { field: 'bronze' },
                { field: 'total' },
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
      pinnedTopRowData: [
        {
          athlete: 'Floating <Top> Athlete',
          country: 'Floating <Top> Country',
          date: '01/08/2020',
          sport: 'Track & Field',
          gold: 22,
          silver: '003',
          bronze: 44,
          total: 55,
        },
      ],
      pinnedBottomRowData: [
        {
          athlete: 'Floating <Bottom> Athlete',
          country: 'Floating <Bottom> Country',
          date: '01/08/2030',
          sport: 'Track & Field',
          gold: 222,
          silver: '005',
          bronze: 244,
          total: 255,
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
    this.gridApi.exportDataAsExcel(getParams());
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="container">
          <div className="columns">
            <div className="column">
              <label for="skipPinnedTop">
                <input id="skipPinnedTop" type="checkbox" />
                Skip Pinned Top Rows
              </label>
            </div>
            <div className="column">
              <label for="skipPinnedBottom">
                <input id="skipPinnedBottom" type="checkbox" />
                Skip Pinned Bottom Rows
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
                pinnedTopRowData={this.state.pinnedTopRowData}
                pinnedBottomRowData={this.state.pinnedBottomRowData}
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
  return !!document.querySelector('#' + id).checked;
}
function getParams() {
  return {
    skipPinnedTop: getBoolean('skipPinnedTop'),
    skipPinnedBottom: getBoolean('skipPinnedBottom'),
  };
}

render(<GridExample></GridExample>, document.querySelector('#root'));
