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
      isRowMaster: (dataItem) => {
        return dataItem ? dataItem.callRecords.length > 0 : false;
      },
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
      getRowId: (params) => {
        return params.data.account;
      },
      detailCellRendererParams: {
        detailGridOptions: {
          columnDefs: [
            { field: 'callId' },
            { field: 'direction' },
            { field: 'number', minWidth: 150 },
            { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
            { field: 'switchCode', minWidth: 150 },
          ],
          defaultColDef: {
            flex: 1,
          },
        },
        getDetailRowData: (params) => {
          params.successCallback(params.data.callRecords);
        },
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

    fetch(
      'https://www.ag-grid.com/example-assets/master-detail-dynamic-data.json'
    )
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onFirstDataRendered = (params) => {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
      params.api.getDisplayedRowAtIndex(1).setExpanded(true);
    }, 0);
  };

  onBtClearMilaCalls = () => {
    var milaSmithRowNode = this.gridApi.getRowNode('177001');
    var milaSmithData = milaSmithRowNode.data;
    milaSmithData.callRecords = [];
    this.gridApi.applyTransaction({ update: [milaSmithData] });
  };

  onBtSetMilaCalls = () => {
    var milaSmithRowNode = this.gridApi.getRowNode('177001');
    var milaSmithData = milaSmithRowNode.data;
    milaSmithData.callRecords = [
      {
        name: 'susan',
        callId: 579,
        duration: 23,
        switchCode: 'SW5',
        direction: 'Out',
        number: '(02) 47485405',
      },
      {
        name: 'susan',
        callId: 580,
        duration: 52,
        switchCode: 'SW3',
        direction: 'In',
        number: '(02) 32367069',
      },
    ];
    this.gridApi.applyTransaction({ update: [milaSmithData] });
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <div style={{ paddingBottom: '4px' }}>
            <button onClick={() => this.onBtClearMilaCalls()}>
              Clear Mila Calls
            </button>
            <button onClick={() => this.onBtSetMilaCalls()}>
              Set Mila Calls
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
              masterDetail={true}
              isRowMaster={this.state.isRowMaster}
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              getRowId={this.state.getRowId}
              detailCellRendererParams={this.state.detailCellRendererParams}
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
