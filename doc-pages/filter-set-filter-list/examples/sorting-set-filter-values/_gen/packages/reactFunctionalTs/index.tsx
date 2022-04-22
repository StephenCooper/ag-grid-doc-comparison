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
  GridReadyEvent,
  IFiltersToolPanel,
  SideBarDef,
} from 'ag-grid-community';

var filterParams = {
  comparator: function (a: string, b: string) {
    var valA = parseInt(a);
    var valB = parseInt(b);
    if (valA === valB) return 0;
    return valA > valB ? 1 : -1;
  },
};

function getRowData() {
  var rows = [];
  for (var i = 1; i < 117; i++) {
    rows.push({ age: i });
  }
  return rows;
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getRowData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: 'Age (No Comparator)',
      field: 'age',
      filter: 'agSetColumnFilter',
    },
    {
      headerName: 'Age (With Comparator)',
      field: 'age',
      filter: 'agSetColumnFilter',
      filterParams: filterParams,
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      filter: true,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    ((params.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).expandFilters();
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          sideBar={'filters'}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
