import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div style="padding-bottom: 1rem;">
                    <button v-on:click="filterBy2004()">Filter by Year 2008 &amp; 2012</button>
                    <button v-on:click="clearFilter()">Clear Filter</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :rowSelection="rowSelection"
                :groupSelectsChildren="true"
                :groupSelectsFiltered="true"
                :suppressRowClickSelection="true"
                :groupDefaultExpanded="groupDefaultExpanded"
                :isRowSelectable="isRowSelectable"
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
        { field: "country", rowGroup: true, hide: true },
        { field: "year", maxWidth: 100 },
        { field: "gold", aggFunc: "sum" },
        { field: "silver", aggFunc: "sum" },
        { field: "bronze", aggFunc: "sum" },
        { field: "date" },
        { field: "sport" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        sortable: true,
        filter: true,
      },
      autoGroupColumnDef: null,
      rowSelection: null,
      groupDefaultExpanded: null,
      isRowSelectable: null,
      rowData: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      headerName: "Athlete",
      field: "athlete",
      minWidth: 250,
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: {
        checkbox: true,
      },
    };
    this.rowSelection = "multiple";
    this.groupDefaultExpanded = -1;
    this.isRowSelectable = (node) => {
      return node.data
        ? node.data.year === 2008 || node.data.year === 2004
        : false;
    };
  },
  methods: {
    filterBy2004() {
      this.gridApi.setFilterModel({
        year: {
          type: "set",
          values: ["2008", "2012"],
        },
      });
    },
    clearFilter() {
      this.gridApi.setFilterModel(null);
    },
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

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
