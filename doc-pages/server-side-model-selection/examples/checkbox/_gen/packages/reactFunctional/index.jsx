'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const getServerSideDatasource = (server) => {
  return {
    getRows: (params) => {
      console.log('[Datasource] - rows requested by grid: ', params.request);
      var response = server.getData(params.request);
      // adding delay to simulate real server call
      setTimeout(function () {
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
      }, 200);
    },
  };
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [columnDefs, setColumnDefs] = useState([
    { field: 'year', rowGroup: true, hide: true },
    { field: 'athlete', hide: true },
    { field: 'sport', checkboxSelection: true },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 120,
      resizable: true,
      sortable: true,
    };
  }, []);
  const getRowId = useCallback((params) => {
    var data = params.data;
    // use year for group level ids, or the id we assigned for leaf level
    return data.id != null ? 'id-' + data.id : 'year-' + data.year;
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      field: 'athlete',
      flex: 1,
      minWidth: 240,
      // headerCheckboxSelection: true, // not supported for Enterprise Model
      cellRendererParams: {
        checkbox: true,
      },
    };
  }, []);
  const isRowSelectable = useCallback((rowNode) => {
    return !rowNode.group;
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => {
        // assign a unique ID to each data item
        data.forEach(function (item, index) {
          item.id = index;
        });
        // setup the fake server with entire dataset
        var fakeServer = new FakeServer(data);
        // create datasource with a reference to the fake server
        var datasource = getServerSideDatasource(fakeServer);
        // register the datasource with the grid
        params.api.setServerSideDatasource(datasource);
      });
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine-dark">
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          getRowId={getRowId}
          autoGroupColumnDef={autoGroupColumnDef}
          rowModelType={'serverSide'}
          serverSideStoreType={'partial'}
          rowSelection={'multiple'}
          isRowSelectable={isRowSelectable}
          suppressRowClickSelection={true}
          animateRows={true}
          suppressAggFuncInHeader={true}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
