'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import ColourCellRenderer from './colourCellRenderer.jsx';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RichSelectModule,
  SetFilterModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          field: 'make',
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: carBrands,
          },
          filter: 'agSetColumnFilter',
          refData: carMappings,
        },
        {
          field: 'exteriorColour',
          minWidth: 150,
          cellEditor: 'agRichSelectCellEditor',
          cellEditorPopup: true,
          cellEditorParams: {
            values: colours,
            cellRenderer: ColourCellRenderer,
          },
          filter: 'agSetColumnFilter',
          filterParams: {
            cellRenderer: ColourCellRenderer,
          },
          refData: colourMappings,
          cellRenderer: ColourCellRenderer,
        },
        {
          field: 'interiorColour',
          minWidth: 150,
          filter: 'agSetColumnFilter',
          filterParams: {
            cellRenderer: ColourCellRenderer,
          },
          refData: colourMappings,
          cellRenderer: ColourCellRenderer,
        },
        {
          headerName: 'Retail Price',
          field: 'price',
          minWidth: 140,
          colId: 'retailPrice',
          valueGetter: function (params) {
            return params.data.price;
          },
          valueFormatter: currencyFormatter,
          valueSetter: numberValueSetter,
        },
        {
          headerName: 'Retail Price (incl Taxes)',
          minWidth: 205,
          editable: false,
          valueGetter: function (params) {
            // example of chaining value getters
            return params.getValue('retailPrice') * 1.2;
          },
          valueFormatter: currencyFormatter,
        },
      ],
      defaultColDef: {
        flex: 1,
        filter: true,
        editable: true,
      },
      rowData: getData(),
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onCellValueChanged = (params) => {
    // notice that the data always contains the keys rather than values after editing
    console.log('onCellValueChanged: ', params);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          style={{
            height: '100%',
            width: '100%',
          }}
          className="ag-theme-alpine-dark"
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

const carMappings = {
  tyt: 'Toyota',
  frd: 'Ford',
  prs: 'Porsche',
  nss: 'Nissan',
};
const colourMappings = {
  cb: 'Cadet Blue',
  bw: 'Burlywood',
  fg: 'Forest Green',
};
function extractValues(mappings) {
  return Object.keys(mappings);
}
const carBrands = extractValues(carMappings);
const colours = extractValues(colourMappings);
function currencyFormatter(params) {
  const value = Math.floor(params.value);
  if (isNaN(value)) {
    return '';
  }
  return '£' + value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
function numberValueSetter(params) {
  if (isNaN(parseFloat(params.newValue)) || !isFinite(params.newValue)) {
    return false; // don't set invalid numbers!
  }
  params.data.price = params.newValue;
  return true;
}
function removeSpaces(str) {
  return str ? str.replace(/\s/g, '') : str;
}

render(<GridExample></GridExample>, document.querySelector('#root'));
