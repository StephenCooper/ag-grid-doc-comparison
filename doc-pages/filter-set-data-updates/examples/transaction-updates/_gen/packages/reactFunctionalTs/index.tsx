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
  return [
    { col1: 'A' },
    { col1: 'A' },
    { col1: 'B' },
    { col1: 'B' },
    { col1: 'C' },
    { col1: 'C' },
  ];
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
      editable: true,
      flex: 1,
    },
  ]);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    ((gridRef.current!.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).expandFilters();
  }, []);

  const updateFirstRow = useCallback(() => {
    var firstRow = gridRef.current!.api.getDisplayedRowAtIndex(0);
    if (firstRow) {
      var firstRowData = firstRow.data;
      firstRowData['col1'] += 'X';
      gridRef.current!.api.applyTransaction({ update: [firstRowData] });
    }
  }, []);

  const addDRow = useCallback(() => {
    gridRef.current!.api.applyTransaction({ add: [{ col1: 'D' }] });
  }, []);

  const reset = useCallback(() => {
    gridRef.current!.api.setFilterModel(null);
    gridRef.current!.api.setRowData(getRowData());
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <label>Transaction Updates: </label>
          <button onClick={updateFirstRow}>Update First Displayed Row</button>
          <button onClick={addDRow}>Add New 'D' Row</button>
          <button onClick={reset} style={{ marginLeft: '20px' }}>
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
