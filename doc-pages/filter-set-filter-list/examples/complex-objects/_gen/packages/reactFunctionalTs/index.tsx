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
  FirstDataRenderedEvent,
  Grid,
  GridOptions,
  GridReadyEvent,
  IFiltersToolPanel,
  KeyCreatorParams,
  SideBarDef,
  ValueFormatterParams,
} from 'ag-grid-community';

function countryKeyCreator(params: KeyCreatorParams) {
  var countryObject = params.value;
  return countryObject.name;
}

function countryValueFormatter(params: ValueFormatterParams) {
  return params.value.name;
}

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: 'Country (Complex Object)',
      field: 'country',
      keyCreator: countryKeyCreator,
      valueFormatter: countryValueFormatter,
      filter: 'agSetColumnFilter',
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      floatingFilter: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => {
        // hack the data, replace each country with an object of country name and code
        data.forEach(function (row: any) {
          var countryName = row.country;
          var countryCode = countryName.substring(0, 2).toUpperCase();
          row.country = {
            name: countryName,
            code: countryCode,
          };
        });
        setRowData(data);
      });
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    ((gridRef.current!.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).expandFilters();
  }, []);

  const printFilterModel = useCallback(() => {
    var filterModel = gridRef.current!.api.getFilterModel();
    console.log(filterModel);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <button onClick={printFilterModel}>Print Filter Model</button>
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
