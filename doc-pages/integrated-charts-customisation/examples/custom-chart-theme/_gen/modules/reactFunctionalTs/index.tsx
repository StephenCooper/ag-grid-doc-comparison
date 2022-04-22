'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  AgChartTheme,
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
  const customChartThemes = useMemo<{
    [name: string]: AgChartTheme;
  }>(() => {
    return {
      myCustomTheme: {
        palette: {
          fills: ['#e1ba00', 'silver', 'peru'],
          strokes: ['black', '#ff0000'],
        },
        overrides: {
          common: {
            padding: {
              top: 20,
              right: 30,
              bottom: 10,
              left: 2,
            },
            background: {
              fill: '#e5e5e5',
            },
            title: {
              enabled: true,
              fontStyle: 'italic',
              fontWeight: '600',
              fontSize: 18,
              fontFamily: 'Impact, sans-serif',
              color: '#414182',
            },
            legend: {
              enabled: true,
              position: 'left',
              spacing: 20,
              item: {
                label: {
                  fontStyle: 'italic',
                  fontWeight: 'bold',
                  fontSize: 18,
                  fontFamily: 'Palatino, serif',
                  color: '#555',
                },
                marker: {
                  shape: 'diamond',
                  size: 10,
                  padding: 10,
                  strokeWidth: 2,
                },
                paddingX: 120,
                paddingY: 20,
              },
            },
          },
          cartesian: {
            axes: {
              number: {
                bottom: {
                  line: {
                    width: 5,
                  },
                },
              },
              category: {
                left: {
                  line: {
                    width: 2,
                  },
                },
              },
            },
          },
        },
      },
    };
  }, []);
  const chartThemes = useMemo<string[]>(() => {
    return ['myCustomTheme', 'ag-pastel', 'ag-vivid'];
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
          customChartThemes={customChartThemes}
          chartThemes={chartThemes}
          onFirstDataRendered={onFirstDataRendered}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
