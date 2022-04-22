'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

var chartPanelTemplate =
  '<div class="chart-wrapper ag-theme-alpine">' +
  '<div class="chart-wrapper-top">' +
  '<span class="chart-wrapper-title"></span>' +
  '<button class="chart-wrapper-close">Destroy Chart</button>' +
  '</div>' +
  '<div class="chart-wrapper-body"></div>' +
  '</div>';

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '300px', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', width: 150, chartDataType: 'category' },
    { field: 'gold', chartDataType: 'series' },
    { field: 'silver', chartDataType: 'series' },
    { field: 'bronze', chartDataType: 'series' },
    { field: 'total', chartDataType: 'series' },
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

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/wide-spread-of-sports.json')
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(data);
      });
  }, []);

  const createChartContainer = useCallback(
    (chartRef) => {
      var eChart = chartRef.chartElement;
      var eTemp = document.createElement('div');
      eTemp.innerHTML = chartPanelTemplate;
      var eChartWrapper = eTemp.firstChild;
      var eParent = document.querySelector('#container');
      eParent.appendChild(eChartWrapper);
      eChartWrapper.querySelector('.chart-wrapper-body').appendChild(eChart);
      eChartWrapper.querySelector('.chart-wrapper-title').innerText =
        'Chart Created At ' + new Date();
      eChartWrapper
        .querySelector('.chart-wrapper-close')
        .addEventListener('click', function () {
          chartRef.destroyChart();
          eParent.removeChild(eChartWrapper);
        });
    },
    [chartPanelTemplate]
  );

  return (
    <div style={containerStyle}>
      <div id="container">
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            enableRangeSelection={true}
            enableCharts={true}
            popupParent={popupParent}
            createChartContainer={createChartContainer}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
