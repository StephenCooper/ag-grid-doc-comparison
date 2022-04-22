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
    { field: 'country', width: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
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
  const chartThemes = useMemo<string[]>(() => {
    return ['ag-pastel', 'ag-material-dark', 'ag-vivid-dark', 'ag-solar'];
  }, []);
  const chartThemeOverrides = useMemo<AgChartThemeOverrides>(() => {
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

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    var createRangeChartParams: CreateRangeChartParams = {
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 79,
        columns: ['country', 'gold', 'silver', 'bronze'],
      },
      chartType: 'groupedColumn',
      chartContainer: document.querySelector('#myChart') as any,
      aggFunc: 'sum',
    };
    gridRef.current!.api.createRangeChart(createRangeChartParams);
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
