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
  SideBarDef,
} from 'ag-grid-community';
import CountryCellRenderer from './countryCellRenderer';

const COUNTRY_CODES: Record<string, string> = {
  Ireland: 'ie',
  Luxembourg: 'lu',
  Belgium: 'be',
  Spain: 'es',
  France: 'fr',
  Germany: 'de',
  Sweden: 'se',
  Italy: 'it',
  Greece: 'gr',
  Iceland: 'is',
  Portugal: 'pt',
  Malta: 'mt',
  Norway: 'no',
  Brazil: 'br',
  Argentina: 'ar',
  Colombia: 'co',
  Peru: 'pe',
  Venezuela: 've',
  Uruguay: 'uy',
};

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: 'No Cell Renderer',
      field: 'country',
      cellRenderer: CountryCellRenderer,
      filter: 'agSetColumnFilter',
      filterParams: {
        // no cell renderer!
      },
    },
    {
      headerName: 'With Cell Renderers',
      field: 'country',
      cellRenderer: CountryCellRenderer,
      filter: 'agSetColumnFilter',
      filterParams: {
        cellRenderer: CountryCellRenderer,
      },
    },
  ]);
  const context = useMemo<any>(() => {
    return {
      COUNTRY_CODES: COUNTRY_CODES,
    };
  }, []);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 225,
      resizable: true,
      floatingFilter: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => {
        // only return data that has corresponding country codes
        const dataWithFlags = data.filter(function (d: any) {
          return COUNTRY_CODES[d.country];
        });
        setRowData(dataWithFlags);
      });
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    ((gridRef.current!.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).expandFilters();
  }, []);

  const printFilterModel = useCallback(() => {
    const filterModel = gridRef.current!.api.getFilterModel();
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
            context={context}
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
