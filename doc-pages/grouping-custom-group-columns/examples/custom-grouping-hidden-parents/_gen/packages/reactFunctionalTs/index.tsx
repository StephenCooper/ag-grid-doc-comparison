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
  RowGroupingDisplayType,
  ValueGetterParams,
} from 'ag-grid-community';

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: 'Country',
      showRowGroup: 'country',
      cellRenderer: 'agGroupCellRenderer',
      minWidth: 200,
    },
    {
      headerName: 'Year',
      valueGetter: (params: ValueGetterParams) => {
        if (params.data) {
          return params.data.year;
        }
      },
      showRowGroup: 'year',
      cellRenderer: 'agGroupCellRenderer',
    },
    { field: 'athlete', minWidth: 200 },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
    { field: 'total', aggFunc: 'sum' },
    { field: 'country', rowGroup: true, hide: true },
    { field: 'year', rowGroup: true, hide: true },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 150,
      sortable: true,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => setRowData(data));
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          <span className="legend-item ag-row-level-0"></span>
          <span className="legend-label">Top Level Group</span>
          <span className="legend-item ag-row-level-1"></span>
          <span className="legend-label">Second Level Group</span>
          <span className="legend-item ag-row-level-2"></span>
          <span className="legend-label">Bottom Rows</span>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            groupDisplayType={'custom'}
            groupHideOpenParents={true}
            enableRangeSelection={true}
            animateRows={true}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
