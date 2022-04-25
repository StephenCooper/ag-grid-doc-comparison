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
  ValueGetterParams,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const athleteColumn = {
  headerName: 'Athlete',
  valueGetter: (params: ValueGetterParams) => {
    return params.data.athlete;
  },
};

function getColDefsMedalsIncluded() {
  return [
    athleteColumn,
    {
      colId: 'myAgeCol',
      headerName: 'Age',
      valueGetter: (params: ValueGetterParams) => {
        return params.data.age;
      },
    },
    {
      headerName: 'Country',
      headerClass: 'country-header',
      valueGetter: (params: ValueGetterParams) => {
        return params.data.country;
      },
    },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
}

function getColDefsMedalsExcluded() {
  return [
    athleteColumn,
    {
      colId: 'myAgeCol',
      headerName: 'Age',
      valueGetter: (params: ValueGetterParams) => {
        return params.data.age;
      },
    },
    {
      headerName: 'Country',
      headerClass: 'country-header',
      valueGetter: (params: ValueGetterParams) => {
        return params.data.country;
      },
    },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' },
  ];
}

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      initialWidth: 100,
      sortable: true,
      resizable: true,
    };
  }, []);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>(
    getColDefsMedalsIncluded()
  );

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => setRowData(data));
  }, []);

  const onBtExcludeMedalColumns = useCallback(() => {
    gridRef.current!.api.setColumnDefs(getColDefsMedalsExcluded());
  }, []);

  const onBtIncludeMedalColumns = useCallback(() => {
    gridRef.current!.api.setColumnDefs(getColDefsMedalsIncluded());
  }, []);

  return (
    <div style={containerStyle}>
      <div className="test-container">
        <div className="test-header">
          <button onClick={onBtIncludeMedalColumns}>
            Include Medal Columns
          </button>
          <button onClick={onBtExcludeMedalColumns}>
            Exclude Medal Columns
          </button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
