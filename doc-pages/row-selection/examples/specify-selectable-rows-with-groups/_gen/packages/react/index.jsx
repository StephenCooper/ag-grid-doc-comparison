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
        { field: 'country', rowGroup: true, hide: true },
        { field: 'year', maxWidth: 100 },
        { field: 'gold', aggFunc: 'sum' },
        { field: 'silver', aggFunc: 'sum' },
        { field: 'bronze', aggFunc: 'sum' },
        { field: 'date' },
        { field: 'sport' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        sortable: true,
        filter: true,
      },
      autoGroupColumnDef: {
        headerName: 'Athlete',
        field: 'athlete',
        minWidth: 250,
        cellRenderer: 'agGroupCellRenderer',
        cellRendererParams: {
          checkbox: true,
        },
      },
      rowSelection: 'multiple',
      groupDefaultExpanded: -1,
      isRowSelectable: function (node) {
        return node.data
          ? node.data.year === 2008 || node.data.year === 2004
          : false;
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

  filterBy2004 = () => {
    this.gridApi.setFilterModel({
      year: {
        type: 'set',
        values: ['2008', '2012'],
      },
    });
  };

  clearFilter = () => {
    this.gridApi.setFilterModel(null);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <div style={{ paddingBottom: '1rem' }}>
            <button onClick={() => this.filterBy2004()}>
              Filter by Year 2008 &amp; 2012
            </button>
            <button onClick={() => this.clearFilter()}>Clear Filter</button>
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
              autoGroupColumnDef={this.state.autoGroupColumnDef}
              rowSelection={this.state.rowSelection}
              groupSelectsChildren={true}
              groupSelectsFiltered={true}
              suppressRowClickSelection={true}
              groupDefaultExpanded={this.state.groupDefaultExpanded}
              isRowSelectable={this.state.isRowSelectable}
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
