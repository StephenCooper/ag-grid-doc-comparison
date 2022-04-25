'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
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

const getColumnDefs = () => {
  return [
    { field: 'date', valueFormatter: dateFormatter },
    { field: 'avgTemp' },
  ];
};

var currentChartRef;

const dateFormatter = (params) => {
  return params.value
    ? params.value.toISOString().substring(0, 10)
    : params.value;
};

const getRowData = () => {
  return [
    { date: new Date(2019, 0, 1), avgTemp: 8.27 },
    { date: new Date(2019, 0, 5), avgTemp: 7.22 },
    { date: new Date(2019, 0, 8), avgTemp: 11.54 },
    { date: new Date(2019, 0, 11), avgTemp: 8.44 },
    { date: new Date(2019, 0, 22), avgTemp: 12.03 },
    { date: new Date(2019, 0, 23), avgTemp: 9.68 },
    { date: new Date(2019, 0, 24), avgTemp: 9.9 },
    { date: new Date(2019, 0, 25), avgTemp: 8.74 },
  ];
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState(getRowData());
  const [columnDefs, setColumnDefs] = useState(getColumnDefs());
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
    };
  }, []);
  const popupParent = useMemo(() => {
    return document.body;
  }, []);
  const chartThemeOverrides = useMemo(() => {
    return {
      line: {
        title: {
          enabled: true,
          text: 'Average Daily Temperatures',
        },
        legend: {
          enabled: false,
        },
        padding: {
          top: 15,
          bottom: 25,
        },
        navigator: {
          enabled: true,
          height: 20,
          margin: 25,
        },
        axes: {
          time: {
            label: {
              rotation: 0,
              format: '%d %b',
            },
          },
          category: {
            label: {
              rotation: 0,
              formatter: (params) => {
                return moment(new Date(params.value)).format('DD MMM');
              },
            },
          },
          number: {
            label: {
              formatter: (params) => {
                return params.value + '°C';
              },
            },
          },
        },
      },
    };
  }, []);

  const onFirstDataRendered = useCallback(
    (params) => {
      if (currentChartRef) {
        currentChartRef.destroyChart();
      }
      var createRangeChartParams = {
        chartContainer: document.querySelector('#myChart'),
        suppressChartRanges: true,
        cellRange: {
          columns: ['date', 'avgTemp'],
        },
        chartType: 'line',
      };
      currentChartRef = gridRef.current.api.createRangeChart(
        createRangeChartParams
      );
    },
    [currentChartRef]
  );

  const toggleAxis = useCallback(() => {
    var axisBtn = document.querySelector('#axisBtn');
    axisBtn.textContent = axisBtn.value;
    axisBtn.value = axisBtn.value === 'time' ? 'category' : 'time';
    const columnDefs = getColumnDefs();
    columnDefs.forEach(function (colDef) {
      if (colDef.field === 'date') {
        colDef.chartDataType = axisBtn.value;
      }
    });
    gridRef.current.api.setColumnDefs(columnDefs);
  }, []);

  const getChartToolbarItems = useCallback(() => {
    return ['chartData', 'chartFormat'];
  }, []);

  return (
    <div style={containerStyle}>
      <label>Switch Axis to: </label>
      <button id="axisBtn" onClick={toggleAxis} value="time">
        Category
      </button>
      <div className="wrapper">
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
        <div id="myChart" className="ag-theme-alpine my-chart"></div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
