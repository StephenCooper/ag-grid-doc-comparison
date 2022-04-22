'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

var colorIndex = 0;

var colors = ['#000000', '#000066', '#006600', '#660000'];

const createData = (count) => {
  var result = [];
  for (var i = 1; i <= count; i++) {
    result.push({
      a: (i * 863) % 100,
      b: (i * 811) % 100,
      c: (i * 743) % 100,
      d: (i * 677) % 100,
      e: (i * 619) % 100,
      f: (i * 571) % 100,
    });
  }
  return result;
};

const progressColor = () => {
  colorIndex++;
  if (colorIndex === colors.length) {
    colorIndex = 0;
  }
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState(createData(12));
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'A', field: 'a' },
    { headerName: 'B', field: 'b' },
    { headerName: 'C', field: 'c' },
    { headerName: 'D', field: 'd' },
    { headerName: 'E', field: 'e' },
    { headerName: 'F', field: 'f' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
    };
  }, []);
  const getRowStyle = useCallback((params) => {
    return {
      backgroundColor: colors[colorIndex],
    };
  }, []);

  const redrawAllRows = useCallback(() => {
    progressColor();
    gridRef.current.api.redrawRows();
  }, []);

  const redrawTopRows = useCallback(() => {
    progressColor();
    var rows = [];
    for (var i = 0; i < 6; i++) {
      var row = gridRef.current.api.getDisplayedRowAtIndex(i);
      rows.push(row);
    }
    gridRef.current.api.redrawRows({ rowNodes: rows });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <button onClick={redrawAllRows}>Redraw All Rows</button>
          <button onClick={redrawTopRows}>Redraw Top Rows</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine-dark">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            getRowStyle={getRowStyle}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
