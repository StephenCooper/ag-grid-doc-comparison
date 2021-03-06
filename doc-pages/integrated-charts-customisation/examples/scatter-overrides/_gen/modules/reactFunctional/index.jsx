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

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    { field: 'country', width: 150, chartDataType: 'category' },
    { field: 'total', chartDataType: 'series' },
    { field: 'gold', chartDataType: 'series' },
    { field: 'silver', chartDataType: 'series' },
    { field: 'bronze', chartDataType: 'series' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
    };
  }, []);
  const popupParent = useMemo(() => {
    return document.body;
  }, []);
  const chartThemeOverrides = useMemo(() => {
    return {
      scatter: {
        series: {
          fillOpacity: 0.7,
          strokeOpacity: 0.6,
          strokeWidth: 2,
          highlightStyle: {
            item: {
              fill: 'red',
              stroke: 'yellow',
            },
          },
          marker: {
            enabled: true,
            shape: 'square',
            size: 5,
            maxSize: 12,
            strokeWidth: 4,
          },
          tooltip: {
            renderer: (params) => {
              var label = params.datum[params.labelKey];
              var size = params.datum[params.sizeKey];
              return {
                content:
                  (label != null
                    ? '<b>' +
                      params.labelName.toUpperCase() +
                      ':</b> ' +
                      label +
                      '<br/>'
                    : '') +
                  '<b>' +
                  params.xName.toUpperCase() +
                  ':</b> ' +
                  params.xValue +
                  '<br/>' +
                  '<b>' +
                  params.yName.toUpperCase() +
                  ':</b> ' +
                  params.yValue +
                  (size != null
                    ? '<br/><b>' +
                      params.sizeName.toUpperCase() +
                      ':</b> ' +
                      size
                    : ''),
              };
            },
          },
        },
      },
    };
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    var cellRange = {
      rowStartIndex: 0,
      rowEndIndex: 4,
      columns: ['country', 'total', 'gold', 'silver', 'bronze'],
    };
    var createRangeChartParams = {
      cellRange: cellRange,
      chartType: 'scatter',
    };
    gridRef.current.api.createRangeChart(createRangeChartParams);
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
