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
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :sideBar="sideBar"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          headerName: 'Animals (array)',
          field: 'animalsArray',
          filter: 'agSetColumnFilter',
        },
        {
          headerName: 'Animals (string)',
          filter: 'agSetColumnFilter',
          valueGetter: valueGetter,
        },
        {
          headerName: 'Animals (objects)',
          field: 'animalsObjects',
          filter: 'agSetColumnFilter',
          valueFormatter: valueFormatter,
          keyCreator: keyCreator,
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
      },
      rowData: null,
      sideBar: null,
    };
  },
  created() {
    this.rowData = getData();
    this.sideBar = 'filters';
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

var valueGetter = function (params) {
  return params.data['animalsString'].split('|');
};

var valueFormatter = function (params) {
  return params.value
    .map(function (animal) {
      return animal.name;
    })
    .join(', ');
};

var keyCreator = function (params) {
  return params.value.map(function (animal) {
    return animal.name;
  });
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
