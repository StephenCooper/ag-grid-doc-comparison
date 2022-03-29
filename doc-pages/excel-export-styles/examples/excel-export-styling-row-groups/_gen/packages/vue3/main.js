import { createApp } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="page-wrapper">
                <div>
                    <button v-on:click="onBtnExportDataAsExcel()" style="margin-bottom: 5px; font-weight: bold;">Export to Excel</button>
                </div>
                <div class="grid-wrapper">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :excelStyles="excelStyles"
                :rowData="rowData"></ag-grid-vue>
                </div>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "country", minWidth: 120, rowGroup: true },
        { field: "year", rowGroup: true },
        { headerName: "Name", field: "athlete", minWidth: 150 },
        {
          headerName: "Name Length",
          valueGetter: "data ? data.athlete.length : ''",
        },
        { field: "sport", minWidth: 120, rowGroup: true },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        sortable: true,
        filter: true,
        resizable: true,
        minWidth: 100,
        flex: 1,
      },
      autoGroupColumnDef: null,
      excelStyles: null,
      rowData: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      cellClass: getIndentClass,
      minWidth: 250,
      flex: 1,
    };
    this.excelStyles = [
      {
        id: "indent-1",
        alignment: {
          indent: 1,
        },
        // note, dataType: 'string' required to ensure that numeric values aren't right-aligned
        dataType: "String",
      },
      {
        id: "indent-2",
        alignment: {
          indent: 2,
        },
        dataType: "String",
      },
      {
        id: "indent-3",
        alignment: {
          indent: 3,
        },
        dataType: "String",
      },
    ];
  },
  methods: {
    onBtnExportDataAsExcel() {
      this.gridApi.exportDataAsExcel({
        processRowGroupCallback: rowGroupCallback,
      });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        this.rowData = data;
        params.api.forEachNode(function (node) {
          node.expanded = true;
        });
        params.api.onGroupExpandedOrCollapsed();
      };

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

window.rowGroupCallback = function rowGroupCallback(params) {
  return params.node.key;
};

window.getIndentClass = function getIndentClass(params) {
  var indent = 0;
  var node = params.node;
  while (node && node.parent) {
    indent++;
    node = node.parent;
  }
  return "indent-" + indent;
};

createApp(VueExample).mount("#app");
