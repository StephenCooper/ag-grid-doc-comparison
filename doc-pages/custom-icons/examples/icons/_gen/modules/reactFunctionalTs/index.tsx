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
  SideBarDef,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  SideBarModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

var myIcons = {
  sortAscending: function () {
    return 'ASC';
  },
  sortDescending: function () {
    return 'DESC';
  },
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: 'athlete',
      rowGroup: true,
      hide: true,
    },
    {
      field: 'age',
      width: 90,
      enableValue: true,
      icons: {
        // not very useful, but demonstrates you can just have strings
        sortAscending: 'U',
        sortDescending: 'D',
      },
    },
    {
      field: 'country',
      width: 150,
      rowGroupIndex: 0,
      icons: {
        sortAscending: '<i class="fa fa-sort-alpha-up"/>',
        sortDescending: '<i class="fa fa-sort-alpha-down"/>',
      },
    },
    { field: 'year', width: 90, enableRowGroup: true },
    { field: 'date' },
    {
      field: 'sport',
      width: 110,
      icons: myIcons,
    },
    { field: 'gold', width: 100 },
    { field: 'silver', width: 100 },
    { field: 'bronze', width: 100 },
    { field: 'total', width: 100 },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      width: 150,
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      headerName: 'Athlete',
      field: 'athlete',
      rowDrag: true,
      // use font awesome for first col, with numbers for sort
      icons: {
        menu: '<i class="fa fa-shower"/>',
        filter: '<i class="fa fa-long-arrow-alt-up"/>',
        columns: '<i class="fa fa-snowflake"/>',
        sortAscending: '<i class="fa fa-sort-alpha-up"/>',
        sortDescending: '<i class="fa fa-sort-alpha-down"/>',
      },
      headerCheckboxSelection: true,
      width: 300,
    };
  }, []);
  const icons = useMemo<{
    [key: string]: Function | string;
  }>(() => {
    return {
      // use font awesome for menu icons
      menu: '<i class="fa fa-bath" style="width: 10px"/>',
      filter: '<i class="fa fa-long-arrow-alt-down"/>',
      columns: '<i class="fa fa-handshake"/>',
      sortAscending: '<i class="fa fa-long-arrow-alt-down"/>',
      sortDescending: '<i class="fa fa-long-arrow-alt-up"/>',
      // use some strings from group
      groupExpanded:
        '<img src="https://www.ag-grid.com/example-assets/group/contract.png" style="height: 12px; width: 12px;padding-right: 2px"/>',
      groupContracted:
        '<img src="https://www.ag-grid.com/example-assets/group/expand.png" style="height: 12px; width: 12px;padding-right: 2px"/>',
      columnMovePin: '<i class="far fa-hand-rock"/>',
      columnMoveAdd: '<i class="fa fa-plus-square"/>',
      columnMoveHide: '<i class="fa fa-times"/>',
      columnMoveMove: '<i class="fa fa-link"/>',
      columnMoveLeft: '<i class="fa fa-arrow-left"/>',
      columnMoveRight: '<i class="fa fa-arrow-right"/>',
      columnMoveGroup: '<i class="fa fa-users"/>',
      rowGroupPanel: '<i class="fa fa-university"/>',
      pivotPanel: '<i class="fa fa-magic"/>',
      valuePanel: '<i class="fa fa-magnet"/>',
      menuPin: 'P',
      menuValue: 'V',
      menuAddRowGroup: 'A',
      menuRemoveRowGroup: 'R',
      clipboardCopy: '>>',
      clipboardPaste: '>>',
      rowDrag: '<i class="fa fa-circle"/>',
    };
  }, []);

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
          sideBar={true}
          autoGroupColumnDef={autoGroupColumnDef}
          icons={icons}
          rowSelection={'multiple'}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
