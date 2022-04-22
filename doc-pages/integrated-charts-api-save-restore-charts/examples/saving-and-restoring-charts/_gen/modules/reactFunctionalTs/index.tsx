'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  ChartModel,
  ChartRef,
  ChartRefParams,
  ColDef,
  ColGroupDef,
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

var chartModel: ChartModel | null;

var currentChartRef: ChartRef | null;

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'country', chartDataType: 'category' },
    { field: 'sugar', chartDataType: 'series' },
    { field: 'fat', chartDataType: 'series' },
    { field: 'weight', chartDataType: 'series' },
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

  const saveChart = useCallback(() => {
    var chartModels = gridRef.current!.api.getChartModels() || [];
    if (chartModels.length > 0) {
      chartModel = chartModels[0];
    }
    alert('Chart saved!');
  }, [alert]);

  const clearChart = useCallback(() => {
    if (currentChartRef) {
      currentChartRef.destroyChart();
      currentChartRef = null;
    }
  }, [currentChartRef]);

  const restoreChart = useCallback(() => {
    if (!chartModel) return;
    currentChartRef = gridRef.current!.api.restoreChart(chartModel)!;
  }, [chartModel]);

  const createChartContainer = useCallback(
    (chartRef: ChartRef) => {
      // destroy existing chart
      if (currentChartRef) {
        currentChartRef.destroyChart();
      }
      var eChart = chartRef.chartElement;
      var eParent = document.querySelector('#myChart') as any;
      eParent.appendChild(eChart);
      currentChartRef = chartRef;
    },
    [currentChartRef]
  );

  return (
    <div style={containerStyle}>
      <div className="wrapper">
        <div id="buttons">
          <button onClick={saveChart}>Save chart</button>
          <button onClick={clearChart}>Clear chart</button>
          <button onClick={restoreChart}>Restore chart</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            enableRangeSelection={true}
            popupParent={popupParent}
            enableCharts={true}
            createChartContainer={createChartContainer}
          ></AgGridReact>
        </div>
        <div id="myChart" className="ag-theme-alpine my-chart"></div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
