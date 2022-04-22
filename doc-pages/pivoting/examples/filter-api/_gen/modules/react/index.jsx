'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  FiltersToolPanelModule,
  MenuModule,
  SetFilterModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'country', rowGroup: true, enableRowGroup: true },
        { field: 'year', pivot: true, enablePivot: true },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold', aggFunc: 'sum' },
        { field: 'silver', aggFunc: 'sum' },
        { field: 'bronze', aggFunc: 'sum' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
        floatingFilter: true,
        sortable: true,
        resizable: true,
      },
      processSecondaryColDef: (colDef) => {
        colDef.filter = 'agNumberColumnFilter';
        colDef.floatingFilter = true;
      },
      sideBar: 'filters',
      rowData: null,
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

  clearFilter = () => {
    this.gridApi.setFilterModel(null);
  };

  filterUsRussiaAustralia = () => {
    this.gridApi.setFilterModel({
      ...this.gridApi.getFilterModel(),
      country: {
        type: 'set',
        values: ['United States', 'Russia', 'Australia'],
      },
    });
  };

  filterCanadaNorwayChinaZimbabweNetherlands = () => {
    this.gridApi.setFilterModel({
      ...this.gridApi.getFilterModel(),
      country: {
        type: 'set',
        values: ['Canada', 'Norway', 'China', 'Zimbabwe', 'Netherlands'],
      },
    });
  };

  filter20042006 = () => {
    this.gridApi.setFilterModel({
      ...this.gridApi.getFilterModel(),
      year: {
        type: 'set',
        values: ['2004', '2006'],
      },
    });
  };

  filter200820102012 = () => {
    this.gridApi.setFilterModel({
      ...this.gridApi.getFilterModel(),
      year: {
        type: 'set',
        values: ['2008', '2010', '2012'],
      },
    });
  };

  filterClearYears = () => {
    this.gridApi.setFilterModel({
      ...this.gridApi.getFilterModel(),
      year: undefined,
    });
  };

  filterSwimmingHockey = () => {
    this.gridApi.setFilterModel({
      ...this.gridApi.getFilterModel(),
      sport: {
        type: 'set',
        values: ['Swimming', 'Hockey'],
      },
    });
  };

  filterHockeyIceHockey = () => {
    this.gridApi.setFilterModel({
      ...this.gridApi.getFilterModel(),
      sport: {
        type: 'set',
        values: ['Hockey', 'Ice Hockey'],
      },
    });
  };

  filterEveryYearGold = () => {
    const goldPivotCols = this.gridColumnApi
      .getSecondaryColumns()
      .filter((col) => col.getColDef().pivotValueColumn.getColId() === 'gold');
    if (goldPivotCols) {
      const newOpts = goldPivotCols.reduce((acc, col) => {
        acc[col.getId()] = {
          filter: 0,
          filterType: 'number',
          type: 'greaterThan',
        };
        return acc;
      }, this.gridApi.getFilterModel() || {});
      this.gridApi.setFilterModel(newOpts);
    }
  };

  filter2000Silver = () => {
    const targetCol = this.gridColumnApi.getSecondaryPivotColumn(
      ['2000'],
      'silver'
    );
    if (targetCol) {
      this.gridApi.setFilterModel({
        ...this.gridApi.getFilterModel(),
        [targetCol.getId()]: {
          filterType: 'number',
          type: 'notBlank',
        },
      });
    }
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          className="test-container"
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <div className="test-header">
            <div style={{ marginBottom: '10px' }}>
              <button onClick={() => this.clearFilter()}>Clear Filters</button>
            </div>
            <div>Primary Column Filters</div>
            <div style={{ marginBottom: '10px' }}>
              <div style={{ marginBottom: '5px' }}>
                <button onClick={() => this.filterUsRussiaAustralia()}>
                  Country: US, Russia &amp; Australia
                </button>
                <button
                  onClick={() =>
                    this.filterCanadaNorwayChinaZimbabweNetherlands()
                  }
                >
                  Country: Canada, Norway, China, Zimbabwe &amp; Netherlands
                </button>
              </div>
              <div style={{ marginBottom: '5px' }}>
                <button onClick={() => this.filter20042006()}>
                  Year: 2004 &amp; 2006
                </button>
                <button onClick={() => this.filter200820102012()}>
                  Year: 2008, 2010 &amp; 2012
                </button>
                <button onClick={() => this.filterClearYears()}>
                  Year: Clear filter
                </button>
              </div>
              <div>
                <button onClick={() => this.filterSwimmingHockey()}>
                  Sport: Swimming &amp; Hockey
                </button>
                <button onClick={() => this.filterHockeyIceHockey()}>
                  Sport: Hockey &amp; Ice Hockey
                </button>
              </div>
            </div>
            <div>Secondary Column Filters</div>
            <div style={{ marginBottom: '10px' }}>
              <div style={{ marginBottom: '5px' }}>
                <button onClick={() => this.filterEveryYearGold()}>
                  All gold: &gt; 0
                </button>
                <button onClick={() => this.filter2000Silver()}>
                  Year 2000, Silver: Not blank
                </button>
              </div>
            </div>
          </div>
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
              processSecondaryColDef={this.state.processSecondaryColDef}
              pivotMode={true}
              sideBar={this.state.sideBar}
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
