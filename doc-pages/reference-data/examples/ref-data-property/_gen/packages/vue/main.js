import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue';
import Vue from 'vue';
import ColourCellRenderer from './colourCellRendererVue.js';

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                @cell-value-changed="onCellValueChanged"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
    ColourCellRenderer,
  },
  data: function () {
    return {
      columnDefs: [
        {
          field: 'make',
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: { values: carBrands },
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
            cellRenderer: 'ColourCellRenderer',
          },
          filter: 'agSetColumnFilter',
          filterParams: { cellRenderer: 'ColourCellRenderer' },
          refData: colourMappings,
          cellRenderer: 'ColourCellRenderer',
        },
        {
          field: 'interiorColour',
          minWidth: 150,
          filter: 'agSetColumnFilter',
          filterParams: { cellRenderer: 'ColourCellRenderer' },
          refData: colourMappings,
          cellRenderer: 'ColourCellRenderer',
        },
        {
          headerName: 'Retail Price',
          field: 'price',
          minWidth: 140,
          colId: 'retailPrice',
          valueGetter: (params) => {
            return params.data.price;
          },
          valueFormatter: currencyFormatter,
          valueSetter: numberValueSetter,
        },
        {
          headerName: 'Retail Price (incl Taxes)',
          minWidth: 205,
          editable: false,
          valueGetter: (params) => {
            // example of chaining value getters
            return params.getValue('retailPrice') * 1.2;
          },
          valueFormatter: currencyFormatter,
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        filter: true,
        editable: true,
      },
      rowData: null,
    };
  },
  created() {
    this.rowData = getData();
  },
  methods: {
    onCellValueChanged(params) {
      // notice that the data always contains the keys rather than values after editing
      console.log('onCellValueChanged: ', params);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.extractValues = function extractValues(mappings) {
  return Object.keys(mappings);
};

window.currencyFormatter = function currencyFormatter(params) {
  const value = Math.floor(params.value);
  if (isNaN(value)) {
    return '';
  }
  return '??' + value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

window.numberValueSetter = function numberValueSetter(params) {
  if (isNaN(parseFloat(params.newValue)) || !isFinite(params.newValue)) {
    return false; // don't set invalid numbers!
  }
  params.data.price = params.newValue;
  return true;
};

window.removeSpaces = function removeSpaces(str) {
  return str ? str.replace(/\s/g, '') : str;
};

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

const carBrands = extractValues(carMappings);

const colours = extractValues(colourMappings);

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
