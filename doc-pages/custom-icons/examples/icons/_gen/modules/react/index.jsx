'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
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

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
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
      ],
      defaultColDef: {
        width: 150,
        sortable: true,
        resizable: true,
        filter: true,
        floatingFilter: true,
      },
      rowData: null,
      autoGroupColumnDef: {
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
      },
      icons: {
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
      },
      rowSelection: 'multiple',
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => params.api.setRowData(data);

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          style={{
            height: '100%',
            width: '100%',
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
            sideBar={true}
            autoGroupColumnDef={this.state.autoGroupColumnDef}
            icons={this.state.icons}
            rowSelection={this.state.rowSelection}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

var myIcons = {
  sortAscending: () => {
    return 'ASC';
  },
  sortDescending: () => {
    return 'DESC';
  },
};

render(<GridExample></GridExample>, document.querySelector('#root'));
