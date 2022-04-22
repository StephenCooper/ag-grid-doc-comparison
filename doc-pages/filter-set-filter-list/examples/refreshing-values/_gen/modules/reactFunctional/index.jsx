'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

var list1 = ['Elephant', 'Lion', 'Monkey'];

var list2 = ['Elephant', 'Giraffe', 'Tiger'];

var valuesArray = list1.slice();

var valuesCallbackList = list1;

const valuesCallback = (params) => {
  setTimeout(function () {
    params.success(valuesCallbackList);
  }, 1000);
};

var arrayFilterParams = {
  values: valuesArray,
};

var callbackFilterParams = {
  values: valuesCallback,
  refreshValuesOnOpen: true,
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    {
      colId: 'array',
      headerName: 'Values Array',
      field: 'animal',
      filter: 'agSetColumnFilter',
      filterParams: arrayFilterParams,
    },
    {
      colId: 'callback',
      headerName: 'Values Callback',
      field: 'animal',
      filter: 'agSetColumnFilter',
      filterParams: callbackFilterParams,
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filter: true,
      resizable: true,
    };
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.getToolPanelInstance('filters').expandFilters();
  }, []);

  const useList1 = useCallback(() => {
    console.log('Updating values to ' + list1);
    valuesArray.length = 0;
    list1.forEach(function (value) {
      valuesArray.push(value);
    });
    var filter = gridRef.current.api.getFilterInstance('array');
    filter.refreshFilterValues();
    valuesCallbackList = list1;
  }, [list1]);

  const useList2 = useCallback(() => {
    console.log('Updating values to ' + list2);
    valuesArray.length = 0;
    list2.forEach(function (value) {
      valuesArray.push(value);
    });
    var filter = gridRef.current.api.getFilterInstance('array');
    filter.refreshFilterValues();
    valuesCallbackList = list2;
  }, [list2]);

  return (
    <div style={containerStyle}>
      <div id="container">
        <div id="header">
          <button onClick={useList1}>
            Use <code>['Elephant', 'Lion', 'Monkey']</code>
          </button>
          <button onClick={useList2}>
            Use <code>['Elephant', 'Giraffe', 'Tiger']</code>
          </button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            sideBar={'filters'}
            onFirstDataRendered={onFirstDataRendered}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
