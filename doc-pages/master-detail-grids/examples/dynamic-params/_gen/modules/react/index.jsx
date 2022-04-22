'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MasterDetailModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

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
      detailRowHeight: 195,
      detailCellRendererParams: function (params) {
        var res = {};
        // we use the same getDetailRowData for both options
        res.getDetailRowData = function (params) {
          params.successCallback(params.data.callRecords);
        };
        var nameMatch =
          params.data.name === 'Mila Smith' ||
          params.data.name === 'Harper Johnson';
        if (nameMatch) {
          // grid options for columns {callId, number}
          res.detailGridOptions = {
            columnDefs: [{ field: 'callId' }, { field: 'number' }],
            defaultColDef: {
              flex: 1,
            },
          };
        } else {
          // grid options for columns {callId, direction, duration, switchCode}
          res.detailGridOptions = {
            columnDefs: [
              { field: 'callId' },
              { field: 'direction' },
              { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
              { field: 'switchCode' },
            ],
            defaultColDef: {
              flex: 1,
            },
          };
        }
        return res;
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

    fetch('https://www.ag-grid.com/example-assets/master-detail-data.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onFirstDataRendered = (params) => {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
      var node1 = params.api.getDisplayedRowAtIndex(1);
      var node2 = params.api.getDisplayedRowAtIndex(2);
      node1.setExpanded(true);
      node2.setExpanded(true);
    }, 0);
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
            masterDetail={true}
            detailRowHeight={this.state.detailRowHeight}
            detailCellRendererParams={this.state.detailCellRendererParams}
            onGridReady={this.onGridReady}
            onFirstDataRendered={this.onFirstDataRendered.bind(this)}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
