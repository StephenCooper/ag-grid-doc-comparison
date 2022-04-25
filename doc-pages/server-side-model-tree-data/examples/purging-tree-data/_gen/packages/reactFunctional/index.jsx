'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const createFakeServer = (fakeServerData) => {
  const fakeServer = {
    getData: (request) => {
      function extractRowsFromData(groupKeys, data) {
        if (groupKeys.length === 0) {
          return data.map(function (d) {
            return {
              group: !!d.underlings,
              employeeId: d.employeeId + '',
              employeeName: d.employeeName,
              employmentType: d.employmentType,
              startDate: d.startDate,
            };
          });
        }
        var key = groupKeys[0];
        for (var i = 0; i < data.length; i++) {
          if (data[i].employeeName === key) {
            return extractRowsFromData(
              groupKeys.slice(1),
              data[i].underlings.slice()
            );
          }
        }
      }
      return extractRowsFromData(request.groupKeys, fakeServerData);
    },
  };
  return fakeServer;
};

const createServerSideDatasource = (fakeServer) => {
  const dataSource = {
    getRows: (params) => {
      console.log('ServerSideDatasource.getRows: params = ', params);
      var request = params.request;
      var allRows = fakeServer.getData(request);
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
      }, 500);
    },
  };
  return dataSource;
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [columnDefs, setColumnDefs] = useState([
    { field: 'employeeId', hide: true },
    { field: 'employeeName', hide: true },
    { field: 'employmentType' },
    { field: 'startDate' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      width: 235,
      resizable: true,
      flex: 1,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      field: 'employeeName',
    };
  }, []);
  const isServerSideGroupOpenByDefault = useCallback((params) => {
    var isKathrynPowers =
      params.rowNode.level == 0 && params.data.employeeName == 'Kathryn Powers';
    var isMabelWard =
      params.rowNode.level == 1 && params.data.employeeName == 'Mabel Ward';
    return isKathrynPowers || isMabelWard;
  }, []);
  const isServerSideGroup = useCallback((dataItem) => {
    // indicate if node is a group
    return dataItem.group;
  }, []);
  const getServerSideGroupKey = useCallback((dataItem) => {
    // specify which group key to use
    return dataItem.employeeName;
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/tree-data.json')
      .then((resp) => resp.json())
      .then((data) => {
        var fakeServer = createFakeServer(data);
        var datasource = createServerSideDatasource(fakeServer);
        params.api.setServerSideDatasource(datasource);
      });
  }, []);

  const refreshCache = useCallback((route) => {
    gridRef.current.api.refreshServerSideStore({ route: route, purge: true });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <button onClick={() => refreshCache([])}>Refresh Everything</button>
          <button
            onClick={() => refreshCache(['Kathryn Powers', 'Mabel Ward'])}
          >
            Refresh ['Kathryn Powers','Mabel Ward']
          </button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine-dark">
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            rowModelType={'serverSide'}
            serverSideStoreType={'partial'}
            treeData={true}
            animateRows={true}
            cacheBlockSize={10}
            isServerSideGroupOpenByDefault={isServerSideGroupOpenByDefault}
            isServerSideGroup={isServerSideGroup}
            getServerSideGroupKey={getServerSideGroupKey}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
