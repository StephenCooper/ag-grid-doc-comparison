'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import {
  ColDef,
  ColGroupDef,
  FirstDataRenderedEvent,
  Grid,
  GridOptions,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { GridChartsModule } from '@ag-grid-enterprise/charts';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
  SetFilterModule,
  MultiFilterModule,
  FiltersToolPanelModule,
  ColumnsToolPanelModule,
]);

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'salesRep', chartDataType: 'category' },
    { field: 'handset', chartDataType: 'category' },
    { field: 'sale', chartDataType: 'series' },
    { field: 'saleDate', chartDataType: 'category' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      sortable: true,
      filter: 'agSetColumnFilter',
      floatingFilter: true,
      resizable: true,
    };
  }, []);
  const chartThemes = useMemo<string[]>(() => {
    return ['ag-default-dark'];
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    gridRef.current!.api.createCrossFilterChart({
      chartType: 'pie',
      cellRange: {
        columns: ['salesRep', 'sale'],
      },
      aggFunc: 'sum',
      chartThemeOverrides: {
        common: {
          title: {
            enabled: true,
            text: 'Sales by Representative ($)',
          },
        },
        pie: {
          series: {
            title: {
              enabled: false,
            },
            label: {
              enabled: false,
            },
          },
        },
      },
      chartContainer: document.querySelector('#pieChart') as any,
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div id="wrapper">
        <div id="pieChart" className="ag-theme-alpine-dark"></div>

        <div style={gridStyle} className="ag-theme-alpine-dark">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            enableCharts={true}
            chartThemes={chartThemes}
            onFirstDataRendered={onFirstDataRendered}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
