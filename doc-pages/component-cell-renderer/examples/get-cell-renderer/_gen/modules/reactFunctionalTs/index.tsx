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
} from '@ag-grid-community/core';
import MedalCellRenderer from './medalCellRenderer';
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
    { field: 'athlete', width: 150 },
    { field: 'country', width: 150 },
    { field: 'year', width: 100 },
    { field: 'gold', width: 100, cellRenderer: MedalCellRenderer },
    { field: 'silver', width: 100, cellRenderer: MedalCellRenderer },
    { field: 'bronze', width: 100, cellRenderer: MedalCellRenderer },
    { field: 'total', width: 100 },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => {
        setRowData(data);
      });
  }, []);

  const onCallGold = useCallback(() => {
    console.log('=========> calling all gold');
    // pass in list of columns, here it's gold only
    const params = { columns: ['gold'] };
    const instances = gridRef.current!.api.getCellRendererInstances(
      params
    ) as any[];
    instances.forEach((instance) => {
      instance.medalUserFunction();
    });
  }, []);

  const onFirstRowGold = useCallback(() => {
    console.log('=========> calling gold row one');
    // pass in one column and one row to identify one cell
    const firstRowNode = gridRef.current!.api.getDisplayedRowAtIndex(0)!;
    const params = { columns: ['gold'], rowNodes: [firstRowNode] };
    const instances = gridRef.current!.api.getCellRendererInstances(
      params
    ) as any[];
    instances.forEach((instance) => {
      instance.medalUserFunction();
    });
  }, []);

  const onCallAllCells = useCallback(() => {
    console.log('=========> calling everything');
    // no params, goes through all rows and columns where cell renderer exists
    const instances = gridRef.current!.api.getCellRendererInstances() as any[];
    instances.forEach((instance) => {
      instance.medalUserFunction();
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <button onClick={onCallGold}>Gold</button>
          <button onClick={onFirstRowGold}>First Row Gold</button>
          <button onClick={onCallAllCells}>All Cells</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
