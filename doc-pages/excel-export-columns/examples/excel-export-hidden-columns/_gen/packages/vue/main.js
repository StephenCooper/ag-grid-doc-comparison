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
                    <label class="option" for="allColumns"><input id="allColumns" type="checkbox">All Columns</label>
                    <div>
                        <button v-on:click="onBtExport()" style="font-weight: bold;">Export to Excel</button>
                    </div>
                </div>
                <div class="grid-wrapper">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :popupParent="popupParent"
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
                { field: 'country', minWidth: 200 },
                { headerName: 'Group', valueGetter: 'data.country.charAt(0)' },
              ],
            },
            {
              headerName: 'Group B',
              children: [
                { field: 'sport', minWidth: 150 },
                { field: 'gold', hide: true },
                { field: 'silver', hide: true },
                { field: 'bronze', hide: true },
                { field: 'total', hide: true },
              ],
            },
          ],
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        sortable: true,
        filter: true,
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
  },
  methods: {
    onBtExport() {
      this.gridApi.exportDataAsExcel(getParams());
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) =>
        params.api.setRowData(data.filter((rec) => rec.country != null));

      fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

window.getBoolean = function getBoolean(id) {
  return !!document.querySelector('#' + id).checked;
};

window.getParams = function getParams() {
  return {
    allColumns: getBoolean('allColumns'),
  };
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
