import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue';
import Vue from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="container">
                <div class="columns">
                    <div class="option">
                        <label for="fontSize">
                            <input type="checkbox" id="fontSize">
                            Font Size =
                        </label>
                        <input type="text" id="fontSizeValue" value="14" style="width: 40px;">
                    </div>
                    <div class="option">
                        <label for="rowHeight">
                            <input type="checkbox" id="rowHeight">
                            Row Height =
                        </label>
                        <input type="text" id="rowHeightValue" value="30" style="width: 40px;">
                    </div>
                    <div class="option">
                        <label for="headerRowHeight">
                            <input type="checkbox" id="headerRowHeight">
                            Header Row Height =
                        </label>
                        <input type="text" id="headerRowHeightValue" value="30" style="width: 40px;">
                    </div>
                </div>
                <div>
                    <label>
                        <button v-on:click="onBtExport()" style="margin-bottom: 5px; font-weight: bold;">Export to Excel</button>
                    </label>
                </div>
                <div class="grid-wrapper">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :pinnedTopRowData="pinnedTopRowData"
                :pinnedBottomRowData="pinnedBottomRowData"
                :excelStyles="excelStyles"
                :rowData="rowData"></ag-grid-vue>
                </div>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          headerName: 'Top Level Column Group',
          children: [
            {
              headerName: 'Group A',
              children: [
                { field: 'athlete', minWidth: 200 },
                {
                  field: 'age',
                  cellClass: 'twoDecimalPlaces',
                  cellClassRules: {
                    greenBackground: (params) => {
                      return params.value < 23;
                    },
                    redFont: (params) => {
                      return params.value < 20;
                    },
                  },
                },
                {
                  field: 'country',
                  minWidth: 200,
                  cellClassRules: {
                    redFont: (params) => {
                      return params.value === 'United States';
                    },
                  },
                },
                {
                  headerName: 'Group',
                  valueGetter: 'data.country.charAt(0)',
                  cellClassRules: {
                    boldBorders: (params) => {
                      return params.value === 'U';
                    },
                  },
                  cellClass: ['redFont', 'greenBackground'],
                },
                {
                  field: 'year',
                  cellClassRules: {
                    notInExcel: (params) => {
                      return true;
                    },
                  },
                },
              ],
            },
            {
              headerName: 'Group B',
              children: [
                {
                  field: 'date',
                  minWidth: 150,
                  cellClass: 'dateFormat',
                  valueGetter: (params) => {
                    var val = params.data.date;
                    if (val.indexOf('/') < 0) {
                      return val;
                    }
                    var split = val.split('/');
                    return split[2] + '-' + split[1] + '-' + split[0];
                  },
                },
                { field: 'sport', minWidth: 150 },
                {
                  field: 'gold',
                  cellClassRules: {
                    boldBorders: (params) => {
                      return params.value > 2;
                    },
                  },
                },
                { field: 'silver', cellClass: 'textFormat' },
                { field: 'bronze' },
                { field: 'total' },
              ],
            },
          ],
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        cellClassRules: {
          darkGreyBackground: (params) => {
            return (params.node.rowIndex || 0) % 2 == 0;
          },
        },
        sortable: true,
        filter: true,
        resizable: true,
        minWidth: 100,
        flex: 1,
      },
      pinnedTopRowData: null,
      pinnedBottomRowData: null,
      excelStyles: null,
      rowData: null,
    };
  },
  created() {
    this.pinnedTopRowData = [
      {
        athlete: 'Floating <Top> Athlete',
        age: 999,
        country: 'Floating <Top> Country',
        year: 2020,
        date: '2020-08-01',
        sport: 'Track & Field',
        gold: 22,
        silver: '003',
        bronze: 44,
        total: 55,
      },
    ];
    this.pinnedBottomRowData = [
      {
        athlete: 'Floating <Bottom> Athlete',
        age: 888,
        country: 'Floating <Bottom> Country',
        year: 2030,
        date: '2030-08-01',
        sport: 'Track & Field',
        gold: 222,
        silver: '005',
        bronze: 244,
        total: 255,
      },
    ];
    this.excelStyles = [
      {
        id: 'cell',
        alignment: {
          vertical: 'Center',
        },
      },
      {
        id: 'header',
        alignment: {
          vertical: 'Center',
        },
        interior: {
          color: '#f8f8f8',
          pattern: 'Solid',
          patternColor: undefined,
        },
        borders: {
          borderBottom: {
            color: '#babfc7',
            lineStyle: 'Continuous',
            weight: 1,
          },
        },
      },
      {
        id: 'headerGroup',
        font: {
          bold: true,
        },
      },
      {
        id: 'greenBackground',
        interior: {
          color: '#b5e6b5',
          pattern: 'Solid',
        },
      },
      {
        id: 'redFont',
        font: {
          fontName: 'Calibri Light',
          underline: 'Single',
          italic: true,
          color: '#ff0000',
        },
      },
      {
        id: 'darkGreyBackground',
        interior: {
          color: '#888888',
          pattern: 'Solid',
        },
        font: {
          fontName: 'Calibri Light',
          color: '#ffffff',
        },
      },
      {
        id: 'boldBorders',
        borders: {
          borderBottom: {
            color: '#000000',
            lineStyle: 'Continuous',
            weight: 3,
          },
          borderLeft: {
            color: '#000000',
            lineStyle: 'Continuous',
            weight: 3,
          },
          borderRight: {
            color: '#000000',
            lineStyle: 'Continuous',
            weight: 3,
          },
          borderTop: {
            color: '#000000',
            lineStyle: 'Continuous',
            weight: 3,
          },
        },
      },
      {
        id: 'dateFormat',
        dataType: 'DateTime',
        numberFormat: {
          format: 'mm/dd/yyyy;@',
        },
      },
      {
        id: 'twoDecimalPlaces',
        numberFormat: {
          format: '#,##0.00',
        },
      },
      {
        id: 'textFormat',
        dataType: 'String',
      },
    ];
  },
  methods: {
    onBtExport() {
      var params = {
        fontSize: getBooleanValue('#fontSize')
          ? getNumericValue('#fontSizeValue')
          : undefined,
        rowHeight: getBooleanValue('#rowHeight')
          ? getNumericValue('#rowHeightValue')
          : undefined,
        headerRowHeight: getBooleanValue('#headerRowHeight')
          ? getNumericValue('#headerRowHeightValue')
          : undefined,
      };
      this.gridApi.exportDataAsExcel(params);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      document.getElementById('fontSize').checked = true;
      document.getElementById('rowHeight').checked = true;
      document.getElementById('headerRowHeight').checked = true;

      const updateData = (data) => params.api.setRowData(data);

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

window.getBooleanValue = function getBooleanValue(cssSelector) {
  return document.querySelector(cssSelector).checked === true;
};

window.getTextValue = function getTextValue(cssSelector) {
  return document.querySelector(cssSelector).value;
};

window.getNumericValue = function getNumericValue(cssSelector) {
  var value = parseFloat(getTextValue(cssSelector));
  if (isNaN(value)) {
    var message = 'Invalid number entered in ' + cssSelector + ' field';
    alert(message);
    throw new Error(message);
  }
  return value;
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
