import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :getRowId="getRowId"
                :readOnlyEdit="true"
                :rowData="rowData"
                @cell-edit-request="onCellEditRequest"></ag-grid-vue>
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
        { field: "year" },
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
        editable: true,
      },
      getRowId: null,
      rowData: null,
    };
  },
  created() {
    this.getRowId = (params) => params.data.id;
  },
  methods: {
    onCellEditRequest(event) {
      const data = event.data;
      const field = event.colDef.field;
      const newValue = event.newValue;
      const newItem = { ...data };
      newItem[field] = event.newValue;
      console.log("onCellEditRequest, updating " + field + " to " + newValue);
      rowImmutableStore = rowImmutableStore.map((oldItem) =>
        oldItem.id == newItem.id ? newItem : oldItem
      );
      this.gridApi.setRowData(rowImmutableStore);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        data.forEach((item, index) => (item.id = index));
        rowImmutableStore = data;
        params.api.setRowData(rowImmutableStore);
      };

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

let rowImmutableStore;

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
