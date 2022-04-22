'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const formatNumber = (number) => {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

const createRowData = () => {
  var rowData = [];
  for (var i = 0; i < 20; i++) {
    rowData.push({
      a: Math.floor(((i + 323) * 25435) % 10000),
      b: Math.floor(((i + 323) * 23221) % 10000),
      c: Math.floor(((i + 323) * 468276) % 10000),
      d: 0,
      e: 0,
      f: 0,
    });
  }
  return rowData;
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState(createRowData());
  const [columnDefs, setColumnDefs] = useState([
    { field: 'a' },
    { field: 'b' },
    { field: 'c' },
    { field: 'd' },
    { field: 'e' },
    { field: 'f' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      cellClass: 'align-right',
      enableCellChangeFlash: true,
      resizable: true,
      valueFormatter: (params) => {
        return formatNumber(params.value);
      },
    };
  }, []);

  const onUpdateSomeValues = useCallback(() => {
    var rowCount = gridRef.current.api.getDisplayedRowCount();
    // pick 20 cells at random to update
    for (var i = 0; i < 20; i++) {
      var row = Math.floor(Math.random() * rowCount);
      var rowNode = gridRef.current.api.getDisplayedRowAtIndex(row);
      var col = ['a', 'b', 'c', 'd', 'e', 'f'][i % 6];
      rowNode.setDataValue(col, Math.floor(Math.random() * 10000));
    }
  }, []);

  const onFlashOneCell = useCallback(() => {
    // pick fourth row at random
    var rowNode = gridRef.current.api.getDisplayedRowAtIndex(4);
    // pick 'c' column
    gridRef.current.api.flashCells({ rowNodes: [rowNode], columns: ['c'] });
  }, []);

  const onFlashTwoColumns = useCallback(() => {
    // flash whole column, so leave row selection out
    gridRef.current.api.flashCells({ columns: ['c', 'd'] });
  }, []);

  const onFlashTwoRows = useCallback(() => {
    // pick fourth and fifth row at random
    var rowNode1 = gridRef.current.api.getDisplayedRowAtIndex(4);
    var rowNode2 = gridRef.current.api.getDisplayedRowAtIndex(5);
    // flash whole row, so leave column selection out
    gridRef.current.api.flashCells({ rowNodes: [rowNode1, rowNode2] });
  }, []);

  return (
    <div style={containerStyle}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '4px' }}>
          <button onClick={onUpdateSomeValues}>Update Some Data</button>
          <button onClick={onFlashOneCell} style={{ marginLeft: '15px' }}>
            Flash One Cell
          </button>
          <button onClick={onFlashTwoRows}>Flash Two Rows</button>
          <button onClick={onFlashTwoColumns}>Flash Two Columns</button>
        </div>
        <div style={{ flexGrow: '1' }}>
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
