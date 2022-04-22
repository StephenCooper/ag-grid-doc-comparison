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
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

function MyYearPivotComparator(a: string, b: string) {
  var requiredOrder = ['2012', '2010', '2008', '2006', '2004', '2002', '2000'];
  return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'country', rowGroup: true, enableRowGroup: true },
    {
      field: 'year',
      pivot: true,
      enablePivot: true,
      pivotComparator: MyYearPivotComparator,
    },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
      resizable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      minWidth: 250,
    };
  }, []);
  const processSecondaryColDef = useCallback(function (colDef: ColDef) {
    if (colDef.pivotValueColumn?.getId() === 'gold') {
      colDef.headerName = colDef.headerName?.toUpperCase();
    }
  }, []);
  const processSecondaryColGroupDef = useCallback(function (
    colGroupDef: ColGroupDef
  ) {
    // for fun, add a css class for 2010
    if (colGroupDef.pivotKeys?.length && colGroupDef.pivotKeys[0] === '2010') {
      colGroupDef.headerClass = 'color-background';
    }
    // put 'year' in front of each group
    colGroupDef.headerName = 'Year ' + colGroupDef.headerName;
  },
  []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => setRowData(data));
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          pivotMode={true}
          suppressAggFuncInHeader={true}
          processSecondaryColDef={processSecondaryColDef}
          processSecondaryColGroupDef={processSecondaryColGroupDef}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
