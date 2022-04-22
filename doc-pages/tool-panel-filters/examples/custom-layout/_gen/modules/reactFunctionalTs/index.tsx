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
  SideBarDef,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  SetFilterModule,
  FiltersToolPanelModule,
]);

var sortedToolPanelColumnDefs = [
  {
    headerName: 'Athlete',
    children: [
      { field: 'age' },
      { field: 'country' },
      { headerName: 'Name', field: 'athlete' },
    ],
  },
  {
    headerName: 'Competition',
    children: [{ field: 'date' }, { field: 'year' }],
  },
  {
    headerName: 'Medals',
    children: [
      { field: 'bronze' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'total' },
    ],
  },
  { colId: 'sport', field: 'sport', width: 110 },
];

var customToolPanelColumnDefs = [
  {
    headerName: 'Dummy Group 1',
    children: [
      { field: 'age' },
      { headerName: 'Name', field: 'athlete' },
      {
        headerName: 'Dummy Group 2',
        children: [{ colId: 'sport' }, { field: 'country' }],
      },
    ],
  },
  {
    headerName: 'Medals',
    children: [
      { field: 'total' },
      { field: 'bronze' },
      {
        headerName: 'Dummy Group 3',
        children: [{ field: 'silver' }, { field: 'gold' }],
      },
    ],
  },
];

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      headerName: 'Athlete',
      children: [
        {
          headerName: 'Name',
          field: 'athlete',
          minWidth: 200,
          filter: 'agTextColumnFilter',
        },
        { field: 'age' },
        { field: 'country', minWidth: 200 },
      ],
    },
    {
      headerName: 'Competition',
      children: [{ field: 'year' }, { field: 'date', minWidth: 180 }],
    },
    { colId: 'sport', field: 'sport', minWidth: 200 },
    {
      headerName: 'Medals',
      children: [
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
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
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
          toolPanelParams: {
            suppressExpandAll: false,
            suppressFilterSearch: false,
            // prevents custom layout changing when columns are reordered in the grid
            suppressSyncLayoutWithGrid: true,
          },
        },
      ],
      defaultToolPanel: 'filters',
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => setRowData(data));
  }, []);

  const setCustomSortLayout = useCallback(() => {
    var filtersToolPanel = (gridRef.current!.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel;
    filtersToolPanel!.setFilterLayout(sortedToolPanelColumnDefs);
  }, []);

  const setCustomGroupLayout = useCallback(() => {
    var filtersToolPanel = (gridRef.current!.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel;
    filtersToolPanel!.setFilterLayout(customToolPanelColumnDefs);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div>
          <span className="button-group">
            <button onClick={setCustomSortLayout}>Custom Sort Layout</button>
            <button onClick={setCustomGroupLayout}>Custom Group Layout</button>
          </span>
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
