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
  ColumnApi,
  Grid,
  GridOptions,
  GridReadyEvent,
  IServerSideDatasource,
  IServerSideGetRowsRequest,
  ServerSideStoreType,
} from 'ag-grid-community';

declare var FakeServer: any;

const getServerSideDatasource: (server: any) => IServerSideDatasource = (
  server: any
) => {
  return {
    getRows: (params) => {
      var request = params.request;
      console.log('[Datasource] - rows requested by grid: ', params.request);
      var response = server.getData(request);
      // add pivot colDefs in the grid based on the resulting data
      addPivotColDefs(request, response, params.columnApi);
      // simulating real server call with a 500ms delay
      setTimeout(function () {
        if (response.success) {
          // supply data to grid
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          params.fail();
        }
      }, 500);
    },
  };
};

function addPivotColDefs(
  request: IServerSideGetRowsRequest,
  response: any,
  columnApi: ColumnApi
) {
  // check if pivot colDefs already exist
  var existingPivotColDefs = columnApi.getSecondaryColumns();
  if (existingPivotColDefs && existingPivotColDefs.length > 0) {
    return;
  }
  // create pivot colDef's based of data returned from the server
  var pivotColDefs = createPivotColDefs(request, response.pivotFields);
  // supply secondary columns to the grid
  columnApi.setSecondaryColumns(pivotColDefs);
}

function createPivotColDefs(
  request: IServerSideGetRowsRequest,
  pivotFields: string[]
) {
  function addColDef(
    colId: string,
    parts: string[],
    res: (ColDef | ColGroupDef)[]
  ) {
    if (parts.length === 0) return [];
    var first = parts.shift();
    var existing: ColGroupDef = res.filter(function (r: ColDef | ColGroupDef) {
      return 'groupId' in r && r.groupId === first;
    })[0] as ColGroupDef;
    if (existing) {
      existing['children'] = addColDef(colId, parts, existing.children);
    } else {
      var colDef: any = {};
      var isGroup = parts.length > 0;
      if (isGroup) {
        colDef['groupId'] = first;
        colDef['headerName'] = first;
      } else {
        var valueCol = request.valueCols.filter(function (r) {
          return r.field === first;
        })[0];
        colDef['colId'] = colId;
        colDef['headerName'] = valueCol.displayName;
        colDef['field'] = colId;
      }
      var children = addColDef(colId, parts, []);
      children.length > 0 ? (colDef['children'] = children) : null;
      res.push(colDef);
    }
    return res;
  }
  if (request.pivotMode && request.pivotCols.length > 0) {
    var secondaryCols: ColGroupDef[] = [];
    pivotFields.forEach(function (field) {
      addColDef(field, field.split('_'), secondaryCols);
    });
    return secondaryCols;
  }
  return [];
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'country', rowGroup: true },
    { field: 'sport', rowGroup: true },
    { field: 'year', pivot: true },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      width: 150,
      resizable: true,
      sortable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      minWidth: 200,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => {
        // setup the fake server with entire dataset
        var fakeServer = new FakeServer(data);
        // create datasource with a reference to the fake server
        var datasource = getServerSideDatasource(fakeServer);
        // register the datasource with the grid
        params.api!.setServerSideDatasource(datasource);
      });
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine-dark">
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          rowModelType={'serverSide'}
          serverSideStoreType={'partial'}
          pivotMode={true}
          animateRows={true}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
