'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  BarFormat,
  BarFormatterParams,
  BarSparklineOptions,
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  LabelFormatterParams,
} from 'ag-grid-community';

const formatter: (params: BarFormatterParams) => BarFormat = (
  params: BarFormatterParams
) => {
  const { yValue } = params;
  return {
    fill: yValue <= 20 ? '#4fa2d9' : yValue < 60 ? '#277cb5' : '#195176',
  };
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'symbol', maxWidth: 120 },
    { field: 'name', minWidth: 250 },
    {
      field: 'change',
      cellRenderer: 'agSparklineCellRenderer',
      cellRendererParams: {
        sparklineOptions: {
          type: 'bar',
          label: {
            enabled: true,
            color: 'white',
            fontSize: 10,
            fontWeight: 'bold',
            formatter: function (params: LabelFormatterParams) {
              return `${params.value}%`;
            },
          },
          paddingOuter: 0,
          padding: {
            top: 0,
            bottom: 0,
          },
          valueAxisDomain: [0, 100],
          axis: {
            strokeWidth: 0,
          },
          tooltip: {
            enabled: false,
          },
          formatter: formatter,
        },
      },
    },
    {
      field: 'volume',
      type: 'numericColumn',
      maxWidth: 140,
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowHeight={50}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
