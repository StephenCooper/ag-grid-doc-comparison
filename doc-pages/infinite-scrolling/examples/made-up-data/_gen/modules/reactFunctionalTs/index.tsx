'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  GetRowIdFunc,
  GetRowIdParams,
  Grid,
  GridOptions,
  IDatasource,
  IGetRowsParams,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([InfiniteRowModelModule]);

var ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

function getColumnDefs() {
  const columnDefs: ColDef[] = [
    { checkboxSelection: true, headerName: '', width: 60 },
    { headerName: '#', width: 80, valueGetter: 'node.rowIndex' },
  ];
  ALPHABET.forEach(function (letter) {
    columnDefs.push({
      headerName: letter.toUpperCase(),
      field: letter,
      width: 150,
    });
  });
  return columnDefs;
}

function getDataSource(count: number) {
  const dataSource: IDatasource = {
    rowCount: count,
    getRows: (params: IGetRowsParams) => {
      var rowsThisPage: any[] = [];
      for (
        var rowIndex = params.startRow;
        rowIndex < params.endRow;
        rowIndex++
      ) {
        var record: Record<string, string> = {};
        ALPHABET.forEach(function (letter, colIndex) {
          var randomNumber = 17 + rowIndex + colIndex;
          var cellKey = letter.toUpperCase() + (rowIndex + 1);
          record[letter] = cellKey + ' = ' + randomNumber;
        });
        rowsThisPage.push(record);
      }
      // to mimic server call, we reply after a short delay
      setTimeout(function () {
        // no need to pass the second 'rowCount' parameter as we have already provided it
        params.successCallback(rowsThisPage);
      }, 100);
    },
  };
  return dataSource;
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>(getColumnDefs());
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      resizable: true,
    };
  }, []);
  const getRowId = useCallback((params: GetRowIdParams) => {
    return params.data.a;
  }, []);
  const datasource = useMemo<IDatasource>(() => {
    return getDataSource(100);
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowModelType={'infinite'}
          rowSelection={'multiple'}
          maxBlocksInCache={2}
          suppressRowClickSelection={true}
          getRowId={getRowId}
          datasource={datasource}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
