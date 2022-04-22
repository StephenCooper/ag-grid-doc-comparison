'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  GetRowIdFunc,
  GetRowIdParams,
  Grid,
  GridOptions,
  GridReadyEvent,
  IAggFuncParams,
  IDoesFilterPassParams,
  IFilterComp,
  IFilterParams,
  IFilterType,
  IsGroupOpenByDefaultParams,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

declare var LINUX_DISTROS: string[];
declare var CITIES: string[];
declare var LAPTOPS: string[];

var aggCallCount = 0;

var compareCallCount = 0;

var filterCallCount = 0;

var idCounter = 0;

function myAggFunc(params: IAggFuncParams) {
  aggCallCount++;
  var total = 0;
  for (var i = 0; i < params.values.length; i++) {
    total += params.values[i];
  }
  return total;
}

function myComparator(a: any, b: any) {
  compareCallCount++;
  return a < b ? -1 : 1;
}

const getMyFilter: () => IFilterType = () => {
  class MyFilter implements IFilterComp {
    filterParams!: IFilterParams;
    filterValue!: number | null;
    eGui: any;
    eInput: any;
    init(params: IFilterParams) {
      this.filterParams = params;
      this.filterValue = null;
      this.eGui = document.createElement('div');
      this.eGui.innerHTML = '<div>Greater Than: <input type="text"/></div>';
      this.eInput = this.eGui.querySelector('input');
      this.eInput.addEventListener('input', () => {
        this.getValueFromInput();
        params.filterChangedCallback();
      });
    }
    getGui() {
      return this.eGui;
    }
    getValueFromInput() {
      var value = parseInt(this.eInput.value);
      this.filterValue = isNaN(value) ? null : value;
    }
    setModel(model: any) {
      this.eInput.value = model == null ? null : model.value;
      this.getValueFromInput();
    }
    getModel() {
      if (!this.isFilterActive()) {
        return null;
      }
      return { value: this.eInput.value };
    }
    isFilterActive() {
      return this.filterValue !== null;
    }
    doesFilterPass(params: IDoesFilterPassParams) {
      filterCallCount++;
      const { api, colDef, column, columnApi, context } = this.filterParams;
      const { node } = params;
      const value = this.filterParams.valueGetter({
        api,
        colDef,
        column,
        columnApi,
        context,
        data: node.data,
        getValue: (field) => node.data[field],
        node,
      });
      return value > (this.filterValue || 0);
    }
  }
  return MyFilter;
};

var myFilter = getMyFilter();

function timeOperation(name: string, operation: any) {
  aggCallCount = 0;
  compareCallCount = 0;
  filterCallCount = 0;
  var start = new Date().getTime();
  operation();
  var end = new Date().getTime();
  console.log(
    name +
      ' finished in ' +
      (end - start) +
      'ms, aggCallCount = ' +
      aggCallCount +
      ', compareCallCount = ' +
      compareCallCount +
      ', filterCallCount = ' +
      filterCallCount
  );
}

function letter(i: number) {
  return 'abcdefghijklmnopqrstuvwxyz'.substring(i, i + 1);
}

function randomLetter() {
  return letter(Math.floor(Math.random() * 26 + 1));
}

function getData() {
  var myRowData = [];
  for (var i = 0; i < 10000; i++) {
    var name =
      'Mr ' +
      randomLetter().toUpperCase() +
      ' ' +
      randomLetter().toUpperCase() +
      randomLetter() +
      randomLetter() +
      randomLetter() +
      randomLetter();
    var city = CITIES[i % CITIES.length];
    var distro =
      LINUX_DISTROS[i % LINUX_DISTROS.length] +
      ' v' +
      Math.floor(Math.random() * 100 + 1) / 10;
    var university = LAPTOPS[i % LAPTOPS.length];
    var value = Math.floor(Math.random() * 100) + 10; // between 10 and 110
    idCounter++;
    myRowData.push(
      createDataItem(idCounter, name, distro, university, city, value)
    );
  }
  return myRowData;
}

const createDataItem: (
  id: any,
  name: any,
  distro: any,
  laptop: any,
  city: any,
  value: any
) => any = (
  id: any,
  name: any,
  distro: any,
  laptop: any,
  city: any,
  value: any
) => {
  return {
    id: id,
    name: name,
    city: city,
    distro: distro,
    laptop: laptop,
    value: value,
  };
};

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'city', rowGroup: true, hide: true },
    { field: 'laptop', rowGroup: true, hide: true },
    { field: 'distro', sort: 'asc', comparator: myComparator },
    {
      field: 'value',
      enableCellChangeFlash: true,
      aggFunc: myAggFunc,
      filter: myFilter,
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      filter: true,
      sortable: true,
      resizable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      field: 'name',
      cellRendererParams: { checkbox: true },
    };
  }, []);
  const isGroupOpenByDefault = useCallback(function (params) {
    return ['Delhi', 'Seoul'].includes(params.key);
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.setFilterModel({
      value: { value: '50' },
    });
    timeOperation('Initialisation', function () {
      params.api.setRowData(getData());
    });
  }, []);

  const onBtDuplicate = useCallback(() => {
    var api = gridRef.current!.api!;
    // get the first child of the
    var selectedRows = api.getSelectedRows();
    if (!selectedRows || selectedRows.length === 0) {
      console.log('No rows selected!');
      return;
    }
    var newItems: any = [];
    selectedRows.forEach(function (selectedRow) {
      idCounter++;
      var newItem = createDataItem(
        idCounter,
        selectedRow.name,
        selectedRow.distro,
        selectedRow.laptop,
        selectedRow.city,
        selectedRow.value
      );
      newItems.push(newItem);
    });
    timeOperation('Duplicate', function () {
      api.applyTransaction({ add: newItems });
    });
  }, []);

  const onBtUpdate = useCallback(() => {
    var api = gridRef.current!.api!;
    // get the first child of the
    var selectedRows = api.getSelectedRows();
    if (!selectedRows || selectedRows.length === 0) {
      console.log('No rows selected!');
      return;
    }
    var updatedItems: any[] = [];
    selectedRows.forEach(function (oldItem) {
      var newValue = Math.floor(Math.random() * 100) + 10;
      var newItem = createDataItem(
        oldItem.id,
        oldItem.name,
        oldItem.distro,
        oldItem.laptop,
        oldItem.city,
        newValue
      );
      updatedItems.push(newItem);
    });
    timeOperation('Update', function () {
      api.applyTransaction({ update: updatedItems });
    });
  }, []);

  const onBtDelete = useCallback(() => {
    var api = gridRef.current!.api!;
    // get the first child of the
    var selectedRows = api.getSelectedRows();
    if (!selectedRows || selectedRows.length === 0) {
      console.log('No rows selected!');
      return;
    }
    timeOperation('Delete', function () {
      api.applyTransaction({ remove: selectedRows });
    });
  }, []);

  const onBtClearSelection = useCallback(() => {
    gridRef.current!.api.deselectAll();
  }, []);

  const getRowId = useCallback((params: GetRowIdParams) => {
    return params.data.id;
  }, []);

  return (
    <div style={containerStyle}>
      <div className="test-container">
        <div className="test-header">
          <button onClick={onBtUpdate}>Update</button>
          <button onClick={onBtDuplicate}>Duplicate</button>
          <button onClick={onBtDelete}>Delete</button>
          <button onClick={onBtClearSelection}>Clear Selection</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            getRowId={getRowId}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={'multiple'}
            groupSelectsChildren={true}
            animateRows={true}
            suppressAggAtRootLevel={true}
            suppressRowClickSelection={true}
            autoGroupColumnDef={autoGroupColumnDef}
            isGroupOpenByDefault={isGroupOpenByDefault}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
