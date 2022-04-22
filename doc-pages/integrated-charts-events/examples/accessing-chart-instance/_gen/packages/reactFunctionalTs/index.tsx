'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  ChartCreated,
  ChartDestroyed,
  ChartRangeSelectionChanged,
  ColDef,
  ColGroupDef,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';

var chart: any = null;

function updateTitle(api: GridApi, chart: any) {
  var cellRange = api.getCellRanges()![1];
  if (!cellRange) return;
  var columnCount = cellRange.columns.length;
  var rowCount = cellRange.endRow!.rowIndex - cellRange.startRow!.rowIndex + 1;
  chart.title.enabled = true;
  chart.title.text = 'Monthly Weather';
  chart.subtitle.enabled = true;
  chart.subtitle.text =
    'Using series data from ' +
    columnCount +
    ' column(s) and ' +
    rowCount +
    ' row(s)';
}

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'Month', width: 150, chartDataType: 'category' },
    { field: 'Sunshine (hours)', chartDataType: 'series' },
    { field: 'Rainfall (mm)', chartDataType: 'series' },
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

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/weather-se-england.json')
      .then((resp) => resp.json())
      .then((data: any[]) => {
        setRowData(data);
      });
  }, []);

  const onChartCreated = useCallback((event: ChartCreated) => {
    console.log('Created chart with ID ' + event.chartId);
    const chartRef = gridRef.current!.api.getChartRef(event.chartId)!;
    chart = chartRef.chart;
    updateTitle(gridRef.current!.api!, chart);
  }, []);

  const onChartRangeSelectionChanged = useCallback(
    (event: ChartRangeSelectionChanged) => {
      console.log('Changed range selection of chart with ID ' + event.chartId);
      updateTitle(gridRef.current!.api!, chart);
    },
    []
  );

  const onChartDestroyed = useCallback((event: ChartDestroyed) => {
    console.log('Destroyed chart with ID ' + event.chartId);
    chart = null;
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
          onGridReady={onGridReady}
          onChartCreated={onChartCreated}
          onChartRangeSelectionChanged={onChartRangeSelectionChanged}
          onChartDestroyed={onChartDestroyed}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
