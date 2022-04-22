'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

var callCount = 1;

var totalValueGetter = function (params) {
  var q1 = params.getValue('q1');
  var q2 = params.getValue('q2');
  var q3 = params.getValue('q3');
  var q4 = params.getValue('q4');
  var result = q1 + q2 + q3 + q4;
  console.log(
    `Total Value Getter (${callCount}, ${params.column.getId()}): ${[
      q1,
      q2,
      q3,
      q4,
    ].join(', ')} = ${result}`
  );
  callCount++;
  return result;
};

var total10ValueGetter = function (params) {
  var total = params.getValue('total');
  return total * 10;
};

const formatNumber = (params) => {
  var number = params.value;
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    { field: 'q1', type: 'quarterFigure' },
    { field: 'q2', type: 'quarterFigure' },
    { field: 'q3', type: 'quarterFigure' },
    { field: 'q4', type: 'quarterFigure' },
    { field: 'year', rowGroup: true, hide: true },
    {
      headerName: 'Total',
      colId: 'total',
      cellClass: ['number-cell', 'total-col'],
      aggFunc: 'sum',
      valueFormatter: formatNumber,
      valueGetter: totalValueGetter,
    },
    {
      headerName: 'Total x 10',
      cellClass: ['number-cell', 'total-col'],
      aggFunc: 'sum',
      minWidth: 120,
      valueFormatter: formatNumber,
      valueGetter: total10ValueGetter,
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 130,
    };
  }, []);
  const columnTypes = useMemo(() => {
    return {
      quarterFigure: {
        editable: true,
        cellClass: 'number-cell',
        aggFunc: 'sum',
        valueFormatter: formatNumber,
        valueParser: function numberParser(params) {
          return Number(params.newValue);
        },
      },
    };
  }, []);
  const getRowId = useCallback(function (params) {
    return params.data.id;
  }, []);

  const onExpireValueCache = useCallback(() => {
    console.log('onInvalidateValueCache -> start');
    gridRef.current.api.expireValueCache();
    console.log('onInvalidateValueCache -> end');
  }, []);

  const onRefreshCells = useCallback(() => {
    console.log('onRefreshCells -> start');
    gridRef.current.api.refreshCells();
    console.log('onRefreshCells -> end');
  }, []);

  const onUpdateOneValue = useCallback(() => {
    var randomId = Math.floor(Math.random() * 10) + '';
    var rowNode = gridRef.current.api.getRowNode(randomId);
    if (rowNode) {
      var randomCol = ['q1', 'q2', 'q3', 'q4'][Math.floor(Math.random() * 4)];
      var newValue = Math.floor(Math.random() * 1000);
      console.log('onUpdateOneValue -> start');
      rowNode.setDataValue(randomCol, newValue);
      console.log('onUpdateOneValue -> end');
    }
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <button onClick={onExpireValueCache}>Invalidate Value Cache</button>
          <button onClick={onRefreshCells}>Refresh Cells</button>
          <button onClick={onUpdateOneValue}>Update One Value</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine-dark">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            columnTypes={columnTypes}
            suppressAggFuncInHeader={true}
            enableCellChangeFlash={true}
            enableRangeSelection={true}
            groupDefaultExpanded={1}
            valueCache={true}
            getRowId={getRowId}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
