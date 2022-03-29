import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue";
import Vue from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button style="font-size: 12px" v-on:click="onBtStartEditing()">Start Editing Line 2</button>
                    <button style="font-size: 12px" v-on:click="onBtStopEditing()">Stop Editing</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :editType="editType"
                :rowData="rowData"
                @cell-value-changed="onCellValueChanged"
                @row-value-changed="onRowValueChanged"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          field: "make",
          cellEditor: "agSelectCellEditor",
          cellEditorParams: {
            values: ["Porsche", "Toyota", "Ford", "AAA", "BBB", "CCC"],
          },
        },
        { field: "model" },
        { field: "field4", headerName: "Read Only", editable: false },
        { field: "price", cellEditor: NumericCellEditor },
        {
          headerName: "Suppress Navigable",
          field: "field5",
          suppressNavigable: true,
          minWidth: 200,
        },
        { headerName: "Read Only", field: "field6", editable: false },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        editable: true,
      },
      editType: null,
      rowData: null,
    };
  },
  created() {
    this.editType = "fullRow";
    this.rowData = getRowData();
  },
  methods: {
    onCellValueChanged(event) {
      console.log(
        "onCellValueChanged: " + event.colDef.field + " = " + event.newValue
      );
    },
    onRowValueChanged(event) {
      var data = event.data;
      console.log(
        "onRowValueChanged: (" +
          data.make +
          ", " +
          data.model +
          ", " +
          data.price +
          ", " +
          data.field5 +
          ")"
      );
    },
    onBtStopEditing() {
      this.gridApi.stopEditing();
    },
    onBtStartEditing() {
      this.gridApi.setFocusedCell(2, "make");
      this.gridApi.startEditingCell({
        rowIndex: 2,
        colKey: "make",
      });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.getRowData = function getRowData() {
  var rowData = [];
  for (var i = 0; i < 10; i++) {
    rowData.push({
      make: "Toyota",
      model: "Celica",
      price: 35000 + i * 1000,
      field4: "Sample XX",
      field5: "Sample 22",
      field6: "Sample 23",
    });
    rowData.push({
      make: "Ford",
      model: "Mondeo",
      price: 32000 + i * 1000,
      field4: "Sample YY",
      field5: "Sample 24",
      field6: "Sample 25",
    });
    rowData.push({
      make: "Porsche",
      model: "Boxter",
      price: 72000 + i * 1000,
      field4: "Sample ZZ",
      field5: "Sample 26",
      field6: "Sample 27",
    });
  }
  return rowData;
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
