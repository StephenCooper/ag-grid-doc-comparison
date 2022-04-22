'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        // simple column, easy to understand
        { field: 'name' },
        // the grid works with embedded fields
        { headerName: 'Age', field: 'person.age' },
        // or use value getter, all works with quick filter
        { headerName: 'Country', valueGetter: 'data.person.country' },
        // or use the object value, so value passed around is an object
        {
          headerName: 'Results',
          field: 'medals',
          cellRenderer: MedalRenderer,
          // this is needed to avoid toString=[object,object] result with objects
          getQuickFilterText: function (params) {
            return getMedalString(params.value);
          },
        },
      ],
      defaultColDef: {
        flex: 1,
        editable: true,
      },
      rowData: getData(),
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onFilterTextBoxChanged = () => {
    this.gridApi.setQuickFilter(
      document.getElementById('filter-text-box').value
    );
  };

  onPrintQuickFilterTexts = () => {
    this.gridApi.forEachNode(function (rowNode, index) {
      console.log(
        'Row ' +
          index +
          ' quick filter text is ' +
          rowNode.quickFilterAggregateText
      );
    });
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div className="example-header">
            <input
              type="text"
              id="filter-text-box"
              placeholder="Filter..."
              onInput={() => this.onFilterTextBoxChanged()}
            />
            <button
              style={{ marginLeft: '20px' }}
              onClick={() => this.onPrintQuickFilterTexts()}
            >
              Print Quick Filter Cache Texts
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
              rowData={this.state.rowData}
              cacheQuickFilter={true}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

const getMedalString = function ({ gold, silver, bronze }) {
  const goldStr = gold > 0 ? `Gold: ${gold} ` : '';
  const silverStr = silver > 0 ? `Silver: ${silver} ` : '';
  const bronzeStr = bronze > 0 ? `Bronze: ${bronze}` : '';
  return goldStr + silverStr + bronzeStr;
};
const MedalRenderer = function (params) {
  return getMedalString(params.value);
};

render(<GridExample></GridExample>, document.querySelector('#root'));
