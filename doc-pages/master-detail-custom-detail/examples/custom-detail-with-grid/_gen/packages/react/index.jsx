'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import DetailCellRenderer from './detailCellRenderer.jsx';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        // group cell renderer needed for expand / collapse icons
        { field: 'name', cellRenderer: 'agGroupCellRenderer' },
        { field: 'account' },
        { field: 'calls' },
        { field: 'minutes', valueFormatter: "x.toLocaleString() + 'm'" },
      ],
      defaultColDef: {
        flex: 1,
      },
      detailRowHeight: 310,
      detailCellRenderer: DetailCellRenderer,
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      this.setState({ rowData: data });
    };

    fetch('https://www.ag-grid.com/example-assets/master-detail-data.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onFirstDataRendered = (params) => {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
      params.api.getDisplayedRowAtIndex(1).setExpanded(true);
    }, 0);
  };

  expandCollapseAll = () => {
    this.gridApi.forEachNode(function (node) {
      node.expanded = !!window.collapsed;
    });
    window.collapsed = !window.collapsed;
    this.gridApi.onGroupExpandedOrCollapsed();
  };

  printDetailGridInfo = () => {
    console.log("Currently registered detail grid's: ");
    this.gridApi.forEachDetailGridInfo(function (detailGridInfo) {
      console.log(detailGridInfo);
    });
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: '5px' }}>
            <button onClick={() => this.printDetailGridInfo()}>
              Print Detail Grid Info
            </button>
            <button onClick={() => this.expandCollapseAll()}>
              Toggle Expand / Collapse
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
              masterDetail={true}
              detailRowHeight={this.state.detailRowHeight}
              detailCellRenderer={this.state.detailCellRenderer}
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

render(<GridExample></GridExample>, document.querySelector('#root'));
