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
  IsRowFilterable,
} from 'ag-grid-community';

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'country', rowGroup: true, hide: true },
    { field: 'sport', rowGroup: true, hide: true },
    { field: 'athlete', hide: true },
    { field: 'year' },
    { field: 'total', aggFunc: 'sum', filter: 'agNumberColumnFilter' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      filter: true,
      floatingFilter: true,
      resizable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      field: 'athlete',
    };
  }, []);
  const groupAggFiltering = useMemo<boolean | IsRowFilterable>(() => {
    return (params) => !!params.node.group;
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          groupDefaultExpanded={-1}
          groupAggFiltering={groupAggFiltering}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
