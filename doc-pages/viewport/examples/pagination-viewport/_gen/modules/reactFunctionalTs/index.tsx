'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  GetRowIdFunc,
  GetRowIdParams,
  Grid,
  GridOptions,
  GridReadyEvent,
  ICellRendererComp,
  ICellRendererParams,
  IViewportDatasource,
  ValueFormatterParams,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ViewportRowModelModule } from '@ag-grid-enterprise/viewport-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ViewportRowModelModule]);

declare function createMockServer(): any;
declare function createViewportDatasource(mockServer: any): IViewportDatasource;

function numberFormatter(params: ValueFormatterParams) {
  if (typeof params.value === 'number') {
    return params.value.toFixed(2);
  } else {
    return params.value;
  }
}

class RowIndexRenderer implements ICellRendererComp {
  eGui!: HTMLDivElement;
  init(params: ICellRendererParams) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = '' + params.rowIndex;
  }
  refresh(params: ICellRendererParams): boolean {
    return false;
  }
  getGui(): HTMLElement {
    return this.eGui;
  }
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    // this col shows the row index, doesn't use any data from the row
    {
      headerName: '#',
      maxWidth: 80,
      cellRenderer: RowIndexRenderer,
    },
    { field: 'code', maxWidth: 90 },
    { field: 'name', minWidth: 220 },
    {
      field: 'bid',
      cellClass: 'cell-number',
      valueFormatter: numberFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      field: 'mid',
      cellClass: 'cell-number',
      valueFormatter: numberFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      field: 'ask',
      cellClass: 'cell-number',
      valueFormatter: numberFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      field: 'volume',
      cellClass: 'cell-number',
      cellRenderer: 'agAnimateSlideCellRenderer',
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 140,
      resizable: true,
    };
  }, []);
  const getRowId = useCallback(function (params: GetRowIdParams) {
    // the code is unique, so perfect for the id
    return params.data.code;
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/stocks.json')
      .then((resp) => resp.json())
      .then((data: any[]) => {
        // set up a mock server - real code will not do this, it will contact your
        // real server to get what it needs
        var mockServer = createMockServer();
        mockServer.init(data);
        var viewportDatasource = createViewportDatasource(mockServer);
        params.api!.setViewportDatasource(viewportDatasource);
        // put the 'size cols to fit' into a timeout, so that the scroll is taken into consideration
        setTimeout(function () {
          params.api!.sizeColumnsToFit();
        }, 100);
      });
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection={true}
          rowModelType={'viewport'}
          pagination={true}
          paginationAutoPageSize={true}
          viewportRowModelPageSize={1}
          viewportRowModelBufferSize={0}
          getRowId={getRowId}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
