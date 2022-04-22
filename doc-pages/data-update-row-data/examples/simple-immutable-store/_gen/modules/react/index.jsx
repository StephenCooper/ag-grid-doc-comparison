'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { headerName: 'Symbol', field: 'symbol' },
        { headerName: 'Price', field: 'price' },
        { headerName: 'Group', field: 'group' },
      ],
      defaultColDef: {
        width: 250,
        sortable: true,
        resizable: true,
      },
      rowSelection: 'multiple',
      autoGroupColumnDef: {
        headerName: 'Symbol',
        cellRenderer: 'agGroupCellRenderer',
        field: 'symbol',
      },
      statusBar: {
        statusPanels: [
          { statusPanel: 'agAggregationComponent', align: 'right' },
        ],
      },
      groupDefaultExpanded: 1,
      rowData: immutableStore,
      getRowId: function (params) {
        return params.data.symbol;
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    immutableStore = [];
    immutableStore = getInitialData();
    params.api.setRowData(immutableStore);
    setGroupingEnabled(false, params.columnApi);
  };

  addFiveItems = (append) => {
    const newStore = immutableStore.slice();
    for (let i = 0; i < 5; i++) {
      const newItem = createItem();
      if (append) {
        newStore.push(newItem);
      } else {
        newStore.splice(0, 0, newItem);
      }
    }
    immutableStore = newStore;
    this.gridApi.setRowData(immutableStore);
  };

  removeSelected = () => {
    const selectedRowNodes = this.gridApi.getSelectedNodes();
    const selectedIds = selectedRowNodes.map(function (rowNode) {
      return rowNode.id;
    });
    immutableStore = immutableStore.filter(function (dataItem) {
      return selectedIds.indexOf(dataItem.symbol) < 0;
    });
    this.gridApi.setRowData(immutableStore);
  };

  setSelectedToGroup = (newGroup) => {
    const selectedRowNodes = this.gridApi.getSelectedNodes();
    const selectedIds = selectedRowNodes.map(function (rowNode) {
      return rowNode.id;
    });
    immutableStore = immutableStore.map(function (dataItem) {
      const itemSelected = selectedIds.indexOf(dataItem.symbol) >= 0;
      if (itemSelected) {
        return {
          // symbol and price stay the same
          symbol: dataItem.symbol,
          price: dataItem.price,
          // group gets the group
          group: newGroup,
        };
      } else {
        return dataItem;
      }
    });
    this.gridApi.setRowData(immutableStore);
  };

  updatePrices = () => {
    const newStore = [];
    immutableStore.forEach(function (item) {
      newStore.push({
        // use same symbol as last time, this is the unique id
        symbol: item.symbol,
        // group also stays the same
        group: item.group,
        // add random price
        price: Math.floor(Math.random() * 100),
      });
    });
    immutableStore = newStore;
    this.gridApi.setRowData(immutableStore);
  };

  onGroupingEnabled = (enabled) => {
    setGroupingEnabled(enabled, this.gridColumnApi);
  };

  reverseItems = () => {
    immutableStore.reverse();
    this.gridApi.setRowData(immutableStore);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ marginBottom: '5px', minHeight: '30px' }}>
            <button onClick={() => this.reverseItems()}>Reverse</button>
            <button onClick={() => this.addFiveItems(true)}>Append</button>
            <button onClick={() => this.addFiveItems(false)}>Prepend</button>
            <button onClick={() => this.removeSelected()}>
              Remove Selected
            </button>
            <button onClick={() => this.updatePrices()}>Update Prices</button>

            <button
              id="groupingOn"
              onClick={() => this.onGroupingEnabled(true)}
            >
              Grouping On
            </button>
            <button
              id="groupingOff"
              onClick={() => this.onGroupingEnabled(false)}
            >
              Grouping Off
            </button>
            <span
              style={{
                border: '1px solid lightgrey',
                marginLeft: '20px',
                padding: '8px',
                whiteSpace: 'nowrap',
                display: 'inline-block',
              }}
            >
              Move to Group:
              <button onClick={() => this.setSelectedToGroup('A')}>A</button>
              <button onClick={() => this.setSelectedToGroup('B')}>B</button>
              <button onClick={() => this.setSelectedToGroup('C')}>C</button>
            </span>
          </div>
          <div style={{ flex: '1 1 0px' }}>
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
                animateRows={true}
                rowSelection={this.state.rowSelection}
                autoGroupColumnDef={this.state.autoGroupColumnDef}
                statusBar={this.state.statusBar}
                groupDefaultExpanded={this.state.groupDefaultExpanded}
                rowData={this.state.rowData}
                getRowId={this.state.getRowId}
                onGridReady={this.onGridReady}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function getInitialData() {
  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push(createItem());
  }
  return data;
}
let immutableStore = [];
function filter(list, callback) {
  const filteredList = [];
  list.forEach(function (item) {
    if (callback(item)) {
      filteredList.push(item);
    }
  });
  return filteredList;
}
function createItem() {
  const item = {
    group: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
    symbol: createUniqueRandomSymbol(),
    price: Math.floor(Math.random() * 100),
  };
  return item;
}
function setGroupingEnabled(enabled, columnApi) {
  if (enabled) {
    columnApi.applyColumnState({
      state: [
        { colId: 'group', rowGroup: true, hide: true },
        { colId: 'symbol', hide: true },
      ],
    });
  } else {
    columnApi.applyColumnState({
      state: [
        { colId: 'group', rowGroup: false, hide: false },
        { colId: 'symbol', hide: false },
      ],
    });
  }
  setItemVisible('groupingOn', !enabled);
  setItemVisible('groupingOff', enabled);
}
function setItemVisible(id, visible) {
  const element = document.querySelector('#' + id);
  element.style.display = visible ? 'inline' : 'none';
}
// creates a unique symbol, eg 'ADG' or 'ZJD'
function createUniqueRandomSymbol() {
  let symbol;
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let isUnique = false;
  while (!isUnique) {
    symbol = '';
    // create symbol
    for (let i = 0; i < 3; i++) {
      symbol += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    // check uniqueness
    isUnique = true;
    immutableStore.forEach(function (oldItem) {
      if (oldItem.symbol === symbol) {
        isUnique = false;
      }
    });
  }
  return symbol;
}

render(<GridExample></GridExample>, document.querySelector('#root'));
