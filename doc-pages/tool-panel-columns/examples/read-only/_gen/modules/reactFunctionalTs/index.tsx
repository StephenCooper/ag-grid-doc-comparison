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
  GridReadyEvent,
  SideBarDef,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: 'athlete',
      minWidth: 200,
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'age',
      enableValue: true,
    },
    {
      field: 'country',
      minWidth: 200,
      enableRowGroup: true,
      enablePivot: true,
      rowGroupIndex: 1,
    },
    {
      field: 'year',
      enableRowGroup: true,
      enablePivot: true,
      pivotIndex: 1,
    },
    {
      field: 'date',
      minWidth: 180,
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'sport',
      minWidth: 200,
      enableRowGroup: true,
      enablePivot: true,
      rowGroupIndex: 2,
    },
    {
      field: 'gold',
      hide: true,
      enableValue: true,
    },
    {
      field: 'silver',
      hide: true,
      enableValue: true,
      aggFunc: 'sum',
    },
    {
      field: 'bronze',
      hide: true,
      enableValue: true,
      aggFunc: 'sum',
    },
    {
      headerName: 'Total',
      field: 'totalAgg',
      valueGetter:
        'node.group ? data.totalAgg : data.gold + data.silver + data.bronze',
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 150,
      sortable: true,
      resizable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      minWidth: 250,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => setRowData(data));

    (document.getElementById('read-only') as HTMLInputElement).checked = true;
  }, []);

  const setReadOnly = useCallback(() => {
    gridRef.current!.api.setFunctionsReadOnly(
      (document.getElementById('read-only') as HTMLInputElement).checked
    );
  }, []);

  return (
    <div style={containerStyle}>
      <div className="test-container">
        <div className="test-header">
          <label>
            <input type="checkbox" id="read-only" onChange={setReadOnly} />{' '}
            Functions Read Only
          </label>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            pivotMode={true}
            sideBar={'columns'}
            rowGroupPanelShow={'always'}
            pivotPanelShow={'always'}
            functionsReadOnly={true}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
