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
} from 'ag-grid-community';

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { checkboxSelection: true, field: 'athlete', minWidth: 200 },
    { field: 'country', minWidth: 200 },
    { headerName: 'Group', valueGetter: 'data.country.charAt(0)' },
    { field: 'sport', minWidth: 150 },
    { field: 'gold', hide: true },
    { field: 'silver', hide: true },
    { field: 'bronze', hide: true },
    { field: 'total', hide: true },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) =>
        setRowData(data.filter((rec: any) => rec.country != null))
      );

    (document.getElementById(
      'selectedOnly'
    ) as HTMLInputElement).checked = true;
  }, []);

  const onBtExport = useCallback(() => {
    gridRef.current!.api.exportDataAsExcel({
      onlySelected: (document.querySelector(
        '#selectedOnly'
      ) as HTMLInputElement).checked,
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="container">
        <div className="columns">
          <label className="option" htmlFor="selectedOnly">
            <input id="selectedOnly" type="checkbox" />
            Selected Rows Only
          </label>
          <div>
            <button onClick={onBtExport} style={{ fontWeight: 'bold' }}>
              Export to Excel
            </button>
          </div>
        </div>
        <div className="grid-wrapper">
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              suppressRowClickSelection={true}
              rowSelection={'multiple'}
              onGridReady={onGridReady}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
