'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import CountryCellRenderer from './countryCellRenderer.jsx';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
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
      ],
      context: {
        COUNTRY_CODES: COUNTRY_CODES,
      },
      defaultColDef: {
        flex: 1,
        minWidth: 225,
        resizable: true,
        floatingFilter: true,
      },
      sideBar: 'filters',
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      // only return data that has corresponding country codes
      const dataWithFlags = data.filter(function (d) {
        return COUNTRY_CODES[d.country];
      });
      params.api.setRowData(dataWithFlags);
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onFirstDataRendered = (params) => {
    params.api.getToolPanelInstance('filters').expandFilters();
  };

  printFilterModel = () => {
    const filterModel = this.gridApi.getFilterModel();
    console.log(filterModel);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: '5px' }}>
            <button onClick={() => this.printFilterModel()}>
              Print Filter Model
            </button>
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
              context={this.state.context}
              defaultColDef={this.state.defaultColDef}
              sideBar={this.state.sideBar}
              onGridReady={this.onGridReady}
              onFirstDataRendered={this.onFirstDataRendered.bind(this)}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

const COUNTRY_CODES = {
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

render(<GridExample></GridExample>, document.querySelector('#root'));
