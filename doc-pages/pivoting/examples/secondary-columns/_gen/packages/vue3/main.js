import { createApp } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
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
                :autoGroupColumnDef="autoGroupColumnDef"
                :sideBar="true"
                :pivotMode="true"
                :suppressAggFuncInHeader="true"
                :postProcessSecondaryColDef="postProcessSecondaryColDef"
                :postProcessSecondaryColGroupDef="postProcessSecondaryColGroupDef"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "country", rowGroup: true, enableRowGroup: true },
        {
          field: "year",
          pivot: true,
          enablePivot: true,
          pivotComparator: MyYearPivotComparator,
        },
        { field: "date" },
        { field: "sport" },
        { field: "gold", aggFunc: "sum" },
        { field: "silver", aggFunc: "sum" },
        { field: "bronze", aggFunc: "sum" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
        resizable: true,
      },
      autoGroupColumnDef: null,
      postProcessSecondaryColDef: null,
      postProcessSecondaryColGroupDef: null,
      rowData: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      minWidth: 250,
    };
    this.postProcessSecondaryColDef = (params) => {
      const colDef = params.colDef;
      // make all the columns upper case
      colDef.headerName = colDef.headerName.toUpperCase();
      // the pivot keys are the keys use for the pivot
      // don't change these, but you can use them for your information
      // console.log('Pivot Keys:');
      // console.log(colDef.pivotKeys);
      // // the value column is the value we are aggregating on
      // console.log('Pivot Value Keys:');
      // console.log(colDef.pivotValueColumn);
    };
    this.postProcessSecondaryColGroupDef = (params) => {
      const colGroupDef = params.colGroupDef;
      // for fun, add a css class for 2002
      if (colGroupDef.pivotKeys[0] === "2002") {
        colGroupDef.headerClass = "color-background";
      }
      // put 'year' in front of each group
      colGroupDef.headerName = "Year " + colGroupDef.headerName;
    };
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

window.MyYearPivotComparator = function MyYearPivotComparator(a, b) {
  var requiredOrder = ["2012", "2010", "2008", "2006", "2004", "2002", "2000"];
  return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
};

createApp(VueExample).mount("#app");
