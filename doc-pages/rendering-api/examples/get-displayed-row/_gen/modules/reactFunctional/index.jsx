'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', minWidth: 180 },
    { field: 'age' },
    { field: 'country', minWidth: 150 },
    { headerName: 'Group', valueGetter: 'data.country.charAt(0)' },
    { field: 'year' },
    { field: 'date', minWidth: 150 },
    { field: 'sport', minWidth: 180 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: true,
      filter: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(data.slice(0, 100));
      });
  }, []);

  const getDisplayedRowAtIndex = useCallback(() => {
    var rowNode = gridRef.current.api.getDisplayedRowAtIndex(0);
    console.log(
      'getDisplayedRowAtIndex(0) => ' +
        rowNode.data.athlete +
        ' ' +
        rowNode.data.year
    );
  }, []);

  const getDisplayedRowCount = useCallback(() => {
    var count = gridRef.current.api.getDisplayedRowCount();
    console.log('getDisplayedRowCount() => ' + count);
  }, []);

  const printAllDisplayedRows = useCallback(() => {
    var count = gridRef.current.api.getDisplayedRowCount();
    console.log('## printAllDisplayedRows');
    for (var i = 0; i < count; i++) {
      var rowNode = gridRef.current.api.getDisplayedRowAtIndex(i);
      console.log('row ' + i + ' is ' + rowNode.data.athlete);
    }
  }, []);

  const printPageDisplayedRows = useCallback(() => {
    var rowCount = gridRef.current.api.getDisplayedRowCount();
    var lastGridIndex = rowCount - 1;
    var currentPage = gridRef.current.api.paginationGetCurrentPage();
    var pageSize = gridRef.current.api.paginationGetPageSize();
    var startPageIndex = currentPage * pageSize;
    var endPageIndex = (currentPage + 1) * pageSize - 1;
    if (endPageIndex > lastGridIndex) {
      endPageIndex = lastGridIndex;
    }
    console.log('## printPageDisplayedRows');
    for (var i = startPageIndex; i <= endPageIndex; i++) {
      var rowNode = gridRef.current.api.getDisplayedRowAtIndex(i);
      console.log('row ' + i + ' is ' + rowNode.data.athlete);
    }
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <button onClick={getDisplayedRowAtIndex}>Get Displayed Row 0</button>
          <button onClick={getDisplayedRowCount}>
            Get Displayed Row Count
          </button>
          <button onClick={printAllDisplayedRows}>
            Print All Displayed Rows
          </button>
          <button onClick={printPageDisplayedRows}>
            Print Page Displayed Rows
          </button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationAutoPageSize={true}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
