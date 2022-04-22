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
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
  RowGroupingModule,
]);

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    { field: 'country', width: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
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
  const chartThemes = useMemo(() => {
    return ['ag-pastel', 'ag-material-dark', 'ag-vivid-dark', 'ag-solar'];
  }, []);
  const chartThemeOverrides = useMemo(() => {
    return {
      cartesian: {
        axes: {
          category: {
            label: {
              rotation: 335,
            },
          },
        },
      },
    };
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    var createRangeChartParams = {
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 79,
        columns: ['country', 'gold', 'silver', 'bronze'],
      },
      chartType: 'groupedColumn',
      chartContainer: document.querySelector('#myChart'),
      aggFunc: 'sum',
    };
    gridRef.current.api.createRangeChart(createRangeChartParams);
  }, []);

  return (
    <div style={containerStyle}>
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
            chartThemes={chartThemes}
            chartThemeOverrides={chartThemeOverrides}
            onFirstDataRendered={onFirstDataRendered}
          ></AgGridReact>
        </div>
        <div id="myChart" className="my-chart"></div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
