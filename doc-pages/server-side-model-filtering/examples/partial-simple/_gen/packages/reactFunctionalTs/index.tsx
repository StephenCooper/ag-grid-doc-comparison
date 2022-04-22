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
      // get data for request from our fake server
      var response = server.getData(params.request);
      // simulating real server call with a 500ms delay
      setTimeout(function () {
        if (response.success) {
          // supply rows for requested block to grid
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

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: 'athlete',
      filter: 'agTextColumnFilter',
      minWidth: 220,
    },
    {
      field: 'year',
      filter: 'agNumberColumnFilter',
      filterParams: {
        buttons: ['reset'],
        debounceMs: 1000,
        suppressAndOrCondition: true,
      },
    },
    { field: 'gold', type: 'number' },
    { field: 'silver', type: 'number' },
    { field: 'bronze', type: 'number' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: true,
      resizable: true,
      menuTabs: ['filterMenuTab'],
    };
  }, []);
  const columnTypes = useMemo<{
    [key: string]: ColDef;
  }>(() => {
    return {
      number: { filter: 'agNumberColumnFilter' },
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
          columnTypes={columnTypes}
          rowModelType={'serverSide'}
          serverSideStoreType={'partial'}
          animateRows={true}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
