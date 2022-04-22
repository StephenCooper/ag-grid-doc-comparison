'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import {
  ColDef,
  ColGroupDef,
  GetRowIdFunc,
  GetRowIdParams,
  Grid,
  GridOptions,
  GridReadyEvent,
  IServerSideDatasource,
  IServerSideGetRowsParams,
  ServerSideStoreType,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule]);

declare var window: any;

var newItemCount = 0;

function createMyDataSource(data: any[]) {
  window.rowDataServerSide = data;
  const dataSource: IServerSideDatasource = {
    getRows: (params: IServerSideGetRowsParams) => {
      setTimeout(function () {
        // take a slice of the total rows
        var rowsThisPage = data.slice(
          params.request.startRow,
          params.request.endRow
        );
        // call the success callback
        params.success({
          rowData: rowsThisPage,
          rowCount: window.rowDataServerSide.length,
        });
      }, 500);
    },
  };
  return dataSource;
}

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'athlete', width: 150 },
    { field: 'age' },
    { field: 'country', width: 150 },
    { field: 'year' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      width: 100,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => {
        // add id to data
        let idSequence = 0;
        data.forEach(function (item: any) {
          item.id = idSequence++;
        });
        var datasource = createMyDataSource(data);
        params.api!.setServerSideDatasource(datasource);
      });
  }, []);

  const onBtRemove = useCallback(() => {
    var selectedRows = gridRef.current!.api.getSelectedNodes();
    if (!selectedRows || selectedRows.length === 0) {
      return;
    }
    var selectedRow = selectedRows[0];
    var indexToRemove = window.rowDataServerSide.indexOf(selectedRow.data);
    // the record could be missing, if the user hit the 'remove' button a few times before refresh happens
    if (indexToRemove >= 0) {
      window.rowDataServerSide.splice(indexToRemove, 1);
    }
    gridRef.current!.api.refreshServerSideStore();
  }, []);

  const onBtAdd = useCallback(() => {
    var selectedRows = gridRef.current!.api.getSelectedNodes();
    if (!selectedRows || selectedRows.length === 0) {
      return;
    }
    var selectedRow = selectedRows[0];
    // insert new row in the source data, at the top of the page
    window.rowDataServerSide.splice(selectedRow.rowIndex, 0, {
      athlete: 'New Item' + newItemCount,
      id: '' + Math.random(),
    });
    newItemCount++;
    gridRef.current!.api.refreshServerSideStore();
  }, [newItemCount]);

  const getRowId = useCallback((params: GetRowIdParams) => {
    return params.data.id;
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <button onClick={onBtAdd}>Add Before Selected Row</button>
          <button onClick={onBtRemove}>Remove Selected Row</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine-dark">
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={'single'}
            rowModelType={'serverSide'}
            serverSideStoreType={'partial'}
            getRowId={getRowId}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
