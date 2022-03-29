import { createApp } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import NumberFloatingFilterComponent from "./numberFloatingFilterComponentVue.js";

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
    NumberFloatingFilterComponent,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "athlete", filter: false },
        {
          field: "gold",
          filter: "agNumberColumnFilter",
          suppressMenu: true,
          floatingFilterComponent: "NumberFloatingFilterComponent",
          floatingFilterComponentParams: {
            suppressFilterButton: true,
            color: "red",
          },
        },
        {
          field: "silver",
          filter: "agNumberColumnFilter",
          suppressMenu: true,
          floatingFilterComponent: "NumberFloatingFilterComponent",
          floatingFilterComponentParams: {
            suppressFilterButton: true,
            color: "blue",
          },
        },
        {
          field: "bronze",
          filter: "agNumberColumnFilter",
          suppressMenu: true,
          floatingFilterComponent: "NumberFloatingFilterComponent",
          floatingFilterComponentParams: {
            suppressFilterButton: true,
            color: "green",
          },
        },
        {
          field: "total",
          filter: "agNumberColumnFilter",
          suppressMenu: true,
          floatingFilterComponent: "NumberFloatingFilterComponent",
          floatingFilterComponentParams: {
            suppressFilterButton: true,
            color: "orange",
          },
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
      rowData: null,
    };
  },
  created() {},
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        this.rowData = data;
      };

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

createApp(VueExample).mount("#app");
