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
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  SetFilterModule,
]);

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'athlete', filter: 'agTextColumnFilter', minWidth: 200 },
    { field: 'age' },
    { field: 'country', minWidth: 200 },
    { field: 'year' },
    { field: 'date', minWidth: 160 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      // allow every column to be aggregated
      enableValue: true,
      // allow every column to be grouped
      enableRowGroup: true,
      // allow every column to be pivoted
      enablePivot: true,
      sortable: true,
      filter: true,
    };
  }, []);
  const sideBar = useMemo<
    SideBarDef | string | string[] | boolean | null
  >(() => {
    return {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
        },
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
        },
      ],
      defaultToolPanel: 'filters',
      hiddenByDefault: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => setRowData(data));
  }, []);

  const setSideBarVisible = useCallback((value: boolean) => {
    gridRef.current!.api.setSideBarVisible(value);
  }, []);

  const isSideBarVisible = useCallback(() => {
    alert(gridRef.current!.api.isSideBarVisible());
  }, [alert]);

  const openToolPanel = useCallback((key: string) => {
    gridRef.current!.api.openToolPanel(key);
  }, []);

  const closeToolPanel = useCallback(() => {
    gridRef.current!.api.closeToolPanel();
  }, []);

  const getOpenedToolPanel = useCallback(() => {
    alert(gridRef.current!.api.getOpenedToolPanel());
  }, [alert]);

  const setSideBar = useCallback(
    (def: SideBarDef | string | string[] | boolean) => {
      gridRef.current!.api.setSideBar(def);
    },
    []
  );

  const getSideBar = useCallback(() => {
    var sideBar = gridRef.current!.api.getSideBar();
    alert(JSON.stringify(sideBar));
    console.log(sideBar);
  }, [alert]);

  const setSideBarPosition = useCallback((position: 'left' | 'right') => {
    gridRef.current!.api.setSideBarPosition(position);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="parent-div">
        <div className="api-panel">
          <div className="api-column">
            Visibility
            <button onClick={() => setSideBarVisible(true)}>
              setSideBarVisible(true)
            </button>
            <button onClick={() => setSideBarVisible(false)}>
              setSideBarVisible(false)
            </button>
            <button onClick={isSideBarVisible}>isSideBarVisible()</button>
          </div>
          <div className="api-column">
            Open &amp; Close
            <button onClick={() => openToolPanel('columns')}>
              openToolPanel('columns')
            </button>
            <button onClick={() => openToolPanel('filters')}>
              openToolPanel('filters')
            </button>
            <button onClick={closeToolPanel}>closeToolPanel()</button>
            <button onClick={getOpenedToolPanel}>getOpenedToolPanel()</button>
          </div>
          <div className="api-column">
            Reset
            <button onClick={() => setSideBar(['filters', 'columns'])}>
              setSideBar(['filters','columns'])
            </button>
            <button onClick={() => setSideBar('columns')}>
              setSideBar('columns')
            </button>
            <button onClick={getSideBar}>getSideBar()</button>
          </div>
          <div className="api-column">
            Position
            <button onClick={() => setSideBarPosition('left')}>
              setSideBarPosition('left')
            </button>
            <button onClick={() => setSideBarPosition('right')}>
              setSideBarPosition('right')
            </button>
          </div>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            sideBar={sideBar}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
