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
  RowGroupOpenedEvent,
  RowGroupingDisplayType,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'athlete', width: 150, rowGroupIndex: 0 },
    { field: 'age', width: 90, rowGroupIndex: 1 },
    { field: 'country', width: 120, rowGroupIndex: 2 },
    { field: 'year', width: 90 },
    { field: 'date', width: 110, rowGroupIndex: 2 },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => setRowData(data));
  }, []);

  const onRowGroupOpened = useCallback((event: RowGroupOpenedEvent) => {
    var rowNodeIndex = event.node.rowIndex!;
    // factor in child nodes so we can scroll to correct position
    var childCount = event.node.childrenAfterSort
      ? event.node.childrenAfterSort.length
      : 0;
    var newIndex = rowNodeIndex + childCount;
    gridRef.current!.api.ensureIndexVisible(newIndex);
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          animateRows={false}
          groupDisplayType={'groupRows'}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          onRowGroupOpened={onRowGroupOpened}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
