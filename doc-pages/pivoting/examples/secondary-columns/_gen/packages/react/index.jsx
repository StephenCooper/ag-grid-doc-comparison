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
        { field: 'country', rowGroup: true, enableRowGroup: true },
        {
          field: 'year',
          pivot: true,
          enablePivot: true,
          pivotComparator: MyYearPivotComparator,
        },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold', aggFunc: 'sum' },
        { field: 'silver', aggFunc: 'sum' },
        { field: 'bronze', aggFunc: 'sum' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
        resizable: true,
      },
      autoGroupColumnDef: {
        minWidth: 250,
      },
      processSecondaryColDef: (colDef) => {
        if (
          _optionalChain([
            colDef,
            'access',
            (_) => _.pivotValueColumn,
            'optionalAccess',
            (_2) => _2.getId,
            'call',
            (_3) => _3(),
          ]) === 'gold'
        ) {
          colDef.headerName = _optionalChain([
            colDef,
            'access',
            (_4) => _4.headerName,
            'optionalAccess',
            (_5) => _5.toUpperCase,
            'call',
            (_6) => _6(),
          ]);
        }
      },
      processSecondaryColGroupDef: (colGroupDef) => {
        // for fun, add a css class for 2010
        if (
          _optionalChain([
            colGroupDef,
            'access',
            (_7) => _7.pivotKeys,
            'optionalAccess',
            (_8) => _8.length,
          ]) &&
          colGroupDef.pivotKeys[0] === '2010'
        ) {
          colGroupDef.headerClass = 'color-background';
        }
        // put 'year' in front of each group
        colGroupDef.headerName = 'Year ' + colGroupDef.headerName;
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
            autoGroupColumnDef={this.state.autoGroupColumnDef}
            pivotMode={true}
            suppressAggFuncInHeader={true}
            processSecondaryColDef={this.state.processSecondaryColDef}
            processSecondaryColGroupDef={this.state.processSecondaryColGroupDef}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

function _optionalChain(ops) {
  let lastAccessLHS = undefined;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) {
      return undefined;
    }
    if (op === 'access' || op === 'optionalAccess') {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === 'call' || op === 'optionalCall') {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = undefined;
    }
  }
  return value;
}
function MyYearPivotComparator(a, b) {
  var requiredOrder = ['2012', '2010', '2008', '2006', '2004', '2002', '2000'];
  return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
}

render(<GridExample></GridExample>, document.querySelector('#root'));
