'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  AgChartThemeOverrides,
  ColDef,
  ColGroupDef,
  CreateRangeChartParams,
  FirstDataRenderedEvent,
  Grid,
  GridOptions,
} from 'ag-grid-community';

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
      histogram: {
        series: {
          bins: [
            [0, 10],
            [10, 40],
            [40, 80],
            [80, 100],
          ],
          fillOpacity: 0.8,
          strokeOpacity: 0.8,
          strokeWidth: 4,
          shadow: {
            enabled: true,
            color: 'rgba(0, 0, 0, 0.3)',
            xOffset: 10,
            yOffset: 10,
            blur: 8,
          },
          label: {
            enabled: true,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fontSize: 15,
            fontFamily: 'Arial, sans-serif',
            color: 'green',
            formatter: function (params) {
              return '<' + params.value + '>';
            },
          },
          highlightStyle: {
            item: {
              fill: 'black',
              stroke: 'yellow',
            },
          },
          tooltip: {
            renderer: function (params) {
              var bin = params.datum;
              var binSize = bin.frequency;
              var medalColour = params.xKey;
              return {
                content:
                  binSize +
                  (binSize >= 2 ? ' countries' : ' country') +
                  ' got between ' +
                  params.xValue[0] +
                  ' and ' +
                  params.xValue[1] +
                  ' ' +
                  medalColour +
                  ' medals',
              };
            },
          },
        },
      },
    };
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    var cellRange = {
      rowStartIndex: 0,
      rowEndIndex: 20,
      columns: ['bronze'],
    };
    var createRangeChartParams: CreateRangeChartParams = {
      cellRange: cellRange,
      chartType: 'histogram',
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
