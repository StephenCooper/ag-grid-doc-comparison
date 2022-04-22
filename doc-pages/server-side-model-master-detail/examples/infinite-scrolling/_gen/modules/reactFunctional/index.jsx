'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ServerSideRowModelModule,
  ClientSideRowModelModule,
  MasterDetailModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

const getServerSideDatasource = (server) => {
  return {
    getRows: function (params) {
      // adding delay to simulate real server call
      setTimeout(function () {
        var response = server.getResponse(params.request);
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
      }, 500);
    },
  };
};

const getFakeServer = (allData) => {
  return {
    getResponse: function (request) {
      console.log(
        'asking for rows: ' + request.startRow + ' to ' + request.endRow
      );
      // take a slice of the total rows
      var rowsThisPage = allData.slice(request.startRow, request.endRow);
      // if row count is known, it's possible to skip over blocks
      var lastRow = allData.length;
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

  const [columnDefs, setColumnDefs] = useState([
    // group cell renderer needed for expand / collapse icons
    { field: 'accountId', cellRenderer: 'agGroupCellRenderer' },
    { field: 'name' },
    { field: 'country' },
    { field: 'calls' },
    { field: 'totalDuration' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
    };
  }, []);
  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        columnDefs: [
          { field: 'callId' },
          { field: 'direction' },
          { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
          { field: 'switchCode', minWidth: 150 },
          { field: 'number', minWidth: 180 },
        ],
        defaultColDef: {
          flex: 1,
        },
      },
      getDetailRowData: function (params) {
        // supply details records to detail cell renderer (i.e. detail grid)
        params.successCallback(params.data.callRecords);
      },
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/call-data.json')
      .then((resp) => resp.json())
      .then((data) => {
        var server = getFakeServer(data);
        var datasource = getServerSideDatasource(server);
        params.api.setServerSideDatasource(datasource);
      });

    setTimeout(function () {
      // expand some master row
      var someRow = params.api.getRowNode('1');
      if (someRow) {
        someRow.setExpanded(true);
      }
    }, 1000);
  }, []);

  return (
    <div style={containerStyle}>
      <div style={{ height: '100%', boxSizing: 'border-box' }}>
        <div style={gridStyle} className="ag-theme-alpine-dark">
          <AgGridReact
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            rowModelType={'serverSide'}
            serverSideStoreType={'partial'}
            masterDetail={true}
            detailCellRendererParams={detailCellRendererParams}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
