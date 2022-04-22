import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue3';
import { createApp } from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div style="display: flex;">
                    <div style="margin-left: 10px;">
                        <div class="row">
                            <label>prependContent = </label>
                            <select id="prependContent">
                                <option>none</option>
                                <option value="array">CSVCell[][] (recommended format)</option>
                                <option value="string">string (legacy format)</option>
                            </select>
                        </div>
                        <div class="row">
                            <label>appendContent = </label>
                            <select id="appendContent">
                                <option>none</option>
                                <option value="array">CSVCell[][] (recommended format)</option>
                                <option value="string">string (legacy format)</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div style="margin: 10px 0;">
                    <button v-on:click="onBtnUpdate()">Show CSV export content text</button>
                    <button v-on:click="onBtnExport()">Download CSV export file</button>
                </div>
                <div style="flex: 1 1 0px; position: relative;">
                    <div id="gridContainer">
                        <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :suppressExcelExport="true"
                :popupParent="popupParent"
                :rowData="rowData"></ag-grid-vue>
                    </div>
                    <textarea id="csvResult">Click the Show CSV export content button to view exported CSV here</textarea>
                </div>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [{ field: 'make' }, { field: 'model' }, { field: 'price' }],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        editable: true,
        resizable: true,
        minWidth: 100,
        flex: 1,
      },
      popupParent: null,
      rowData: null,
    };
  },
  created() {
    this.popupParent = document.body;
    this.rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxster', price: 72000 },
    ];
  },
  methods: {
    onBtnExport() {
      var params = getParams();
      if (params.suppressQuotes || params.columnSeparator) {
        alert(
          'NOTE: you are downloading a file with non-standard quotes or separators - it may not render correctly in Excel.'
        );
      }
      this.gridApi.exportDataAsCsv(params);
    },
    onBtnUpdate() {
      document.querySelector('#csvResult').value = this.gridApi.getDataAsCsv(
        getParams()
      );
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.getValue = function getValue(inputSelector) {
  var text = document.querySelector(inputSelector).value;
  switch (text) {
    case 'string':
      return (
        'Here is a comma, and a some "quotes". You can see them using the\n' +
        'api.getDataAsCsv() button but they will not be visible when the downloaded\n' +
        'CSV file is opened in Excel because string content passed to\n' +
        'prependContent and appendContent is not escaped.'
      );
    case 'array':
      return [
        [],
        [
          {
            data: {
              value: 'Here is a comma, and a some "quotes".',
              type: 'String',
            },
          },
        ],
        [
          {
            data: {
              value:
                'They are visible when the downloaded CSV file is opened in Excel because custom content is properly escaped (provided that suppressQuotes is not set to true)',
              type: 'String',
            },
          },
        ],
        [
          { data: { value: 'this cell:', type: 'String' }, mergeAcross: 1 },
          {
            data: {
              value: 'is empty because the first cell has mergeAcross=1',
              type: 'String',
            },
          },
        ],
        [],
      ];
    case 'none':
      return;
    default:
      return text;
  }
};

window.getParams = function getParams() {
  return {
    prependContent: getValue('#prependContent'),
    appendContent: getValue('#appendContent'),
    suppressQuotes: undefined,
    columnSeparator: undefined,
  };
};

createApp(VueExample).mount('#app');
