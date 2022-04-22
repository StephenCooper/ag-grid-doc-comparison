import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue';
import Vue from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :rowData="rowData"
                :animateRows="false"
                :groupDisplayType="groupDisplayType"
                :defaultColDef="defaultColDef"
                @row-group-opened="onRowGroupOpened"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'athlete', width: 150, rowGroupIndex: 0 },
        { field: 'age', width: 90, rowGroupIndex: 1 },
        { field: 'country', width: 120, rowGroupIndex: 2 },
        { field: 'year', width: 90 },
        { field: 'date', width: 110, rowGroupIndex: 2 },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
      },
      groupDisplayType: null,
      rowData: null,
    };
  },
  created() {
    this.groupDisplayType = 'groupRows';
  },
  methods: {
    onRowGroupOpened(event) {
      var rowNodeIndex = event.node.rowIndex;
      // factor in child nodes so we can scroll to correct position
      var childCount = event.node.childrenAfterSort
        ? event.node.childrenAfterSort.length
        : 0;
      var newIndex = rowNodeIndex + childCount;
      this.gridApi.ensureIndexVisible(newIndex);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

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
