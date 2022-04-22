'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const numberValueParser = (params) => {
  var res = Number.parseInt(params.newValue);
  if (isNaN(res)) {
    return undefined;
  }
  return res;
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '30%', width: '100%' }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
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

  const onFirstDataRendered = useCallback((event) => {
    var eContainer1 = document.querySelector('#chart1');
    var params1 = {
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 4,
        columns: ['country', 'gold', 'silver'],
      },
      chartType: 'groupedBar',
      chartContainer: eContainer1,
    };
    event.api.createRangeChart(params1);
    var eContainer2 = document.querySelector('#chart2');
    var params2 = {
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
    var eContainer3 = document.querySelector('#chart3');
    var params3 = {
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

  const getChartToolbarItems = useCallback((params) => {
    return [];
  }, []);

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
