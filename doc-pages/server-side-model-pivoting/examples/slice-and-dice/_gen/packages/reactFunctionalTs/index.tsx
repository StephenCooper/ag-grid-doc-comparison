'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import {
  ColDef,
  ColGroupDef,
  FirstDataRenderedEvent,
  Grid,
  GridOptions,
  GridReadyEvent,
  IDoesFilterPassParams,
  IFilterComp,
  IFilterParams,
  IServerSideDatasource,
  ServerSideStoreType,
  SideBarDef,
} from 'ag-grid-community';

declare function createFakeServer(data: any): any;
declare function createServerSideDatasource(
  server: any,
  gridOptions: GridOptions
): IServerSideDatasource;
declare function getCountries(): string[];

const countries = getCountries();

class CustomAgeFilter implements IFilterComp {
  eGui: any;
  filterValue: number | null = null;
  params!: IFilterParams;

  init(params: IFilterParams) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = `<div>  
          <label>    
              <input type="radio" name="ageFilterValue" ref="btAll" checked/> All  
          </label>  
          <label>    
              <input type="radio" name="ageFilterValue" ref="bt20"/> 20  
          </label>  
          <label>    
              <input type="radio" name="ageFilterValue" ref="bt22"/> 22  
          </label>
        </div>`;

    this.filterValue = null;
    this.params = params;

    // var that = this;

    this.eGui
      .querySelector('[ref="btAll"]')
      .addEventListener('change', this.onSelection.bind(this, null));
    this.eGui
      .querySelector('[ref="bt20"]')
      .addEventListener('change', this.onSelection.bind(this, 20));
    this.eGui
      .querySelector('[ref="bt22"]')
      .addEventListener('change', this.onSelection.bind(this, 22));
  }

  onSelection(value: number | null) {
    this.filterValue = value;
    this.params.filterChangedCallback();
  }

  getGui() {
    return this.eGui;
  }

  isFilterActive() {
    return this.filterValue !== null;
  }

  doesFilterPass(params: IDoesFilterPassParams) {
    // not needed for server side filtering
    const { api, colDef, column, columnApi, context } = this.params;
    const { node } = params;
    const value = this.params.valueGetter({
      api,
      colDef,
      column,
      columnApi,
      context,
      data: node.data,
      getValue: (field) => node.data[field],
      node,
    });
    return value == this.filterValue;
  }

  getModel() {
    if (this.filterValue === null) {
      return null;
    } else {
      // the format of what you return depends on your server side, just
      // return something that your server side can work with.
      return {
        filter: this.filterValue,
        type: 'equals',
      };
    }
  }

  setModel(model: any) {
    if (model && model.filter === 20) {
      this.eGui.querySelector('[ref="bt20"]').checked = true;
      this.filterValue = 20;
    } else if (model && model.filter === 22) {
      this.eGui.querySelector('[ref="bt22"]').checked = true;
      this.filterValue = 22;
    } else {
      this.eGui.querySelector('[ref="btAll"]').checked = true;
      this.filterValue = null;
    }
  }
}

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: 'athlete',
      enableRowGroup: true,
      enablePivot: true,
      filter: false,
    },
    {
      field: 'age',
      enableRowGroup: true,
      filter: CustomAgeFilter,
    },
    {
      field: 'country',
      enableRowGroup: true,
      enablePivot: true,
      rowGroup: true,
      hide: true,
      filter: 'agSetColumnFilter',
      filterParams: { values: countries },
    },
    {
      field: 'year',
      enableRowGroup: true,
      enablePivot: true,
      rowGroup: true,
      hide: true,
      filter: 'agSetColumnFilter',
      filterParams: {
        values: ['2000', '2002', '2004', '2006', '2008', '2010', '2012'],
      },
    },
    { field: 'sport', enableRowGroup: true, enablePivot: true, filter: false },
    { field: 'gold', aggFunc: 'sum', filter: false, enableValue: true },
    { field: 'silver', aggFunc: 'sum', filter: false, enableValue: true },
    { field: 'bronze', aggFunc: 'sum', filter: false, enableValue: true },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 150,
      // restrict what aggregation functions the columns can have,
      // include a custom function 'random' that just returns a
      // random number
      allowedAggFuncs: ['sum', 'min', 'max', 'random'],
      sortable: true,
      resizable: true,
      filter: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      width: 180,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => {
        const fakeServer = createFakeServer(data);
        const datasource = createServerSideDatasource(fakeServer, params);
        params.api!.setServerSideDatasource(datasource);
      });
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    gridRef.current!.api.sizeColumnsToFit();
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine-dark">
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          rowModelType={'serverSide'}
          serverSideStoreType={'partial'}
          rowGroupPanelShow={'always'}
          pivotPanelShow={'always'}
          animateRows={true}
          debug={true}
          enableRangeSelection={true}
          sideBar={true}
          suppressAggFuncInHeader={true}
          maxConcurrentDatasourceRequests={1}
          cacheBlockSize={100}
          maxBlocksInCache={2}
          purgeClosedRowNodes={true}
          onGridReady={onGridReady}
          onFirstDataRendered={onFirstDataRendered}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
