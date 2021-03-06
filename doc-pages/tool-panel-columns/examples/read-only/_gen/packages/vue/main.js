import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue';
import Vue from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="test-container">
                <div class="test-header">
                    <label><input type="checkbox" id="read-only" v-on:change="setReadOnly()"> Functions Read Only</label>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :pivotMode="true"
                :sideBar="sideBar"
                :rowGroupPanelShow="rowGroupPanelShow"
                :pivotPanelShow="pivotPanelShow"
                :functionsReadOnly="true"
                :rowData="rowData"></ag-grid-vue>
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
          field: 'athlete',
          minWidth: 200,
          enableRowGroup: true,
          enablePivot: true,
        },
        { field: 'age', enableValue: true },
        {
          field: 'country',
          minWidth: 200,
          enableRowGroup: true,
          enablePivot: true,
          rowGroupIndex: 1,
        },
        {
          field: 'year',
          enableRowGroup: true,
          enablePivot: true,
          pivotIndex: 1,
        },
        {
          field: 'date',
          minWidth: 180,
          enableRowGroup: true,
          enablePivot: true,
        },
        {
          field: 'sport',
          minWidth: 200,
          enableRowGroup: true,
          enablePivot: true,
          rowGroupIndex: 2,
        },
        { field: 'gold', hide: true, enableValue: true },
        { field: 'silver', hide: true, enableValue: true, aggFunc: 'sum' },
        { field: 'bronze', hide: true, enableValue: true, aggFunc: 'sum' },
        {
          headerName: 'Total',
          field: 'totalAgg',
          valueGetter:
            'node.group ? data.totalAgg : data.gold + data.silver + data.bronze',
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        sortable: true,
        resizable: true,
      },
      autoGroupColumnDef: null,
      sideBar: null,
      rowGroupPanelShow: null,
      pivotPanelShow: null,
      rowData: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      minWidth: 250,
    };
    this.sideBar = 'columns';
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
  },
  methods: {
    setReadOnly() {
      this.gridApi.setFunctionsReadOnly(
        document.getElementById('read-only').checked
      );
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      document.getElementById('read-only').checked = true;

      const updateData = (data) => params.api.setRowData(data);

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
