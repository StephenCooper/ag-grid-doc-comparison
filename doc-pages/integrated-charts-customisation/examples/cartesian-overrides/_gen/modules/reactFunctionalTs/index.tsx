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
      width: 100,
      resizable: true,
    };
  }, []);
  const popupParent = useMemo<HTMLElement>(() => {
    return document.body;
  }, []);
  const chartThemeOverrides = useMemo<AgChartThemeOverrides>(() => {
    return {
      cartesian: {
        axes: {
          number: {
            line: {
              width: 6,
              color: 'black',
            },
            tick: {
              width: 2,
              size: 10,
              color: 'gray',
            },
            label: {
              fontStyle: 'italic',
              fontWeight: 'bold',
              fontSize: 15,
              fontFamily: 'Arial, sans-serif',
              color: '#de7b73',
              padding: 10,
              rotation: 20,
              formatter: (params) => {
                return params.value.toString().toUpperCase();
              },
            },
            gridStyle: [
              {
                stroke: 'rgba(94,100,178,0.5)',
              },
            ],
            title: {
              enabled: true,
              text: 'Tonnes',
              fontStyle: 'italic',
              fontWeight: 'bold',
              fontSize: 16,
              fontFamily: 'Arial, sans-serif',
              color: 'blue',
            },
          },
          category: {
            line: {
              width: 2,
              color: 'blue',
            },
            tick: {
              width: 2,
              size: 10,
              color: 'blue',
            },
            label: {
              fontStyle: 'italic',
              fontWeight: 'bold',
              fontSize: 15,
              fontFamily: 'Arial, sans-serif',
              color: '#de7b73',
              padding: 10,
              rotation: -20,
              formatter: (params) => {
                var value = String(params.value);
                return value === 'United Kingdom' ? 'UK' : '(' + value + ')';
              },
            },
            gridStyle: [
              {
                stroke: '#80808044',
                lineDash: undefined,
              },
              {
                stroke: '#80808044',
                lineDash: [6, 3],
              },
            ],
            title: {
              fontStyle: 'italic',
              fontWeight: 'bold',
              fontSize: 16,
              fontFamily: 'Arial, sans-serif',
              color: 'blue',
            },
          },
        },
        navigator: {
          enabled: true,
          height: 9,
          min: 0.2,
          max: 1,
          mask: {
            fill: 'lime',
            stroke: 'black',
            strokeWidth: 2,
            fillOpacity: 0.3,
          },
          minHandle: {
            fill: 'yellow',
            stroke: 'blue',
            strokeWidth: 2,
            width: 12,
            height: 22,
            gripLineGap: 4,
            gripLineLength: 12,
          },
          maxHandle: {
            fill: 'yellow',
            stroke: 'blue',
            strokeWidth: 2,
            width: 12,
            height: 22,
            gripLineGap: 4,
            gripLineLength: 12,
          },
        },
      },
    };
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    var cellRange = {
      rowStartIndex: 0,
      rowEndIndex: 4,
      columns: ['country', 'gold', 'silver', 'bronze'],
    };
    var createRangeChartParams: CreateRangeChartParams = {
      cellRange: cellRange,
      chartType: 'groupedBar',
    };
    gridRef.current!.api.createRangeChart(createRangeChartParams);
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
          onFirstDataRendered={onFirstDataRendered}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
