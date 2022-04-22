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
          headerName: 'Country (Complex Object)',
          field: 'country',
          keyCreator: countryKeyCreator,
          valueFormatter: countryValueFormatter,
          filter: 'agSetColumnFilter',
        },
      ],
      defaultColDef: {
        flex: 1,
        floatingFilter: true,
      },
      sideBar: 'filters',
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      // hack the data, replace each country with an object of country name and code
      data.forEach(function (row) {
        var countryName = row.country;
        var countryCode = countryName.substring(0, 2).toUpperCase();
        row.country = {
          name: countryName,
          code: countryCode,
        };
      });
      this.setState({ rowData: data });
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onFirstDataRendered = (params) => {
    params.api.getToolPanelInstance('filters').expandFilters();
  };

  printFilterModel = () => {
    var filterModel = this.gridApi.getFilterModel();
    console.log(filterModel);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: '5px' }}>
            <button onClick={() => this.printFilterModel()}>
              Print Filter Model
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
              onGridReady={this.onGridReady}
              onFirstDataRendered={this.onFirstDataRendered.bind(this)}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

function countryKeyCreator(params) {
  var countryObject = params.value;
  return countryObject.name;
}
function countryValueFormatter(params) {
  return params.value.name;
}

render(<GridExample></GridExample>, document.querySelector('#root'));
