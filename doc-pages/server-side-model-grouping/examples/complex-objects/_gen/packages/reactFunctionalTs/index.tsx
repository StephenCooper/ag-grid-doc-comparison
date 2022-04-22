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
  Grid,
  GridOptions,
  GridReadyEvent,
  IServerSideDatasource,
  ServerSideStoreType,
} from 'ag-grid-community';

declare var FakeServer: any;

const getServerSideDatasource: (server: any) => IServerSideDatasource = (
  server: any
) => {
  return {
    getRows: function (params) {
      console.log('[Datasource] - rows requested by grid: ', params.request);
      var response = server.getData(params.request);
      // convert country to a complex object
      var resultsWithComplexObjects = response.rows.map(function (row: any) {
        row.country = {
          name: row.country,
          code: row.country.substring(0, 3).toUpperCase(),
        };
        return row;
      });
      // adding delay to simulate real server call
      setTimeout(function () {
        if (response.success) {
          // call the success callback
          params.success({
            rowData: resultsWithComplexObjects,
            rowCount: response.lastRow,
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 200);
    },
  };
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    // here we are using a valueGetter to get the country name from the complex object
    {
      colId: 'country',
      valueGetter: 'data.country.name',
      rowGroup: true,
      hide: true,
    },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 150,
      resizable: true,
      sortable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 280,
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
          animateRows={true}
          suppressAggFuncInHeader={true}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
