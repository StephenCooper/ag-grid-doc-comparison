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
          headerName: 'Athlete Details',
          children: [
            {
              field: 'athlete',
              width: 150,
              suppressSizeToFit: true,
              enableRowGroup: true,
              rowGroupIndex: 0,
            },
            {
              field: 'age',
              width: 90,
              minWidth: 75,
              maxWidth: 100,
              enableRowGroup: true,
            },
            {
              field: 'country',
              enableRowGroup: true,
            },
            {
              field: 'year',
              width: 90,
              enableRowGroup: true,
              pivotIndex: 0,
            },
            { field: 'sport', width: 110, enableRowGroup: true },
            {
              field: 'gold',
              enableValue: true,
              suppressMenu: true,
              filter: 'agNumberColumnFilter',
              aggFunc: 'sum',
            },
            {
              field: 'silver',
              enableValue: true,
              suppressMenu: true,
              filter: 'agNumberColumnFilter',
              aggFunc: 'sum',
            },
            {
              field: 'bronze',
              enableValue: true,
              suppressMenu: true,
              filter: 'agNumberColumnFilter',
              aggFunc: 'sum',
            },
            {
              field: 'total',
              enableValue: true,
              suppressMenu: true,
              filter: 'agNumberColumnFilter',
              aggFunc: 'sum',
            },
          ],
        },
      ],
      defaultColDef: {
        sortable: true,
        resizable: true,
        floatingFilter: true,
        width: 120,
      },
      rowData: null,
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

  setPivotOn = () => {
    document.querySelector('#requiresPivot').className = '';
    document.querySelector('#requiresNotPivot').className = 'hidden';
    this.gridColumnApi.setPivotMode(true);
    setIdText('pivot', 'on');
  };

  setPivotOff = () => {
    document.querySelector('#requiresPivot').className = 'hidden';
    document.querySelector('#requiresNotPivot').className = '';
    this.gridColumnApi.setPivotMode(false);
    setIdText('pivot', 'off');
  };

  setHeaderHeight = (value) => {
    this.gridApi.setHeaderHeight(value);
    setIdText('headerHeight', value);
  };

  setGroupHeaderHeight = (value) => {
    this.gridApi.setGroupHeaderHeight(value);
    setIdText('groupHeaderHeight', value);
  };

  setFloatingFiltersHeight = (value) => {
    this.gridApi.setFloatingFiltersHeight(value);
    setIdText('floatingFiltersHeight', value);
  };

  setPivotGroupHeaderHeight = (value) => {
    this.gridApi.setPivotGroupHeaderHeight(value);
    setIdText('pivotGroupHeaderHeight', value);
  };

  setPivotHeaderHeight = (value) => {
    this.gridApi.setPivotHeaderHeight(value);
    setIdText('pivotHeaderHeight', value);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div className="button-bar example-header">
            <table>
              <tbody>
                <tr>
                  <td>
                    pivot (<span id="pivot">off</span>)
                  </td>
                  <td>
                    <button onClick={() => this.setPivotOn()}>on</button>
                    <button onClick={() => this.setPivotOff()}>off</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    groupHeaderHeight (
                    <span id="groupHeaderHeight">undefined</span>)
                  </td>
                  <td>
                    <button onClick={() => this.setGroupHeaderHeight(40)}>
                      40px
                    </button>
                    <button onClick={() => this.setGroupHeaderHeight(60)}>
                      60px
                    </button>
                    <button
                      onClick={() => this.setGroupHeaderHeight(undefined)}
                    >
                      undefined
                    </button>
                  </td>
                  <td>
                    headerHeight (<span id="headerHeight">undefined</span>)
                  </td>
                  <td>
                    <button onClick={() => this.setHeaderHeight(70)}>
                      70px
                    </button>
                    <button onClick={() => this.setHeaderHeight(80)}>
                      80px
                    </button>
                    <button onClick={() => this.setHeaderHeight(undefined)}>
                      undefined
                    </button>
                  </td>
                </tr>
                <tr id="requiresPivot" className="hidden">
                  <td>
                    {' '}
                    pivotGroupHeaderHeight (
                    <span id="pivotGroupHeaderHeight">undefined</span>)
                  </td>
                  <td>
                    <button onClick={() => this.setPivotGroupHeaderHeight(50)}>
                      50px
                    </button>
                    <button onClick={() => this.setPivotGroupHeaderHeight(70)}>
                      70px
                    </button>
                    <button
                      onClick={() => this.setPivotGroupHeaderHeight(undefined)}
                    >
                      undefined
                    </button>
                  </td>
                  <td>
                    pivotHeaderHeight (
                    <span id="pivotHeaderHeight">undefined</span>)
                  </td>
                  <td>
                    <button onClick={() => this.setPivotHeaderHeight(60)}>
                      60px
                    </button>
                    <button onClick={() => this.setPivotHeaderHeight(80)}>
                      80px
                    </button>
                    <button
                      onClick={() => this.setPivotHeaderHeight(undefined)}
                    >
                      undefined
                    </button>
                  </td>
                </tr>
                <tr id="requiresNotPivot">
                  <td>
                    floatingFiltersHeight (
                    <span id="floatingFiltersHeight">undefined</span>)
                  </td>
                  <td>
                    <button onClick={() => this.setFloatingFiltersHeight(35)}>
                      35px
                    </button>
                    <button onClick={() => this.setFloatingFiltersHeight(55)}>
                      55px
                    </button>
                    <button
                      onClick={() => this.setFloatingFiltersHeight(undefined)}
                    >
                      undefined
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

function setIdText(id, value) {
  document.getElementById(id).innerHTML =
    value == undefined ? 'undefined' : value + '';
}

render(<GridExample></GridExample>, document.querySelector('#root'));
