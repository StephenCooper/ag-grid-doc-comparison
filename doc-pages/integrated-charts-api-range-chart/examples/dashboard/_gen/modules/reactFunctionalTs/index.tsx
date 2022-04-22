'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  ChartMenuOptions,
  ColDef,
  ColGroupDef,
  CreateRangeChartParams,
  FirstDataRenderedEvent,
  GetChartToolbarItems,
  GetChartToolbarItemsParams,
  Grid,
  GridOptions,
  ValueParserParams,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { GridChartsModule } from '@ag-grid-enterprise/charts';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
  RowGroupingModule,
]);

function numberValueParser(params: ValueParserParams) {
  var res = Number.parseInt(params.newValue);
  if (isNaN(res)) {
    return undefined;
  }
  return res;
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '30%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'country', width: 150, chartDataType: 'category' },
    { field: 'group', chartDataType: 'category' },
    {
      field: 'gold',
      chartDataType: 'series',
      editable: true,
      valueParser: numberValueParser,
    },
    {
      field: 'silver',
      chartDataType: 'series',
      editable: true,
      valueParser: numberValueParser,
    },
    {
      field: 'bronze',
      chartDataType: 'series',
      editable: true,
      valueParser: numberValueParser,
    },
    {
      field: 'a',
      chartDataType: 'series',
      editable: true,
      valueParser: numberValueParser,
    },
    {
      field: 'b',
      chartDataType: 'series',
      editable: true,
      valueParser: numberValueParser,
    },
    {
      field: 'c',
      chartDataType: 'series',
      editable: true,
      valueParser: numberValueParser,
    },
    {
      field: 'd',
      chartDataType: 'series',
      editable: true,
      valueParser: numberValueParser,
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

  const onFirstDataRendered = useCallback((event: FirstDataRenderedEvent) => {
    var eContainer1 = document.querySelector('#chart1') as any;
    var params1: CreateRangeChartParams = {
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 4,
        columns: ['country', 'gold', 'silver'],
      },
      chartType: 'groupedBar',
      chartContainer: eContainer1,
    };
    event.api.createRangeChart(params1);
    var eContainer2 = document.querySelector('#chart2') as any;
    var params2: CreateRangeChartParams = {
      cellRange: {
        columns: ['group', 'gold'],
      },
      chartType: 'pie',
      chartContainer: eContainer2,
      aggFunc: 'sum',
      chartThemeOverrides: {
        common: {
          padding: {
            top: 20,
            left: 10,
            bottom: 30,
            right: 10,
          },
          legend: {
            enabled: true,
            position: 'bottom',
          },
        },
      },
    };
    event.api.createRangeChart(params2);
    var eContainer3 = document.querySelector('#chart3') as any;
    var params3: CreateRangeChartParams = {
      cellRange: {
        columns: ['group', 'silver'],
      },
      chartType: 'pie',
      chartContainer: eContainer3,
      aggFunc: 'sum',
      chartThemeOverrides: {
        common: {
          padding: {
            top: 20,
            left: 10,
            bottom: 30,
            right: 10,
          },
          legend: {
            enabled: true,
            position: 'bottom',
          },
        },
      },
    };
    event.api.createRangeChart(params3);
  }, []);

  const getChartToolbarItems = useCallback(
    (params: GetChartToolbarItemsParams): ChartMenuOptions[] => {
      return [];
    },
    []
  );

  return (
    <div style={containerStyle}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            enableRangeSelection={true}
            enableCharts={true}
            popupParent={popupParent}
            getChartToolbarItems={getChartToolbarItems}
            onFirstDataRendered={onFirstDataRendered}
          ></AgGridReact>
        </div>
        <div
          id="chart1"
          style={{ flex: '1 1 auto', overflow: 'hidden', height: '30%' }}
        ></div>
        <div
          style={{
            display: 'flex',
            flex: '1 1 auto',
            overflow: 'hidden',
            height: '30%',
          }}
        >
          <div
            id="chart2"
            style={{ flex: '1 1 auto', overflow: 'hidden', width: '50%' }}
          ></div>
          <div
            id="chart3"
            style={{ flex: '1 1 auto', overflow: 'hidden', width: '50%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
