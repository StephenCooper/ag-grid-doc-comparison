'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'athlete', minWidth: 150 },
    { field: 'age', maxWidth: 90 },
    { field: 'country', minWidth: 150 },
    { field: 'year', maxWidth: 90 },
    { field: 'date', minWidth: 150 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => setRowData(data));
  }, []);

  const onSelectionChanged = useCallback(() => {
    var selectedRows = gridRef.current!.api.getSelectedRows();
    var selectedRowsString = '';
    var maxToShow = 5;
    selectedRows.forEach(function (selectedRow, index) {
      if (index >= maxToShow) {
        return;
      }
      if (index > 0) {
        selectedRowsString += ', ';
      }
      selectedRowsString += selectedRow.athlete;
    });
    if (selectedRows.length > maxToShow) {
      var othersCount = selectedRows.length - maxToShow;
      selectedRowsString +=
        ' and ' + othersCount + ' other' + (othersCount !== 1 ? 's' : '');
    }
    (document.querySelector(
      '#selectedRows'
    ) as any).innerHTML = selectedRowsString;
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          Selection:
          <span id="selectedRows"></span>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={'multiple'}
            onGridReady={onGridReady}
            onSelectionChanged={onSelectionChanged}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
