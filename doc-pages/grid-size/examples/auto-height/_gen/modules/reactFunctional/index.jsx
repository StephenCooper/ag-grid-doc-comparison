'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

const createRow = (index) => {
  var makes = ['Toyota', 'Ford', 'BMW', 'Phantom', 'Porsche'];
  return {
    id: 'D' + (1000 + index),
    make: makes[Math.floor(Math.random() * makes.length)],
    price: Math.floor(Math.random() * 100000),
    val1: Math.floor(Math.random() * 1000),
    val2: Math.floor(Math.random() * 1000),
    val3: Math.floor(Math.random() * 1000),
    val4: Math.floor(Math.random() * 1000),
    val5: Math.floor(Math.random() * 1000),
    val6: Math.floor(Math.random() * 1000),
    val7: Math.floor(Math.random() * 1000),
    val8: Math.floor(Math.random() * 1000),
    val9: Math.floor(Math.random() * 1000),
    val10: Math.floor(Math.random() * 1000),
  };
};

const getData = (count) => {
  var rowData = [];
  for (var i = 0; i < count; i++) {
    rowData.push(createRow(i));
  }
  return rowData;
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState(getData(5));
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'Core',
      children: [
        { headerName: 'ID', field: 'id' },
        { field: 'make' },
        { field: 'price', filter: 'agNumberColumnFilter' },
      ],
    },
    {
      headerName: 'Extra',
      children: [
        { field: 'val1', filter: 'agNumberColumnFilter' },
        { field: 'val2', filter: 'agNumberColumnFilter' },
        { field: 'val3', filter: 'agNumberColumnFilter' },
        { field: 'val4', filter: 'agNumberColumnFilter' },
        { field: 'val5', filter: 'agNumberColumnFilter' },
        { field: 'val6', filter: 'agNumberColumnFilter' },
        { field: 'val7', filter: 'agNumberColumnFilter' },
        { field: 'val8', filter: 'agNumberColumnFilter' },
        { field: 'val9', filter: 'agNumberColumnFilter' },
        { field: 'val10', filter: 'agNumberColumnFilter' },
      ],
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      filter: true,
      resizable: true,
    };
  }, []);
  const popupParent = useMemo(() => {
    return document.body;
  }, []);

  const onGridReady = useCallback((params) => {
    document.querySelector('#currentRowCount').innerHTML = '5';
  }, []);

  const updateRowData = useCallback((rowCount) => {
    setRowData(getData(rowCount));
    document.querySelector('#currentRowCount').innerHTML = `${rowCount}`;
  }, []);

  const cbFloatingRows = useCallback(() => {
    var show = document.getElementById('floating-rows').checked;
    if (show) {
      gridRef.current.api.setPinnedTopRowData([createRow(999), createRow(998)]);
      gridRef.current.api.setPinnedBottomRowData([
        createRow(997),
        createRow(996),
      ]);
    } else {
      gridRef.current.api.setPinnedTopRowData();
      gridRef.current.api.setPinnedBottomRowData();
    }
  }, []);

  const setAutoHeight = useCallback(() => {
    gridRef.current.api.setDomLayout('autoHeight');
    // auto height will get the grid to fill the height of the contents,
    // so the grid div should have no height set, the height is dynamic.
    document.querySelector('#myGrid').style.height = '';
  }, []);

  const setFixedHeight = useCallback(() => {
    // we could also call setDomLayout() here as normal is the default
    gridRef.current.api.setDomLayout('normal');
    // when auto height is off, the grid ahs a fixed height, and then the grid
    // will provide scrollbars if the data does not fit into it.
    document.querySelector('#myGrid').style.height = '400px';
  }, []);

  return (
    <div>
      <div
        className="test-header"
        style={{ padding: '5px', justifyContent: 'space-between' }}
      >
        <div style={{ alignItems: 'start' }}>
          <button onClick={() => updateRowData(0)}>0 Rows</button>
          <button onClick={() => updateRowData(5)}>5 Rows</button>
          <button onClick={() => updateRowData(50)}>50 Rows</button>
        </div>
        <div style={{ alignItems: 'center' }}>
          <label>
            <input
              type="checkbox"
              id="floating-rows"
              onClick={cbFloatingRows}
              style={{ verticalAlign: 'text-top' }}
            />
            <span
              style={{
                backgroundColor: '#00e5ff',
                width: '15px',
                height: '15px',
                border: '1px solid #888',
                display: 'inline-block',
                verticalAlign: 'text-top',
              }}
            ></span>
            Pinned Rows
          </label>

          <button onClick={setAutoHeight}>Auto Height</button>
          <button onClick={setFixedHeight}>Fixed Height</button>
        </div>
        <div style={{ alignItems: 'end' }}>
          Row Count = <span id="currentRowCount"></span>
        </div>
      </div>

      <div id="myGrid" style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          domLayout={'autoHeight'}
          animateRows={true}
          popupParent={popupParent}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>

      <div
        style={{
          border: '10px solid #eee',
          padding: '10px',
          marginTop: '20px',
        }}
      >
        <p style={{ color: '#333', textAlign: 'center' }}>
          This text is under the grid and should move up and down as the height
          of the grid changes.
        </p>

        <p style={{ color: '#777' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <p style={{ color: '#777' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <p style={{ color: '#777' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
