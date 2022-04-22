'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  AreaSparklineOptions,
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  TooltipRendererParams,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SparklinesModule } from '@ag-grid-enterprise/sparklines';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, SparklinesModule]);

function renderer(params: TooltipRendererParams) {
  return {
    backgroundColor: 'black',
    opacity: 0.5,
    color: 'white',
  };
}

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
          type: 'area',
          fill: 'rgba(185,173,77,0.3)',
          line: {
            stroke: 'rgb(185,173,77)',
          },
          highlightStyle: {
            size: 4,
            stroke: 'rgb(185,173,77)',
            fill: 'rgb(185,173,77)',
          },
          tooltip: {
            renderer: renderer,
          },
          crosshairs: {
            xLine: {
              enabled: true,
              lineDash: 'dash',
              stroke: 'rgba(0, 0, 0, 0.5)',
            },
            yLine: {
              enabled: true,
              lineDash: 'dash',
              stroke: 'rgba(0, 0, 0, 0.5)',
            },
          },
        } as AreaSparklineOptions,
      },
    },
    {
      field: 'rateOfChange',
      cellRenderer: 'agSparklineCellRenderer',
      cellRendererParams: {
        sparklineOptions: {
          type: 'area',
          fill: 'rgba(77,89,185, 0.3)',
          line: {
            stroke: 'rgb(77,89,185)',
          },
          highlightStyle: {
            size: 4,
            stroke: 'rgb(77,89,185)',
            fill: 'rgb(77,89,185)',
          },
          tooltip: {
            renderer: renderer,
          },
          crosshairs: {
            xLine: {
              enabled: false,
            },
          },
        } as AreaSparklineOptions,
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
