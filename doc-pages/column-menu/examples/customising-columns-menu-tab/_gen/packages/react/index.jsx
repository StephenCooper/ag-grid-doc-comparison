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
          groupId: 'athleteGroupId',
          headerName: 'Athlete',
          children: [
            {
              headerName: 'Name',
              field: 'athlete',
              minWidth: 200,
              columnsMenuParams: {
                // hides the Column Filter section
                suppressColumnFilter: true,
                // hides the Select / Un-select all widget
                suppressColumnSelectAll: true,
                // hides the Expand / Collapse all widget
                suppressColumnExpandAll: true,
              },
            },
            {
              field: 'age',
              minWidth: 200,
              columnsMenuParams: {
                // contracts all column groups
                contractColumnSelection: true,
              },
            },
          ],
        },
        {
          groupId: 'medalsGroupId',
          headerName: 'Medals',
          children: [
            { field: 'gold' },
            { field: 'silver' },
            { field: 'bronze' },
          ],
        },
      ],
      defaultColDef: {
        flex: 1,
        resizable: true,
        menuTabs: ['columnsMenuTab'],
        columnsMenuParams: {
          // suppresses updating the layout of columns as they are rearranged in the grid
          suppressSyncLayoutWithGrid: true,
        },
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
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
