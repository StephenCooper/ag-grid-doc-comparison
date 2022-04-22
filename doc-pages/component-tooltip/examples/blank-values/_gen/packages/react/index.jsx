'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import CustomTooltip from './customTooltip.jsx';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: 'Athlete Col 1',
          field: 'athlete',
          minWidth: 150,
          tooltipField: 'athlete',
        },
        {
          headerName: 'Athlete Col 2',
          field: 'athlete',
          minWidth: 150,
          tooltipComponent: CustomTooltip,
          tooltipValueGetter: toolTipValueGetter,
        },
        { field: 'sport', width: 110 },
        { field: 'gold', width: 100 },
        { field: 'silver', width: 100 },
        { field: 'bronze', width: 100 },
        { field: 'total', width: 100 },
      ],
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
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

  onFirstDataRendered = (params) => {
    params.api.getDisplayedRowAtIndex(0).data.athlete = undefined;
    params.api.getDisplayedRowAtIndex(1).data.athlete = null;
    params.api.getDisplayedRowAtIndex(2).data.athlete = '';
    params.api.refreshCells();
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
            onFirstDataRendered={this.onFirstDataRendered.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const toolTipValueGetter = (params) => ({ value: params.value });

render(<GridExample></GridExample>, document.querySelector('#root'));
