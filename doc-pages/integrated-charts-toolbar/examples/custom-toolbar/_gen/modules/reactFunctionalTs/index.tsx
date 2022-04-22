'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  AgChartThemeOverrides,
  ChartMenuOptions,
  ColDef,
  ColGroupDef,
  CreateRangeChartParams,
  FirstDataRenderedEvent,
  GetChartToolbarItems,
  Grid,
  GridOptions,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { GridChartsModule } from '@ag-grid-enterprise/charts';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
]);

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'country', width: 150, chartDataType: 'category' },
    { field: 'gold', chartDataType: 'series' },
    { field: 'silver', chartDataType: 'series' },
    { field: 'bronze', chartDataType: 'series' },
    {
      headerName: 'A',
      valueGetter: 'Math.floor(Math.random()*1000)',
      chartDataType: 'series',
    },
    {
      headerName: 'B',
      valueGetter: 'Math.floor(Math.random()*1000)',
      chartDataType: 'series',
    },
    {
      headerName: 'C',
      valueGetter: 'Math.floor(Math.random()*1000)',
      chartDataType: 'series',
    },
    {
      headerName: 'D',
      valueGetter: 'Math.floor(Math.random()*1000)',
      chartDataType: 'series',
    },
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
  const popupParent = useMemo<HTMLElement>(() => {
    return document.body;
  }, []);
  const chartThemeOverrides = useMemo<AgChartThemeOverrides>(() => {
    return {
      pie: {
        title: {
          enabled: true,
          text: 'Precious Metals Production',
          fontWeight: 'bold',
          fontSize: 20,
          color: 'rgb(100, 100, 100)',
        },
        subtitle: {
          enabled: true,
          text: 'by country',
          fontStyle: 'italic',
          fontWeight: 'bold',
          fontSize: 14,
          color: 'rgb(100, 100, 100)',
        },
        padding: {
          top: 25,
          right: 20,
          bottom: 55,
          left: 20,
        },
        legend: {
          enabled: false,
        },
        series: {
          label: {
            enabled: true,
          },
          callout: {
            length: 20,
          },
        },
      },
    };
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    var createRangeChartParams: CreateRangeChartParams = {
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 5,
        columns: ['country', 'gold'],
      },
      chartType: 'pie',
    };
    gridRef.current!.api.createRangeChart(createRangeChartParams);
  }, []);

  const getChartToolbarItems = useCallback((): ChartMenuOptions[] => {
    return ['chartDownload', 'chartData', 'chartSettings'];
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          popupParent={popupParent}
          enableRangeSelection={true}
          enableCharts={true}
          chartThemeOverrides={chartThemeOverrides}
          getChartToolbarItems={getChartToolbarItems}
          onFirstDataRendered={onFirstDataRendered}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
