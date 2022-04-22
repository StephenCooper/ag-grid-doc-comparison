'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  GetRowIdFunc,
  GetRowIdParams,
  Grid,
  GridOptions,
  GridReadyEvent,
  ValueFormatterParams,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

declare function createMockServer(): any;

function numberFormatter(params: ValueFormatterParams) {
  if (typeof params.value === 'number') {
    return params.value.toFixed(2);
  }
  return params.value;
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'code', maxWidth: 90 },
    { field: 'name', minWidth: 200 },
    {
      field: 'bid',
      cellClass: 'cell-number',
      valueFormatter: numberFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      field: 'mid',
      cellClass: 'cell-number',
      valueFormatter: numberFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      field: 'ask',
      cellClass: 'cell-number',
      valueFormatter: numberFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      field: 'volume',
      cellClass: 'cell-number',
      cellRenderer: 'agAnimateSlideCellRenderer',
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
  }, []);
  const getRowId = useCallback(function (params: GetRowIdParams) {
    return params.data.code;
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    var mockServer = createMockServer(),
      initialLoad$ = mockServer.initialLoad(),
      updates$ = mockServer.byRowupdates();
    initialLoad$.subscribe(function (rowData: any[]) {
      // the initial full set of data
      // note that we don't need to un-subscribe here as it's a one off data load
      params.api.setRowData(rowData);
      // now listen for updates
      // we process the updates with a transaction - this ensures that only the changes
      // rows will get re-rendered, improving performance
      updates$.subscribe(function (updates: any[]) {
        return params.api.applyTransaction({ update: updates });
      });
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection={true}
          getRowId={getRowId}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
