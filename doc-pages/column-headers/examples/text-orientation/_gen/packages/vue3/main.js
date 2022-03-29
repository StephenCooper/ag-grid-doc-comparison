import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
import { createApp } from "vue";

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
                :groupHeaderHeight="groupHeaderHeight"
                :headerHeight="headerHeight"
                :floatingFiltersHeight="floatingFiltersHeight"
                :pivotGroupHeaderHeight="pivotGroupHeaderHeight"
                :pivotHeaderHeight="pivotHeaderHeight"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          headerName: "Athlete Details",
          children: [
            {
              field: "athlete",
              width: 150,
              suppressSizeToFit: true,
              enableRowGroup: true,
              rowGroupIndex: 0,
            },
            {
              field: "age",
              width: 90,
              minWidth: 75,
              maxWidth: 100,
              enableRowGroup: true,
            },
            { field: "country", width: 120, enableRowGroup: true },
            { field: "year", width: 90, enableRowGroup: true, pivotIndex: 0 },
            { field: "sport", width: 110, enableRowGroup: true },
            {
              field: "gold",
              width: 60,
              enableValue: true,
              suppressMenu: true,
              filter: "agNumberColumnFilter",
              aggFunc: "sum",
            },
            {
              field: "silver",
              width: 60,
              enableValue: true,
              suppressMenu: true,
              filter: "agNumberColumnFilter",
              aggFunc: "sum",
            },
            {
              field: "bronze",
              width: 60,
              enableValue: true,
              suppressMenu: true,
              filter: "agNumberColumnFilter",
              aggFunc: "sum",
            },
            {
              field: "total",
              width: 60,
              enableValue: true,
              suppressMenu: true,
              filter: "agNumberColumnFilter",
              aggFunc: "sum",
            },
          ],
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        sortable: true,
        resizable: true,
      },
      groupHeaderHeight: null,
      headerHeight: null,
      floatingFiltersHeight: null,
      pivotGroupHeaderHeight: null,
      pivotHeaderHeight: null,
      rowData: null,
    };
  },
  created() {
    this.groupHeaderHeight = 75;
    this.headerHeight = 150;
    this.floatingFiltersHeight = 50;
    this.pivotGroupHeaderHeight = 50;
    this.pivotHeaderHeight = 100;
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => params.api.setRowData(data);

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

createApp(VueExample).mount("#app");
