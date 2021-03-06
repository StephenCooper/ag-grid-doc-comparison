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
          headerName: ' ',
          headerCheckboxSelection: true,
          checkboxSelection: true,
          floatingFilter: false,
          suppressMenu: true,
          minWidth: 55,
          maxWidth: 55,
          width: 55,
          flex: 0,
          resizable: false,
          sortable: false,
          editable: false,
          filter: false,
          suppressColumnsToolPanel: true,
        },
        {
          headerName: 'Participant',
          children: [
            { field: 'athlete', minWidth: 170 },
            { field: 'country', minWidth: 150 },
          ],
        },
        { field: 'sport' },
        {
          headerName: 'Medals',
          children: [
            {
              field: 'total',
              columnGroupShow: 'closed',
              filter: 'agNumberColumnFilter',
              width: 120,
              flex: 0,
            },
            {
              field: 'gold',
              columnGroupShow: 'open',
              filter: 'agNumberColumnFilter',
              width: 100,
              flex: 0,
            },
            {
              field: 'silver',
              columnGroupShow: 'open',
              filter: 'agNumberColumnFilter',
              width: 100,
              flex: 0,
            },
            {
              field: 'bronze',
              columnGroupShow: 'open',
              filter: 'agNumberColumnFilter',
              width: 100,
              flex: 0,
            },
          ],
        },
        { field: 'year', filter: 'agNumberColumnFilter' },
      ],
      rowData: null,
      rowSelection: 'multiple',
      defaultColDef: {
        editable: true,
        sortable: true,
        minWidth: 100,
        filter: true,
        resizable: true,
        floatingFilter: true,
        flex: 1,
      },
      sideBar: {
        toolPanels: ['columns', 'filters'],
        defaultToolPanel: '',
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
            rowData={this.state.rowData}
            rowSelection={this.state.rowSelection}
            suppressRowClickSelection={true}
            defaultColDef={this.state.defaultColDef}
            sideBar={this.state.sideBar}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
