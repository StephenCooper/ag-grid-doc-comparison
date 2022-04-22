'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  AgChartThemeOverrides,
  ColDef,
  ColGroupDef,
  CreateRangeChartParams,
  FirstDataRenderedEvent,
  Grid,
  GridOptions,
  ValueGetterParams,
  ValueParserParams,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { GridChartsModule } from '@ag-grid-enterprise/charts';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
  RowGroupingModule,
]);

function numberParser(params: ValueParserParams) {
  const value = params.newValue;
  if (value === null || value === undefined || value === '') {
    return null;
  }
  return parseFloat(value);
}

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'day', maxWidth: 90 },
    { field: 'month', chartDataType: 'category' },
    { field: 'rain', chartDataType: 'series', valueParser: numberParser },
    { field: 'pressure', chartDataType: 'series', valueParser: numberParser },
    { field: 'temp', chartDataType: 'series', valueParser: numberParser },
    { field: 'wind', chartDataType: 'series', valueParser: numberParser },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: true,
      sortable: true,
      filter: true,
      resizable: true,
    };
  }, []);
  const chartThemes = useMemo<string[]>(() => {
    return ['ag-pastel', 'ag-vivid'];
  }, []);
  const popupParent = useMemo<HTMLElement>(() => {
    return document.body;
  }, []);
  const chartThemeOverrides = useMemo<AgChartThemeOverrides>(() => {
    return {
      common: {
        padding: {
          right: 40,
        },
        legend: {
          position: 'bottom',
        },
      },
      column: {
        series: {
          strokeWidth: 2,
          fillOpacity: 0.8,
        },
      },
      line: {
        series: {
          strokeWidth: 5,
          strokeOpacity: 0.8,
        },
      },
    };
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    gridRef.current!.api.createRangeChart({
      chartType: 'customCombo',
      cellRange: {
        columns: ['month', 'rain', 'pressure', 'temp'],
      },
      seriesChartTypes: [
        { colId: 'rain', chartType: 'groupedColumn', secondaryAxis: false },
        { colId: 'pressure', chartType: 'line', secondaryAxis: true },
        { colId: 'temp', chartType: 'line', secondaryAxis: true },
      ],
      aggFunc: 'sum',
      suppressChartRanges: true,
      chartContainer: document.querySelector('#myChart') as any,
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="wrapper">
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            enableRangeSelection={true}
            chartThemes={chartThemes}
            enableCharts={true}
            popupParent={popupParent}
            chartThemeOverrides={chartThemeOverrides}
            onFirstDataRendered={onFirstDataRendered}
          ></AgGridReact>
        </div>
        <div id="myChart" className="ag-theme-alpine"></div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
