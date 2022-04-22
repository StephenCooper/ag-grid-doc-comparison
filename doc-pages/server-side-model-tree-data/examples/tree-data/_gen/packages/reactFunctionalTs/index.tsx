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
  GetServerSideGroupKey,
  Grid,
  GridOptions,
  GridReadyEvent,
  ICellRendererParams,
  IServerSideDatasource,
  IServerSideGetRowsParams,
  IServerSideGetRowsRequest,
  IsServerSideGroup,
  IsServerSideGroupOpenByDefaultParams,
  ServerSideStoreType,
} from 'ag-grid-community';

function createFakeServer(fakeServerData: any[]) {
  const fakeServer = {
    data: fakeServerData,
    getData: function (request: IServerSideGetRowsRequest) {
      const extractRowsFromData: (groupKeys: string[], data: any[]) => any = (
        groupKeys: string[],
        data: any[]
      ) => {
        if (groupKeys.length === 0) {
          return data.map(function (d) {
            return {
              group: !!d.children,
              employeeId: d.employeeId,
              employeeName: d.employeeName,
              employmentType: d.employmentType,
              jobTitle: d.jobTitle,
            };
          });
        }
        var key = groupKeys[0];
        for (var i = 0; i < data.length; i++) {
          if (data[i].employeeId === key) {
            return extractRowsFromData(
              groupKeys.slice(1),
              data[i].children.slice()
            );
          }
        }
      };
      return extractRowsFromData(request.groupKeys, this.data);
    },
  };
  return fakeServer;
}

function createServerSideDatasource(fakeServer: any) {
  const dataSource: IServerSideDatasource = {
    getRows: function (params: IServerSideGetRowsParams) {
      console.log('ServerSideDatasource.getRows: params = ', params);
      var allRows = fakeServer.getData(params.request);
      var request = params.request;
      var doingInfinite = request.startRow != null && request.endRow != null;
      var result = doingInfinite
        ? {
            rowData: allRows.slice(request.startRow, request.endRow),
            rowCount: allRows.length,
          }
        : { rowData: allRows };
      console.log('getRows: result = ', result);
      setTimeout(function () {
        params.success(result);
      }, 200);
    },
  };
  return dataSource;
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'employeeId', hide: true },
    { field: 'employeeName', hide: true },
    { field: 'jobTitle' },
    { field: 'employmentType' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      width: 240,
      filter: 'agTextColumnFilter',
      flex: 1,
    };
  }, []);
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      field: 'employeeName',
      cellRendererParams: {
        innerRenderer: function (params: ICellRendererParams) {
          // display employeeName rather than group key (employeeId)
          return params.data.employeeName;
        },
      },
    };
  }, []);
  const isServerSideGroupOpenByDefault = useCallback(function (
    params: IsServerSideGroupOpenByDefaultParams
  ) {
    // open first two levels by default
    return params.rowNode.level < 2;
  },
  []);
  const isServerSideGroup = useCallback(function (dataItem: any) {
    // indicate if node is a group
    return dataItem.group;
  }, []);
  const getServerSideGroupKey = useCallback(function (dataItem: any) {
    // specify which group key to use
    return dataItem.employeeId;
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/small-tree-data.json')
      .then((resp) => resp.json())
      .then((data: any[]) => {
        var fakeServer = createFakeServer(data);
        var datasource = createServerSideDatasource(fakeServer);
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
          treeData={true}
          animateRows={true}
          isServerSideGroupOpenByDefault={isServerSideGroupOpenByDefault}
          isServerSideGroup={isServerSideGroup}
          getServerSideGroupKey={getServerSideGroupKey}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
