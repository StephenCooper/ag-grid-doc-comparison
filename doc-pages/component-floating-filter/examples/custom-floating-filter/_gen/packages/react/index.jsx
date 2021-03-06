'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import NumberFloatingFilterComponent from './numberFloatingFilterComponent.jsx';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'athlete', filter: false },
        {
          field: 'gold',
          filter: 'agNumberColumnFilter',
          suppressMenu: true,
          floatingFilterComponent: NumberFloatingFilterComponent,
          floatingFilterComponentParams: {
            suppressFilterButton: true,
            color: 'red',
          },
        },
        {
          field: 'silver',
          filter: 'agNumberColumnFilter',
          suppressMenu: true,
          floatingFilterComponent: NumberFloatingFilterComponent,
          floatingFilterComponentParams: {
            suppressFilterButton: true,
            color: 'blue',
          },
        },
        {
          field: 'bronze',
          filter: 'agNumberColumnFilter',
          suppressMenu: true,
          floatingFilterComponent: NumberFloatingFilterComponent,
          floatingFilterComponentParams: {
            suppressFilterButton: true,
            color: 'green',
          },
        },
        {
          field: 'total',
          filter: 'agNumberColumnFilter',
          suppressMenu: true,
          floatingFilterComponent: NumberFloatingFilterComponent,
          floatingFilterComponentParams: {
            suppressFilterButton: true,
            color: 'orange',
          },
        },
      ],
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      this.setState({ rowData: data });
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
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
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
