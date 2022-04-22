'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  ColumnPinnedEvent,
  ColumnState,
  Grid,
  GridOptions,
  GridReadyEvent,
} from '@ag-grid-community/core';
import ControlsCellRenderer from './controlsCellRenderer';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      lockPosition: 'left',
      valueGetter: 'node.rowIndex',
      cellClass: 'locked-col',
      width: 60,
      suppressNavigable: true,
    },
    {
      lockPosition: 'left',
      cellRenderer: ControlsCellRenderer,
      cellClass: 'locked-col',
      width: 120,
      suppressNavigable: true,
    },
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      width: 150,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => setRowData(data));
  }, []);

  const onColumnPinned = useCallback((event: ColumnPinnedEvent) => {
    const allCols = event.columnApi.getAllGridColumns();
    const allFixedCols = allCols.filter((col) => col.getColDef().lockPosition);
    const allNonFixedCols = allCols.filter(
      (col) => !col.getColDef().lockPosition
    );
    const pinnedCount = allNonFixedCols.filter(
      (col) => col.getPinned() === 'left'
    ).length;
    const pinFixed = pinnedCount > 0;
    const columnStates: ColumnState[] = [];
    allFixedCols.forEach((col) => {
      if (pinFixed !== col.isPinned()) {
        columnStates.push({
          colId: col.getId(),
          pinned: pinFixed ? 'left' : null,
        });
      }
    });
    if (columnStates.length > 0) {
      event.columnApi.applyColumnState({ state: columnStates });
    }
  }, []);

  const onPinAthlete = useCallback(() => {
    gridRef.current!.columnApi.applyColumnState({
      state: [{ colId: 'athlete', pinned: 'left' }],
    });
  }, []);

  const onUnpinAthlete = useCallback(() => {
    gridRef.current!.columnApi.applyColumnState({
      state: [{ colId: 'athlete', pinned: null }],
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="legend-bar">
          <button onClick={onPinAthlete}>Pin Athlete</button>
          <button onClick={onUnpinAthlete}>Un-Pin Athlete</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="locked-col legend-box"></span> Position Locked Column
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            suppressDragLeaveHidesColumns={true}
            onGridReady={onGridReady}
            onColumnPinned={onColumnPinned}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
