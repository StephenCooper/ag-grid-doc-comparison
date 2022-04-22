'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  GridReadyEvent,
  IServerSideDatasource,
  IServerSideGetRowsRequest,
  ServerSideStoreType,
} from '@ag-grid-community/core';
import CustomLoadingCellRenderer from './customLoadingCellRenderer';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule]);

const getServerSideDatasource: (server: any) => IServerSideDatasource = (
  server: any
) => {
  return {
    getRows: (params) => {
      // adding delay to simulate real server call
      setTimeout(() => {
        const response = server.getResponse(params.request);
        if (response.success) {
          // call the success callback
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 2000);
    },
  };
};

const getFakeServer: (allData: any[]) => any = (allData: any[]) => {
  return {
    getResponse: (request: IServerSideGetRowsRequest) => {
      console.log(
        'asking for rows: ' + request.startRow + ' to ' + request.endRow
      );
      // take a slice of the total rows
      const rowsThisPage = allData.slice(request.startRow, request.endRow);
      // if on or after the last page, work out the last row.
      const lastRow =
        allData.length <= (request.endRow || 0) ? allData.length : -1;
      return {
        success: true,
        rows: rowsThisPage,
        lastRow: lastRow,
      };
    },
  };
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'id' },
    { field: 'athlete', width: 150 },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
    };
  }, []);
  const loadingCellRenderer = useMemo<any>(() => {
    return CustomLoadingCellRenderer;
  }, []);
  const loadingCellRendererParams = useMemo<any>(() => {
    return {
      loadingMessage: 'One moment please...',
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => {
        // add id to data
        let idSequence = 0;
        data.forEach((item: any) => {
          item.id = idSequence++;
        });
        const server: any = getFakeServer(data);
        const datasource: IServerSideDatasource = getServerSideDatasource(
          server
        );
        params.api!.setServerSideDatasource(datasource);
      });
  }, []);

  return (
    <div style={containerStyle}>
      <div
        style={{ height: '100%', paddingTop: '25px', boxSizing: 'border-box' }}
      >
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            loadingCellRenderer={loadingCellRenderer}
            loadingCellRendererParams={loadingCellRendererParams}
            rowModelType={'serverSide'}
            serverSideStoreType={'partial'}
            cacheBlockSize={100}
            maxBlocksInCache={10}
            animateRows={true}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
