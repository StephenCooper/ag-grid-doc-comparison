'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

const setIdText = (id, value) => {
  document.getElementById(id).innerHTML =
    value == undefined ? 'undefined' : value + '';
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'Athlete Details',
      children: [
        {
          field: 'athlete',
          width: 150,
          suppressSizeToFit: true,
          enableRowGroup: true,
          rowGroupIndex: 0,
        },
        {
          field: 'age',
          width: 90,
          minWidth: 75,
          maxWidth: 100,
          enableRowGroup: true,
        },
        {
          field: 'country',
          enableRowGroup: true,
        },
        {
          field: 'year',
          width: 90,
          enableRowGroup: true,
          pivotIndex: 0,
        },
        { field: 'sport', width: 110, enableRowGroup: true },
        {
          field: 'gold',
          enableValue: true,
          suppressMenu: true,
          filter: 'agNumberColumnFilter',
          aggFunc: 'sum',
        },
        {
          field: 'silver',
          enableValue: true,
          suppressMenu: true,
          filter: 'agNumberColumnFilter',
          aggFunc: 'sum',
        },
        {
          field: 'bronze',
          enableValue: true,
          suppressMenu: true,
          filter: 'agNumberColumnFilter',
          aggFunc: 'sum',
        },
        {
          field: 'total',
          enableValue: true,
          suppressMenu: true,
          filter: 'agNumberColumnFilter',
          aggFunc: 'sum',
        },
      ],
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      floatingFilter: true,
      width: 120,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const setPivotOn = useCallback(() => {
    document.querySelector('#requiresPivot').className = '';
    document.querySelector('#requiresNotPivot').className = 'hidden';
    gridRef.current.columnApi.setPivotMode(true);
    setIdText('pivot', 'on');
  }, []);

  const setPivotOff = useCallback(() => {
    document.querySelector('#requiresPivot').className = 'hidden';
    document.querySelector('#requiresNotPivot').className = '';
    gridRef.current.columnApi.setPivotMode(false);
    setIdText('pivot', 'off');
  }, []);

  const setHeaderHeight = useCallback((value) => {
    gridRef.current.api.setHeaderHeight(value);
    setIdText('headerHeight', value);
  }, []);

  const setGroupHeaderHeight = useCallback((value) => {
    gridRef.current.api.setGroupHeaderHeight(value);
    setIdText('groupHeaderHeight', value);
  }, []);

  const setFloatingFiltersHeight = useCallback((value) => {
    gridRef.current.api.setFloatingFiltersHeight(value);
    setIdText('floatingFiltersHeight', value);
  }, []);

  const setPivotGroupHeaderHeight = useCallback((value) => {
    gridRef.current.api.setPivotGroupHeaderHeight(value);
    setIdText('pivotGroupHeaderHeight', value);
  }, []);

  const setPivotHeaderHeight = useCallback((value) => {
    gridRef.current.api.setPivotHeaderHeight(value);
    setIdText('pivotHeaderHeight', value);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="button-bar example-header">
          <table>
            <tbody>
              <tr>
                <td>
                  pivot (<span id="pivot">off</span>)
                </td>
                <td>
                  <button onClick={setPivotOn}>on</button>
                  <button onClick={setPivotOff}>off</button>
                </td>
              </tr>
              <tr>
                <td>
                  groupHeaderHeight (
                  <span id="groupHeaderHeight">undefined</span>)
                </td>
                <td>
                  <button onClick={() => setGroupHeaderHeight(40)}>40px</button>
                  <button onClick={() => setGroupHeaderHeight(60)}>60px</button>
                  <button onClick={() => setGroupHeaderHeight(undefined)}>
                    undefined
                  </button>
                </td>
                <td>
                  headerHeight (<span id="headerHeight">undefined</span>)
                </td>
                <td>
                  <button onClick={() => setHeaderHeight(70)}>70px</button>
                  <button onClick={() => setHeaderHeight(80)}>80px</button>
                  <button onClick={() => setHeaderHeight(undefined)}>
                    undefined
                  </button>
                </td>
              </tr>
              <tr id="requiresPivot" className="hidden">
                <td>
                  {' '}
                  pivotGroupHeaderHeight (
                  <span id="pivotGroupHeaderHeight">undefined</span>)
                </td>
                <td>
                  <button onClick={() => setPivotGroupHeaderHeight(50)}>
                    50px
                  </button>
                  <button onClick={() => setPivotGroupHeaderHeight(70)}>
                    70px
                  </button>
                  <button onClick={() => setPivotGroupHeaderHeight(undefined)}>
                    undefined
                  </button>
                </td>
                <td>
                  pivotHeaderHeight (
                  <span id="pivotHeaderHeight">undefined</span>)
                </td>
                <td>
                  <button onClick={() => setPivotHeaderHeight(60)}>60px</button>
                  <button onClick={() => setPivotHeaderHeight(80)}>80px</button>
                  <button onClick={() => setPivotHeaderHeight(undefined)}>
                    undefined
                  </button>
                </td>
              </tr>
              <tr id="requiresNotPivot">
                <td>
                  floatingFiltersHeight (
                  <span id="floatingFiltersHeight">undefined</span>)
                </td>
                <td>
                  <button onClick={() => setFloatingFiltersHeight(35)}>
                    35px
                  </button>
                  <button onClick={() => setFloatingFiltersHeight(55)}>
                    55px
                  </button>
                  <button onClick={() => setFloatingFiltersHeight(undefined)}>
                    undefined
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
