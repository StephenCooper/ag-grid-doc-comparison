'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import FullWidthCellRenderer from './fullWidthCellRenderer.jsx';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'name', cellRenderer: countryCellRenderer },
        { field: 'continent' },
        { field: 'language' },
      ],
      defaultColDef: {
        flex: 1,
        sortable: true,
        resizable: true,
        filter: true,
      },
      rowData: getData(),
      getRowHeight: function (params) {
        // return 100px height for full width rows
        if (isFullWidth(params.data)) {
          return 100;
        }
      },
      isFullWidthRow: function (params) {
        return isFullWidth(params.rowNode.data);
      },
      fullWidthCellRenderer: FullWidthCellRenderer,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
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
            rowDragManaged={true}
            getRowHeight={this.state.getRowHeight}
            isFullWidthRow={this.state.isFullWidthRow}
            fullWidthCellRenderer={this.state.fullWidthCellRenderer}
            animateRows={true}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

function countryCellRenderer(params) {
  if (!params.fullWidth) {
    return params.value;
  }
  var flag =
    '<img border="0" width="15" height="10" src="https://www.ag-grid.com/example-assets/flags/' +
    params.data.code +
    '.png">';
  return (
    '<span style="cursor: default;">' + flag + ' ' + params.value + '</span>'
  );
}
function isFullWidth(data) {
  // return true when country is Peru, France or Italy
  return ['Peru', 'France', 'Italy'].indexOf(data.name) >= 0;
}

render(<GridExample></GridExample>, document.querySelector('#root'));
