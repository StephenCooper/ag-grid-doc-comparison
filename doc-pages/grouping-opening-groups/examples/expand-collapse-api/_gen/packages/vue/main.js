import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue';
import Vue from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="expandAll()">Expand All</button>
                    <button v-on:click="collapseAll()">Collapse All</button>
                    <button v-on:click="expandCountries()">Expand Countries</button>
                    <button v-on:click="expand2000()">Expand Year '2000'</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
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
        { field: 'country', rowGroup: true, hide: true },
        { field: 'year', rowGroup: true, hide: true },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        resizable: true,
      },
      rowData: null,
    };
  },
  created() {
    this.rowData = getData();
  },
  methods: {
    expandAll() {
      this.gridApi.expandAll();
    },
    collapseAll() {
      this.gridApi.collapseAll();
    },
    expandCountries() {
      this.gridApi.forEachNode((node) => {
        if (node.level === 0) {
          node.setExpanded(true);
        }
      });
    },
    expand2000() {
      this.gridApi.forEachNode((node) => {
        if (node.key === '2000') {
          node.parent.setExpanded(true); // ensure parent 'country' group is also expanded
          node.setExpanded(true);
        }
      });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
