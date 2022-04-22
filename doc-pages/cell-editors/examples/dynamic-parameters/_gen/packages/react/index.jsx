'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import GenderCellRenderer from './genderCellRenderer.jsx';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'name' },
        {
          field: 'gender',
          cellRenderer: GenderCellRenderer,
          cellEditor: 'agRichSelectCellEditor',
          cellEditorPopup: true,
          cellEditorParams: {
            values: ['Male', 'Female'],
            cellRenderer: GenderCellRenderer,
            cellEditorPopup: true,
          },
        },
        {
          field: 'country',
          cellEditor: 'agRichSelectCellEditor',
          cellEditorPopup: true,
          cellEditorParams: {
            cellHeight: 50,
            values: ['Ireland', 'USA'],
          },
        },
        {
          field: 'city',
          cellEditor: 'agRichSelectCellEditor',
          cellEditorPopup: true,
          cellEditorParams: cellCellEditorParams,
        },
        {
          field: 'address',
          cellEditor: 'agLargeTextCellEditor',
          cellEditorPopup: true,
          minWidth: 550,
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 130,
        editable: true,
        resizable: true,
      },
      rowData: getData(),
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onCellValueChanged = (params) => {
    const colId = params.column.getId();
    if (colId === 'country') {
      const selectedCountry = params.data.country;
      const selectedCity = params.data.city;
      const allowedCities = countyToCityMap(selectedCountry);
      const cityMismatch = allowedCities.indexOf(selectedCity) < 0;
      if (cityMismatch) {
        params.node.setDataValue('city', null);
      }
    }
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
            onGridReady={this.onGridReady}
            onCellValueChanged={this.onCellValueChanged.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const cellCellEditorParams = (params) => {
  const selectedCountry = params.data.country;
  const allowedCities = countyToCityMap(selectedCountry);
  return {
    values: allowedCities,
    formatValue: (value) => `${value} (${selectedCountry})`,
  };
};
function countyToCityMap(match) {
  const map = {
    Ireland: ['Dublin', 'Cork', 'Galway'],
    USA: ['New York', 'Los Angeles', 'Chicago', 'Houston'],
  };
  return map[match];
}

render(<GridExample></GridExample>, document.querySelector('#root'));
