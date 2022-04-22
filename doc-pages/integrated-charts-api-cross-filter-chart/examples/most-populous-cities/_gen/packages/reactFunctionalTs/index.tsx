'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import {
  ColDef,
  ColGroupDef,
  FirstDataRenderedEvent,
  Grid,
  GridApi,
  GridOptions,
} from 'ag-grid-community';

function createColumnChart(gridApi: GridApi) {
  gridApi.createCrossFilterChart({
    chartType: 'column',
    cellRange: {
      columns: ['country', 'population'],
    },
    aggFunc: 'count',
    chartThemeOverrides: {
      common: {
        title: {
          enabled: true,
          text: 'Number of Most Populous Cities by Country',
        },
        legend: {
          enabled: false,
        },
      },
      cartesian: {
        axes: {
          category: {
            label: {
              rotation: 325,
            },
          },
        },
      },
    },
    chartContainer: document.querySelector('#barChart') as any,
  });
}

function createBubbleChart(gridApi: GridApi) {
  gridApi.createCrossFilterChart({
    chartType: 'bubble',
    cellRange: {
      columns: ['longitude', 'latitude', 'population'],
    },
    chartThemeOverrides: {
      common: {
        title: {
          enabled: true,
          text: 'Latitude vs Longitude of Most Populous Cities',
        },
        legend: {
          enabled: false,
        },
      },
    },
    chartContainer: document.querySelector('#bubbleChart') as any,
  });
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'city', chartDataType: 'category' },
    { field: 'country', chartDataType: 'category' },
    { field: 'longitude', chartDataType: 'series' },
    { field: 'latitude', chartDataType: 'series' },
    { field: 'population', chartDataType: 'series' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      editable: true,
      sortable: true,
      filter: 'agMultiColumnFilter',
      floatingFilter: true,
      resizable: true,
    };
  }, []);
  const chartThemes = useMemo<string[]>(() => {
    return ['ag-default-dark'];
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    createColumnChart(params.api);
    createBubbleChart(params.api);
  }, []);

  return (
    <div style={containerStyle}>
      <div id="wrapper">
        <div id="barChart" className="ag-theme-alpine-dark"></div>
        <div id="bubbleChart" className="ag-theme-alpine-dark"></div>

        <div style={gridStyle} className="ag-theme-alpine-dark">
          <AgGridReact
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
