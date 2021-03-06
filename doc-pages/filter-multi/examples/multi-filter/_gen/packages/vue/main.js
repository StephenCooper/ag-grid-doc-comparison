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
                :sideBar="sideBar"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'athlete', filter: 'agMultiColumnFilter' },
        {
          field: 'country',
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              {
                filter: 'agTextColumnFilter',
                filterParams: { defaultOption: 'startsWith' },
              },
              { filter: 'agSetColumnFilter' },
            ],
          },
        },
        {
          field: 'gold',
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              { filter: 'agNumberColumnFilter' },
              { filter: 'agSetColumnFilter' },
            ],
          },
        },
        {
          field: 'date',
          filter: 'agMultiColumnFilter',
          filterParams: dateFilterParams,
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 200,
        resizable: true,
        menuTabs: ['filterMenuTab'],
      },
      sideBar: null,
      rowData: null,
    };
  },
  created() {
    this.sideBar = { toolPanels: ['filters'] };
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

window.getDate = function getDate(value) {
  var dateParts = value.split('/');
  return new Date(
    Number(dateParts[2]),
    Number(dateParts[1]) - 1,
    Number(dateParts[0])
  );
};

var dateFilterParams = {
  filters: [
    {
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: (filterDate, cellValue) => {
          if (cellValue == null) return -1;
          return getDate(cellValue).getTime() - filterDate.getTime();
        },
      },
    },
    {
      filter: 'agSetColumnFilter',
      filterParams: {
        comparator: (a, b) => {
          return getDate(a).getTime() - getDate(b).getTime();
        },
      },
    },
  ],
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
