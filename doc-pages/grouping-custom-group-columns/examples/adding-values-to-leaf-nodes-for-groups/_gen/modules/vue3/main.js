import { createApp } from "vue";
import { AgGridVue } from "@ag-grid-community/vue3";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
  SetFilterModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :groupDisplayType="groupDisplayType"
                :enableRangeSelection="true"
                :animateRows="true"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          headerName: "Country",
          colId: "countryGroup",
          showRowGroup: "country",
          minWidth: 200,
          cellRenderer: "agGroupCellRenderer",
          filterValueGetter: (params) => {
            return params.data ? params.data.country : null;
          },
        },
        { field: "country", rowGroup: true, hide: true },
        {
          headerName: "Year / Athlete",
          colId: "yearAthleteGroup",
          minWidth: 220,
          showRowGroup: "year",
          cellRenderer: "agGroupCellRenderer",
          valueGetter: "data ? data.athlete : null",
        },
        { field: "year", rowGroup: true, hide: true },
        { field: "sport", minWidth: 200 },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
        { field: "age" },
        { field: "date", minWidth: 140 },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        filter: true,
        sortable: true,
        resizable: true,
      },
      groupDisplayType: null,
      rowData: null,
    };
  },
  created() {
    this.groupDisplayType = "custom";
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
