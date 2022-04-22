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
                :autoGroupColumnDef="autoGroupColumnDef"
                :defaultColDef="defaultColDef"
                :suppressRowClickSelection="true"
                :groupSelectsChildren="true"
                :rowSelection="rowSelection"
                :rowGroupPanelShow="rowGroupPanelShow"
                :pivotPanelShow="pivotPanelShow"
                :enableRangeSelection="true"
                :pagination="true"
                :rowData="rowData"></ag-grid-vue>
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
          minWidth: 170,
          checkboxSelection: checkboxSelection,
          headerCheckboxSelection: headerCheckboxSelection,
        },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        editable: true,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
      },
      autoGroupColumnDef: null,
      rowSelection: null,
      rowGroupPanelShow: null,
      pivotPanelShow: null,
      rowData: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      headerName: 'Group',
      minWidth: 170,
      field: 'athlete',
      valueGetter: (params) => {
        if (params.node.group) {
          return params.node.key;
        } else {
          return params.data[params.colDef.field];
        }
      },
      headerCheckboxSelection: true,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
        checkbox: true,
      },
    };
    this.rowSelection = 'multiple';
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
  },
  methods: {
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

var checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};

var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
