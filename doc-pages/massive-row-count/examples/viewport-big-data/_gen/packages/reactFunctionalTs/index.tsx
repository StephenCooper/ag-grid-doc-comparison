'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  IViewportDatasource,
  IViewportDatasourceParams,
} from 'ag-grid-community';

const createViewportDatasource: () => IViewportDatasource = () => {
  let initParams: IViewportDatasourceParams;
  return {
    init: (params: IViewportDatasourceParams) => {
      initParams = params;
      var oneMillion = 1000 * 1000;
      params.setRowCount(oneMillion);
    },
    setViewportRange(firstRow: number, lastRow: number) {
      var rowData: any = {};
      for (var rowIndex = firstRow; rowIndex <= lastRow; rowIndex++) {
        var item: any = {};
        item.id = rowIndex;
        item.a = 'A-' + rowIndex;
        item.b = 'B-' + rowIndex;
        item.c = 'C-' + rowIndex;
        rowData[rowIndex] = item;
      }
      initParams.setRowData(rowData);
    },
    destroy: () => {},
  };
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: 'ID',
      field: 'id',
    },
    {
      headerName: 'Expected Position',
      valueGetter: '"translateY(" + node.rowIndex * 100 + "px)"',
    },
    {
      field: 'a',
    },
    {
      field: 'b',
    },
    {
      field: 'c',
    },
  ]);
  const viewportDatasource = useMemo<IViewportDatasource>(() => {
    return createViewportDatasource();
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowHeight={100}
          rowModelType={'viewport'}
          viewportDatasource={viewportDatasource}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
