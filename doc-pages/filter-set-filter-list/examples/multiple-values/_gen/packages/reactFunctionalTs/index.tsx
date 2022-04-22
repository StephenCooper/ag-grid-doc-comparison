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
  KeyCreatorParams,
  SideBarDef,
  ValueFormatterParams,
  ValueGetterParams,
} from 'ag-grid-community';

var valueGetter = function (params: ValueGetterParams) {
  return params.data['animalsString'].split('|');
};

var valueFormatter = function (params: ValueFormatterParams) {
  return params.value
    .map(function (animal: any) {
      return animal.name;
    })
    .join(', ');
};

var keyCreator = function (params: KeyCreatorParams) {
  return params.value.map(function (animal: any) {
    return animal.name;
  });
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: 'Animals (array)',
      field: 'animalsArray',
      filter: 'agSetColumnFilter',
    },
    {
      headerName: 'Animals (string)',
      filter: 'agSetColumnFilter',
      valueGetter: valueGetter,
    },
    {
      headerName: 'Animals (objects)',
      field: 'animalsObjects',
      filter: 'agSetColumnFilter',
      valueFormatter: valueFormatter,
      keyCreator: keyCreator,
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          sideBar={'filters'}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
