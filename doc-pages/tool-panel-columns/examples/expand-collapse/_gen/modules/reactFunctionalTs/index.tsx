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
  IColumnToolPanel,
  SideBarDef,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  SetFilterModule,
  ColumnsToolPanelModule,
]);

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      groupId: 'athleteGroupId',
      headerName: 'Athlete',
      children: [
        {
          headerName: 'Name',
          field: 'athlete',
          minWidth: 200,
          filter: 'agTextColumnFilter',
        },
        {
          groupId: 'competitionGroupId',
          headerName: 'Competition',
          children: [{ field: 'year' }, { field: 'date', minWidth: 180 }],
        },
      ],
    },
    {
      groupId: 'medalsGroupId',
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
      flex: 1,
      minWidth: 100,
      // allow every column to be aggregated
      enableValue: true,
      // allow every column to be grouped
      enableRowGroup: true,
      // allow every column to be pivoted
      enablePivot: true,
      filter: true,
      sortable: true,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => setRowData(data));

    var columnToolPanel = (params.api!.getToolPanelInstance(
      'columns'
    ) as unknown) as IColumnToolPanel;
    columnToolPanel.collapseColumnGroups();
  }, []);

  const expandAllGroups = useCallback(() => {
    var columnToolPanel = (gridRef.current!.api.getToolPanelInstance(
      'columns'
    ) as unknown) as IColumnToolPanel;
    columnToolPanel.expandColumnGroups();
  }, []);

  const collapseAllGroups = useCallback(() => {
    var columnToolPanel = (gridRef.current!.api.getToolPanelInstance(
      'columns'
    ) as unknown) as IColumnToolPanel;
    columnToolPanel.collapseColumnGroups();
  }, []);

  const expandAthleteAndCompetitionGroups = useCallback(() => {
    var columnToolPanel = (gridRef.current!.api.getToolPanelInstance(
      'columns'
    ) as unknown) as IColumnToolPanel;
    columnToolPanel.expandColumnGroups([
      'athleteGroupId',
      'competitionGroupId',
    ]);
  }, []);

  const collapseCompetitionGroups = useCallback(() => {
    var columnToolPanel = (gridRef.current!.api.getToolPanelInstance(
      'columns'
    ) as unknown) as IColumnToolPanel;
    columnToolPanel.collapseColumnGroups(['competitionGroupId']);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div>
          <span className="button-group">
            <button onClick={expandAllGroups}>Expand All</button>
            <button onClick={collapseAllGroups}>Collapse All</button>
            <button onClick={expandAthleteAndCompetitionGroups}>
              Expand Athlete &amp; Competition
            </button>
            <button onClick={collapseCompetitionGroups}>
              Collapse Competition
            </button>
          </span>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            sideBar={'columns'}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
