import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
import { createApp } from "vue";
import ColourCellRenderer from "./colourCellRendererVue.js";

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
    ColourCellRenderer,
  },
  data: function () {
    return {
      columnDefs: [
        {
          headerName: "Text Editor",
          field: "color1",
          cellRenderer: "ColourCellRenderer",
          cellEditor: "agTextCellEditor",
        },
        {
          headerName: "Select Editor",
          field: "color2",
          cellRenderer: "ColourCellRenderer",
          cellEditor: "agSelectCellEditor",
          cellEditorParams: { values: colors },
        },
        {
          headerName: "Rich Select Editor",
          field: "color3",
          cellRenderer: "ColourCellRenderer",
          cellEditor: "agRichSelectCellEditor",
          cellEditorPopup: true,
          cellEditorParams: {
            values: colors,
            cellRenderer: "ColourCellRenderer",
          },
        },
        {
          headerName: "Large Text Editor",
          field: "description",
          cellEditorPopup: true,
          cellEditor: "agLargeTextCellEditor",
          flex: 2,
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        resizable: true,
        editable: true,
      },
      rowData: null,
    };
  },
  created() {
    this.rowData = data;
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

const colors = ["Red", "Green", "Blue"];

const data = Array.from(Array(20).keys()).map((val, index) => ({
  color1: colors[index % 3],
  color2: colors[index % 3],
  color3: colors[index % 3],
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
}));

createApp(VueExample).mount("#app");
