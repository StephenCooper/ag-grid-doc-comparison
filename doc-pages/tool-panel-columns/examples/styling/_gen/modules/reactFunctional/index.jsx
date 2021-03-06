'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  SetFilterModule,
  ColumnsToolPanelModule,
]);

const countryHeaderValueGetter = (params) => {
  switch (params.location) {
    case 'csv':
      return 'CSV Country';
    case 'clipboard':
      return 'CLIP Country';
    case 'columnToolPanel':
      return 'TP Country';
    case 'columnDrop':
      return 'CD Country';
    case 'header':
      return 'H Country';
    default:
      return 'Should never happen!';
  }
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'athlete',
      minWidth: 200,
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'age',
      enableValue: true,
    },
    {
      field: 'country',
      minWidth: 200,
      enableRowGroup: true,
      enablePivot: true,
      headerValueGetter: countryHeaderValueGetter,
    },
    {
      field: 'year',
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'date',
      minWidth: 180,
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'sport',
      minWidth: 200,
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      field: 'gold',
      hide: true,
      enableValue: true,
      toolPanelClass: 'tp-gold',
    },
    {
      field: 'silver',
      hide: true,
      enableValue: true,
      toolPanelClass: ['tp-silver'],
    },
    {
      field: 'bronze',
      hide: true,
      enableValue: true,
      toolPanelClass: (params) => {
        return 'tp-bronze';
      },
    },
    {
      headerName: 'Total',
      field: 'totalAgg',
      valueGetter:
        'node.group ? data.totalAgg : data.gold + data.silver + data.bronze',
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: true,
      filter: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          sideBar={'columns'}
          rowGroupPanelShow={'always'}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
