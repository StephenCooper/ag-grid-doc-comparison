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
  FirstDataRenderedEvent,
  Grid,
  GridOptions,
  IFiltersToolPanel,
  SideBarDef,
} from 'ag-grid-community';

function getRowData() {
  return [{ col1: 'A' }, { col1: 'A' }, { col1: 'B' }, { col1: 'C' }];
}

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getRowData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: 'Set Filter Column',
      field: 'col1',
      filter: 'agSetColumnFilter',
      flex: 1,
      editable: true,
    },
  ]);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    ((gridRef.current!.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).expandFilters();
  }, []);

  const setNewData = useCallback(() => {
    var newData = [
      { col1: 'A' },
      { col1: 'A' },
      { col1: 'B' },
      { col1: 'C' },
      { col1: 'D' },
      { col1: 'E' },
    ];
    gridRef.current!.api.setRowData(newData);
  }, []);

  const reset = useCallback(() => {
    gridRef.current!.api.setFilterModel(null);
    gridRef.current!.api.setRowData(getRowData());
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <button onClick={setNewData}>Set New Data</button>
          <button onClick={reset} style={{ marginLeft: '5px' }}>
            Reset
          </button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            sideBar={'filters'}
            onFirstDataRendered={onFirstDataRendered}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
