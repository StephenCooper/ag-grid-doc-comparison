'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  CreateRangeChartParams,
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
    { field: 'gold', chartDataType: 'series', sort: 'desc' },
    { field: 'silver', chartDataType: 'series', sort: 'desc' },
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

  const onChart1 = useCallback(() => {
    var params: CreateRangeChartParams = {
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 4,
        columns: ['country', 'gold', 'silver'],
      },
      chartType: 'groupedColumn',
      chartThemeName: 'ag-vivid',
      chartThemeOverrides: {
        common: {
          title: {
            enabled: true,
            text: 'Top 5 Medal Winners',
          },
        },
      },
    };
    gridRef.current!.api.createRangeChart(params);
  }, []);

  const onChart2 = useCallback(() => {
    var params: CreateRangeChartParams = {
      cellRange: {
        columns: ['country', 'bronze'],
      },
      chartType: 'groupedBar',
      chartThemeName: 'ag-pastel',
      chartThemeOverrides: {
        common: {
          title: {
            enabled: true,
            text: 'Bronze Medal by Country',
          },
          legend: {
            enabled: false,
          },
        },
      },
      unlinkChart: true,
    };
    gridRef.current!.api.createRangeChart(params);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="outer-div">
        <div className="button-bar">
          <button onClick={onChart1}>Top 5 Medal Winners</button>
          <button onClick={onChart2}>Bronze Medals by Country</button>
        </div>
        <div className="grid-wrapper">
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              enableRangeSelection={true}
              enableCharts={true}
              popupParent={popupParent}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
