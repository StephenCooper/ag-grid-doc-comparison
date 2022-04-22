import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue3';
import { createApp } from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <label>Transaction Updates: </label>
                    <button v-on:click="updateFirstRow()">Update First Displayed Row</button>
                    <button v-on:click="addDRow()">Add New 'D' Row</button>
                    <button v-on:click="reset()" style="margin-left: 20px">Reset</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :rowData="rowData"
                :sideBar="sideBar"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
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
          headerName: 'Set Filter Column',
          field: 'col1',
          filter: 'agSetColumnFilter',
          editable: true,
          flex: 1,
        },
      ],
      gridApi: null,
      columnApi: null,

      rowData: null,
      sideBar: null,
    };
  },
  created() {
    this.rowData = getRowData();
    this.sideBar = 'filters';
  },
  methods: {
    onFirstDataRendered(params) {
      params.api.getToolPanelInstance('filters').expandFilters();
    },
    updateFirstRow() {
      var firstRow = this.gridApi.getDisplayedRowAtIndex(0);
      if (firstRow) {
        var firstRowData = firstRow.data;
        firstRowData['col1'] += 'X';
        this.gridApi.applyTransaction({ update: [firstRowData] });
      }
    },
    addDRow() {
      this.gridApi.applyTransaction({ add: [{ col1: 'D' }] });
    },
    reset() {
      this.gridApi.setFilterModel(null);
      this.gridApi.setRowData(getRowData());
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.getRowData = function getRowData() {
  return [
    { col1: 'A' },
    { col1: 'A' },
    { col1: 'B' },
    { col1: 'B' },
    { col1: 'C' },
    { col1: 'C' },
  ];
};

createApp(VueExample).mount('#app');
