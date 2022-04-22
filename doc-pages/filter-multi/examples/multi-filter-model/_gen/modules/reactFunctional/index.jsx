'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MultiFilterModule,
  SetFilterModule,
  MenuModule,
  ClipboardModule,
]);

var dateFilterParams = {
  filters: [
    {
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: function (filterDate, cellValue) {
          if (cellValue == null) return -1;
          return getDate(cellValue).getTime() - filterDate.getTime();
        },
      },
    },
    {
      filter: 'agSetColumnFilter',
      filterParams: {
        comparator: function (a, b) {
          return getDate(a).getTime() - getDate(b).getTime();
        },
      },
    },
  ],
};

const getDate = (value) => {
  var dateParts = value.split('/');
  return new Date(
    Number(dateParts[2]),
    Number(dateParts[1]) - 1,
    Number(dateParts[0])
  );
};

var savedFilterState;

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', filter: 'agMultiColumnFilter' },
    {
      field: 'country',
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
            filterParams: {
              defaultOption: 'startsWith',
            },
          },
          {
            filter: 'agSetColumnFilter',
          },
        ],
      },
    },
    {
      field: 'gold',
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agNumberColumnFilter',
          },
          {
            filter: 'agSetColumnFilter',
          },
        ],
      },
    },
    {
      field: 'date',
      filter: 'agMultiColumnFilter',
      filterParams: dateFilterParams,
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 200,
      resizable: true,
      menuTabs: ['filterMenuTab'],
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const printState = useCallback(() => {
    var filterState = gridRef.current.api.getFilterModel();
    console.log('Current filter state: ', filterState);
  }, []);

  const saveState = useCallback(() => {
    savedFilterState = gridRef.current.api.getFilterModel();
    console.log('Filter state saved');
  }, []);

  const restoreState = useCallback(() => {
    gridRef.current.api.setFilterModel(savedFilterState);
    console.log('Filter state restored');
  }, []);

  const resetState = useCallback(() => {
    gridRef.current.api.setFilterModel(null);
    console.log('Filter state reset');
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '1rem' }}>
          <button onClick={printState}>Print State</button>
          <button onClick={saveState}>Save State</button>
          <button onClick={restoreState}>Restore State</button>
          <button onClick={resetState}>Reset State</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
