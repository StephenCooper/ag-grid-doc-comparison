import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { AgGridVue } from "@ag-grid-community/vue";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import Vue from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CsvExportModule,
  ExcelExportModule,
  MenuModule,
  SetFilterModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="container">
                <div class="columns">
                    <div>
                        <button v-on:click="onBtExport()" style="font-weight: bold; margin-bottom: 5px;">Export to Excel</button>
                    </div>
                </div>
                <div class="grid-wrapper">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
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
        { field: "athlete", minWidth: 200 },
        { field: "country", minWidth: 200 },
        { field: "sport", minWidth: 150 },
        { field: "gold", hide: true },
        { field: "silver", hide: true },
        { field: "bronze", hide: true },
        { field: "total", hide: true },
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
      excelStyles: null,
      rowData: null,
    };
  },
  created() {
    this.excelStyles = [
      {
        id: "coverHeading",
        font: {
          size: 26,
          bold: true,
        },
      },
      {
        id: "coverText",
        font: {
          size: 14,
        },
      },
    ];
  },
  methods: {
    onBtExport() {
      const spreadsheets = [];
      //set a filter condition ensuring no records are returned so only the header content is exported
      const filterInstance = this.gridApi.getFilterInstance("athlete");
      filterInstance.setModel({
        values: [],
      });
      this.gridApi.onFilterChanged();
      //custom content for cover page
      spreadsheets.push(
        this.gridApi.getSheetDataForExcel({
          prependContent: [
            [
              {
                styleId: "coverHeading",
                mergeAcross: 3,
                data: { value: "AG Grid", type: "String" },
              },
            ],
            [
              {
                styleId: "coverHeading",
                mergeAcross: 3,
                data: { value: "", type: "String" },
              },
            ],
            [
              {
                styleId: "coverText",
                mergeAcross: 3,
                data: {
                  value:
                    "Data shown lists Olympic medal winners for years 2000-2012",
                  type: "String",
                },
              },
            ],
            [
              {
                styleId: "coverText",
                data: {
                  value:
                    "This data includes a row for each participation record - athlete name, country, year, sport, count of gold, silver, bronze medals won during the sports event",
                  type: "String",
                },
              },
            ],
          ],
          processHeaderCallback: () => "",
          sheetName: "cover",
        })
      );
      //remove filter condition set above so all the grid data can be exported on a separate sheet
      filterInstance.setModel(null);
      this.gridApi.onFilterChanged();
      spreadsheets.push(this.gridApi.getSheetDataForExcel());
      this.gridApi.exportMultipleSheetsAsExcel({
        data: spreadsheets,
        fileName: "ag-grid.xlsx",
      });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) =>
        params.api.setRowData(data.filter((rec) => rec.country != null));

      fetch("https://www.ag-grid.com/example-assets/small-olympic-winners.json")
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
