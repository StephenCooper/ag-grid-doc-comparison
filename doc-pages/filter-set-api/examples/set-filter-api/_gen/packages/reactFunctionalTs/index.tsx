'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  GridReadyEvent,
  IFiltersToolPanel,
  ISetFilter,
  KeyCreatorParams,
  SideBarDef,
  ValueFormatterParams,
} from 'ag-grid-community';

function countryKeyCreator(params: KeyCreatorParams) {
  return params.value.name;
}

function patchData(data: any[]) {
  // hack the data, replace each country with an object of country name and code
  data.forEach(function (row) {
    const countryName = row.country;
    const countryCode = countryName.substring(0, 2).toUpperCase();
    row.country = {
      name: countryName,
      code: countryCode,
    };
  });
}

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: 'athlete',
      filter: 'agSetColumnFilter',
      filterParams: {
        cellHeight: 20,
      },
    },
    {
      field: 'country',
      valueFormatter: function (params: ValueFormatterParams) {
        return `${params.value.name} (${params.value.code})`;
      },
      keyCreator: countryKeyCreator,
    },
    { field: 'age', maxWidth: 120, filter: 'agNumberColumnFilter' },
    { field: 'year', maxWidth: 120 },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold', filter: 'agNumberColumnFilter' },
    { field: 'silver', filter: 'agNumberColumnFilter' },
    { field: 'bronze', filter: 'agNumberColumnFilter' },
    { field: 'total', filter: 'agNumberColumnFilter' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 160,
      filter: true,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => {
        patchData(data);
        setRowData(data);
      });
  }, []);

  const onFirstDataRendered = useCallback(() => {
    ((gridRef.current!.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).expandFilters();
  }, []);

  const selectJohnAndKenny = useCallback(() => {
    const instance = gridRef.current!.api.getFilterInstance('athlete')!;
    instance.setModel({ values: ['John Joe Nevin', 'Kenny Egan'] });
    gridRef.current!.api.onFilterChanged();
  }, []);

  const selectEverything = useCallback(() => {
    const instance = gridRef.current!.api.getFilterInstance('athlete')!;
    instance.setModel(null);
    gridRef.current!.api.onFilterChanged();
  }, []);

  const selectNothing = useCallback(() => {
    const instance = gridRef.current!.api.getFilterInstance('athlete')!;
    instance.setModel({ values: [] });
    gridRef.current!.api.onFilterChanged();
  }, []);

  const setCountriesToFranceAustralia = useCallback(() => {
    const instance = gridRef.current!.api.getFilterInstance(
      'country'
    ) as ISetFilter;
    instance.setFilterValues(['France', 'Australia']);
    instance.applyModel();
    gridRef.current!.api.onFilterChanged();
  }, []);

  const setCountriesToAll = useCallback(() => {
    const instance = gridRef.current!.api.getFilterInstance(
      'country'
    ) as ISetFilter;
    instance.resetFilterValues();
    instance.applyModel();
    gridRef.current!.api.onFilterChanged();
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          <div>
            Athlete:
            <button onClick={selectNothing}>API: Filter empty set</button>
            <button onClick={selectJohnAndKenny}>
              API: Filter only John Joe Nevin and Kenny Egan
            </button>
            <button onClick={selectEverything}>API: Remove filter</button>
          </div>
          <div style={{ paddingTop: '10px' }}>
            Country - available filter values
            <button onClick={setCountriesToFranceAustralia}>
              Filter values restricted to France and Australia
            </button>
            <button onClick={setCountriesToAll}>
              Make all countries available
            </button>
          </div>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            sideBar={'filters'}
            onGridReady={onGridReady}
            onFirstDataRendered={onFirstDataRendered}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
