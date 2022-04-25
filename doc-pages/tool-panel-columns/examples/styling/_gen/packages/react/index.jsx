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
          field: 'athlete',
          minWidth: 200,
          enableRowGroup: true,
          enablePivot: true,
        },
        {
          field: 'age',
          enableValue: true,
        },
        {
          field: 'country',
          minWidth: 200,
          enableRowGroup: true,
          enablePivot: true,
          headerValueGetter: countryHeaderValueGetter,
        },
        {
          field: 'year',
          enableRowGroup: true,
          enablePivot: true,
        },
        {
          field: 'date',
          minWidth: 180,
          enableRowGroup: true,
          enablePivot: true,
        },
        {
          field: 'sport',
          minWidth: 200,
          enableRowGroup: true,
          enablePivot: true,
        },
        {
          field: 'gold',
          hide: true,
          enableValue: true,
          toolPanelClass: 'tp-gold',
        },
        {
          field: 'silver',
          hide: true,
          enableValue: true,
          toolPanelClass: ['tp-silver'],
        },
        {
          field: 'bronze',
          hide: true,
          enableValue: true,
          toolPanelClass: (params) => {
            return 'tp-bronze';
          },
        },
        {
          headerName: 'Total',
          field: 'totalAgg',
          valueGetter:
            'node.group ? data.totalAgg : data.gold + data.silver + data.bronze',
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: true,
        filter: true,
      },
      sideBar: 'columns',
      rowGroupPanelShow: 'always',
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
            sideBar={this.state.sideBar}
            rowGroupPanelShow={this.state.rowGroupPanelShow}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

function countryHeaderValueGetter(params) {
  switch (params.location) {
    case 'csv':
      return 'CSV Country';
    case 'clipboard':
      return 'CLIP Country';
    case 'columnToolPanel':
      return 'TP Country';
    case 'columnDrop':
      return 'CD Country';
    case 'header':
      return 'H Country';
    default:
      return 'Should never happen!';
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
