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
          colId: 'array',
          headerName: 'Values Array',
          field: 'animal',
          filter: 'agSetColumnFilter',
          filterParams: arrayFilterParams,
        },
        {
          colId: 'callback',
          headerName: 'Values Callback',
          field: 'animal',
          filter: 'agSetColumnFilter',
          filterParams: callbackFilterParams,
        },
      ],
      defaultColDef: {
        flex: 1,
        filter: true,
        resizable: true,
      },
      sideBar: 'filters',
      rowData: getData(),
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onFirstDataRendered = (params) => {
    params.api.getToolPanelInstance('filters').expandFilters();
  };

  useList1 = () => {
    console.log('Updating values to ' + list1);
    valuesArray.length = 0;
    list1.forEach(function (value) {
      valuesArray.push(value);
    });
    var filter = this.gridApi.getFilterInstance('array');
    filter.refreshFilterValues();
    valuesCallbackList = list1;
  };

  useList2 = () => {
    console.log('Updating values to ' + list2);
    valuesArray.length = 0;
    list2.forEach(function (value) {
      valuesArray.push(value);
    });
    var filter = this.gridApi.getFilterInstance('array');
    filter.refreshFilterValues();
    valuesCallbackList = list2;
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div id="container">
          <div id="header">
            <button onClick={() => this.useList1()}>
              Use <code>['Elephant', 'Lion', 'Monkey']</code>
            </button>
            <button onClick={() => this.useList2()}>
              Use <code>['Elephant', 'Giraffe', 'Tiger']</code>
            </button>
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
              sideBar={this.state.sideBar}
              rowData={this.state.rowData}
              onGridReady={this.onGridReady}
              onFirstDataRendered={this.onFirstDataRendered.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

var list1 = ['Elephant', 'Lion', 'Monkey'];
var list2 = ['Elephant', 'Giraffe', 'Tiger'];
var valuesArray = list1.slice();
var valuesCallbackList = list1;
function valuesCallback(params) {
  setTimeout(function () {
    params.success(valuesCallbackList);
  }, 1000);
}
var arrayFilterParams = {
  values: valuesArray,
};
var callbackFilterParams = {
  values: valuesCallback,
  refreshValuesOnOpen: true,
};

render(<GridExample></GridExample>, document.querySelector('#root'));
