import Vue from "vue";
import { AgGridVue } from "@ag-grid-community/vue";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

class YearCellEditor {
  getGui() {
    return this.eGui;
  }

  getValue() {
    return this.value;
  }

  isPopup() {
    return true;
  }

  init(params) {
    this.value = params.value;
    const tempElement = document.createElement("div");
    tempElement.innerHTML =
      '<div class="yearSelect">' +
      "<div>Clicking here does not close the popup!</div>" +
      '<button id="bt2006" class="yearButton">2006</button>' +
      '<button id="bt2008" class="yearButton">2008</button>' +
      '<button id="bt2010" class="yearButton">2010</button>' +
      '<button id="bt2012" class="yearButton">2012</button>' +
      "<div>" +
      '<input type="text" style="width: 100%;" placeholder="clicking on this text field does not close"/>' +
      "</div>" +
      "</div>";

    [2006, 2008, 2010, 2012].forEach((year) => {
      tempElement.querySelector("#bt" + year).addEventListener("click", () => {
        this.value = year;
        params.stopEditing();
      });
    });

    this.eGui = tempElement.firstChild;
  }
}

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div class="example-header">
                    Clicking outside the grid will stop the editing <button style="font-size: 12px">Dummy Save</button>
                    <input placeholder="click here, editing stops">
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :stopEditingWhenCellsLoseFocus="true"
                :rowData="rowData"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "athlete", minWidth: 160 },
        { field: "age" },
        { field: "country", minWidth: 140 },
        { field: "year", cellEditor: YearCellEditor, cellEditorPopup: true },
        { field: "date", minWidth: 140 },
        { field: "sport", minWidth: 160 },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        filter: true,
        editable: true,
      },
      rowData: null,
    };
  },
  created() {},
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

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
