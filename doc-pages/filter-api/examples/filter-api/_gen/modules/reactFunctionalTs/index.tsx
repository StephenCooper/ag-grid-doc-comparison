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
  IFiltersToolPanel,
  ISetFilter,
  SideBarDef,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

let savedMiniFilterText: string | null = '';

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'athlete', filter: 'agSetColumnFilter' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
      sortable: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => setRowData(data));

    ((params.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).expandFilters();
  }, []);

  const getMiniFilterText = useCallback(() => {
    const athleteFilter = gridRef.current!.api.getFilterInstance(
      'athlete'
    ) as ISetFilter;
    console.log(athleteFilter.getMiniFilter());
  }, []);

  const saveMiniFilterText = useCallback(() => {
    const athleteFilter = gridRef.current!.api.getFilterInstance(
      'athlete'
    ) as ISetFilter;
    savedMiniFilterText = athleteFilter.getMiniFilter();
  }, []);

  const restoreMiniFilterText = useCallback(() => {
    const athleteFilter = gridRef.current!.api.getFilterInstance(
      'athlete'
    ) as ISetFilter;
    athleteFilter.setMiniFilter(savedMiniFilterText);
  }, []);

  const resetFilter = useCallback(() => {
    const athleteFilter = gridRef.current!.api.getFilterInstance(
      'athlete'
    ) as ISetFilter;
    athleteFilter.setModel(null);
    gridRef.current!.api.onFilterChanged();
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          <button onClick={getMiniFilterText}>Get Mini Filter Text</button>
          <button onClick={saveMiniFilterText}>Save Mini Filter Text</button>
          <button onClick={restoreMiniFilterText}>
            Restore Mini Filter Text
          </button>
          <button onClick={resetFilter}>Reset Filter</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            sideBar={'filters'}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
