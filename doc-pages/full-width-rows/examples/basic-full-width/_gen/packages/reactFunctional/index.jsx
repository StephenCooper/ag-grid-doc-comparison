'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import FullWidthCellRenderer from './fullWidthCellRenderer.jsx';

const getColumnDefs = () => {
  const columnDefs = [];
  alphabet().forEach(function (letter) {
    const colDef = {
      headerName: letter,
      field: letter,
      width: 150,
    };
    if (letter === 'A') {
      colDef.pinned = 'left';
    }
    if (letter === 'Z') {
      colDef.pinned = 'right';
    }
    columnDefs.push(colDef);
  });
  return columnDefs;
};

const alphabet = () => {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
};

const createData = (count, prefix) => {
  const rowData = [];
  for (let i = 0; i < count; i++) {
    const item = {};
    // mark every third row as full width. how you mark the row is up to you,
    // in this example the example code (not the grid code) looks at the
    // fullWidth attribute in the isFullWidthRow() callback. how you determine
    // if a row is full width or not is totally up to you.
    item.fullWidth = i % 3 === 2;
    // put in a column for each letter of the alphabet
    alphabet().forEach(function (letter) {
      item[letter] = prefix + ' (' + letter + ',' + i + ')';
    });
    rowData.push(item);
  }
  return rowData;
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState(createData(100, 'body'));
  const pinnedTopRowData = useMemo(() => {
    return createData(3, 'pinned');
  }, []);
  const pinnedBottomRowData = useMemo(() => {
    return createData(3, 'pinned');
  }, []);
  const [columnDefs, setColumnDefs] = useState(getColumnDefs());
  const isFullWidthRow = useCallback(function (params) {
    // in this example, we check the fullWidth attribute that we set
    // while creating the data. what check you do to decide if you
    // want a row full width is up to you, as long as you return a boolean
    // for this method.
    return params.rowNode.data.fullWidth;
  }, []);
  const fullWidthCellRenderer = useMemo(() => {
    return FullWidthCellRenderer;
  }, []);
  const getRowHeight = useCallback(function (params) {
    // you can have normal rows and full width rows any height that you want
    const isBodyRow = params.node.rowPinned === undefined;
    const isFullWidth = params.node.data.fullWidth;
    if (isBodyRow && isFullWidth) {
      return 75;
    }
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          pinnedTopRowData={pinnedTopRowData}
          pinnedBottomRowData={pinnedBottomRowData}
          columnDefs={columnDefs}
          isFullWidthRow={isFullWidthRow}
          fullWidthCellRenderer={fullWidthCellRenderer}
          getRowHeight={getRowHeight}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
