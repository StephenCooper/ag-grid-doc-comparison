'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  IsFullWidthRowParams,
  RowHeightParams,
} from '@ag-grid-community/core';
import FullWidthCellRenderer from './fullWidthCellRenderer';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

function getColumnDefs() {
  const columnDefs: ColDef[] = [];
  alphabet().forEach(function (letter) {
    const colDef: ColDef = {
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
}

function alphabet() {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
}

function createData(count: number, prefix: string) {
  const rowData = [];
  for (let i = 0; i < count; i++) {
    const item: any = {};
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
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(createData(100, 'body'));
  const pinnedTopRowData = useMemo<any[]>(() => {
    return createData(3, 'pinned');
  }, []);
  const pinnedBottomRowData = useMemo<any[]>(() => {
    return createData(3, 'pinned');
  }, []);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>(getColumnDefs());
  const isFullWidthRow = useCallback((params: IsFullWidthRowParams) => {
    // in this example, we check the fullWidth attribute that we set
    // while creating the data. what check you do to decide if you
    // want a row full width is up to you, as long as you return a boolean
    // for this method.
    return params.rowNode.data.fullWidth;
  }, []);
  const fullWidthCellRenderer = useMemo<any>(() => {
    return FullWidthCellRenderer;
  }, []);
  const getRowHeight = useCallback((params: RowHeightParams) => {
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
