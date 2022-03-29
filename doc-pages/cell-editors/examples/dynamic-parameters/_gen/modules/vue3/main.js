import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "@ag-grid-community/vue3";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { RichSelectModule } from "@ag-grid-enterprise/rich-select";
import { createApp } from "vue";
import GenderCellRenderer from "./genderCellRendererVue.js";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RichSelectModule,
  MenuModule,
  ColumnsToolPanelModule,
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
                :rowData="rowData"
                @cell-value-changed="onCellValueChanged"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
    GenderCellRenderer,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "name" },
        {
          field: "gender",
          cellRenderer: "GenderCellRenderer",
          cellEditor: "agRichSelectCellEditor",
          cellEditorPopup: true,
          cellEditorParams: {
            values: ["Male", "Female"],
            cellRenderer: "GenderCellRenderer",
            cellEditorPopup: true,
          },
        },
        {
          field: "country",
          cellEditor: "agRichSelectCellEditor",
          cellEditorPopup: true,
          cellEditorParams: { cellHeight: 50, values: ["Ireland", "USA"] },
        },
        {
          field: "city",
          cellEditor: "agRichSelectCellEditor",
          cellEditorPopup: true,
          cellEditorParams: cellCellEditorParams,
        },
        {
          field: "address",
          cellEditor: "agLargeTextCellEditor",
          cellEditorPopup: true,
          minWidth: 550,
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 130,
        editable: true,
        resizable: true,
      },
      rowData: null,
    };
  },
  created() {
    this.rowData = getData();
  },
  methods: {
    onCellValueChanged(params) {
      const colId = params.column.getId();
      if (colId === "country") {
        const selectedCountry = params.data.country;
        const selectedCity = params.data.city;
        const allowedCities = countyToCityMap(selectedCountry);
        const cityMismatch = allowedCities.indexOf(selectedCity) < 0;
        if (cityMismatch) {
          params.node.setDataValue("city", null);
        }
      }
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.countyToCityMap = function countyToCityMap(match) {
  const map = {
    Ireland: ["Dublin", "Cork", "Galway"],
    USA: ["New York", "Los Angeles", "Chicago", "Houston"],
  };
  return map[match];
};

const cellCellEditorParams = (params) => {
  const selectedCountry = params.data.country;
  const allowedCities = countyToCityMap(selectedCountry);
  return {
    values: allowedCities,
    formatValue: (value) => `${value} (${selectedCountry})`,
  };
};

createApp(VueExample).mount("#app");
