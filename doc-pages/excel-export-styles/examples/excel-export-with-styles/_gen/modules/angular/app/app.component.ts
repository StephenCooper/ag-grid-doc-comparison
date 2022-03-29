import {
  CellClassParams,
  ColDef,
  ColGroupDef,
  ExcelStyle,
  GridApi,
  GridReadyEvent,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<div class="container">
    <div class="columns">
      <div class="option">
        <label for="fontSize">
          <input type="checkbox" id="fontSize" />
          Font Size =
        </label>
        <input type="text" id="fontSizeValue" value="14" style="width: 40px;" />
      </div>
      <div class="option">
        <label for="rowHeight">
          <input type="checkbox" id="rowHeight" />
          Row Height =
        </label>
        <input
          type="text"
          id="rowHeightValue"
          value="30"
          style="width: 40px;"
        />
      </div>
      <div class="option">
        <label for="headerRowHeight">
          <input type="checkbox" id="headerRowHeight" />
          Header Row Height =
        </label>
        <input
          type="text"
          id="headerRowHeightValue"
          value="30"
          style="width: 40px;"
        />
      </div>
    </div>
    <div>
      <label>
        <button
          (click)="onBtExport()"
          style="margin-bottom: 5px; font-weight: bold;"
        >
          Export to Excel
        </button>
      </label>
    </div>
    <div class="grid-wrapper">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [pinnedTopRowData]="pinnedTopRowData"
        [pinnedBottomRowData]="pinnedBottomRowData"
        [excelStyles]="excelStyles"
        [rowData]="rowData"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: "Top Level Column Group",
      children: [
        {
          headerName: "Group A",
          children: [
            { field: "athlete", minWidth: 200 },
            {
              field: "age",
              cellClass: "twoDecimalPlaces",
              cellClassRules: {
                greenBackground: function (params) {
                  return params.value < 23;
                },
                redFont: function (params) {
                  return params.value < 20;
                },
              },
            },
            {
              field: "country",
              minWidth: 200,
              cellClassRules: {
                redFont: function (params) {
                  return params.value === "United States";
                },
              },
            },
            {
              headerName: "Group",
              valueGetter: "data.country.charAt(0)",
              cellClassRules: {
                boldBorders: function (params) {
                  return params.value === "U";
                },
              },
              cellClass: ["redFont", "greenBackground"],
            },
            {
              field: "year",
              cellClassRules: {
                notInExcel: function (params) {
                  return true;
                },
              },
            },
          ],
        },
        {
          headerName: "Group B",
          children: [
            {
              field: "date",
              minWidth: 150,
              cellClass: "dateFormat",
              valueGetter: function (params) {
                var val = params.data.date;
                if (val.indexOf("/") < 0) {
                  return val;
                }
                var split = val.split("/");
                return split[2] + "-" + split[1] + "-" + split[0];
              },
            },
            { field: "sport", minWidth: 150 },
            {
              field: "gold",
              cellClassRules: {
                boldBorders: function (params) {
                  return params.value > 2;
                },
              },
            },
            { field: "silver", cellClass: "textFormat" },
            { field: "bronze" },
            { field: "total" },
          ],
        },
      ],
    },
  ];
  public defaultColDef: ColDef = {
    cellClassRules: {
      darkGreyBackground: function (params: CellClassParams) {
        return (params.node.rowIndex || 0) % 2 == 0;
      },
    },
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  };
  public pinnedTopRowData: any[] = [
    {
      athlete: "Floating <Top> Athlete",
      age: 999,
      country: "Floating <Top> Country",
      year: 2020,
      date: "2020-08-01",
      sport: "Track & Field",
      gold: 22,
      silver: "003",
      bronze: 44,
      total: 55,
    },
  ];
  public pinnedBottomRowData: any[] = [
    {
      athlete: "Floating <Bottom> Athlete",
      age: 888,
      country: "Floating <Bottom> Country",
      year: 2030,
      date: "2030-08-01",
      sport: "Track & Field",
      gold: 222,
      silver: "005",
      bronze: 244,
      total: 255,
    },
  ];
  public excelStyles: ExcelStyle[] = [
    {
      id: "cell",
      alignment: {
        vertical: "Center",
      },
    },
    {
      id: "header",
      alignment: {
        vertical: "Center",
      },
      interior: {
        color: "#f8f8f8",
        pattern: "Solid",
        patternColor: undefined,
      },
      borders: {
        borderBottom: {
          color: "#babfc7",
          lineStyle: "Continuous",
          weight: 1,
        },
      },
    },
    {
      id: "headerGroup",
      font: {
        bold: true,
      },
    },
    {
      id: "greenBackground",
      interior: {
        color: "#b5e6b5",
        pattern: "Solid",
      },
    },
    {
      id: "redFont",
      font: {
        fontName: "Calibri Light",
        underline: "Single",
        italic: true,
        color: "#ff0000",
      },
    },
    {
      id: "darkGreyBackground",
      interior: {
        color: "#888888",
        pattern: "Solid",
      },
      font: {
        fontName: "Calibri Light",
        color: "#ffffff",
      },
    },
    {
      id: "boldBorders",
      borders: {
        borderBottom: {
          color: "#000000",
          lineStyle: "Continuous",
          weight: 3,
        },
        borderLeft: {
          color: "#000000",
          lineStyle: "Continuous",
          weight: 3,
        },
        borderRight: {
          color: "#000000",
          lineStyle: "Continuous",
          weight: 3,
        },
        borderTop: {
          color: "#000000",
          lineStyle: "Continuous",
          weight: 3,
        },
      },
    },
    {
      id: "dateFormat",
      dataType: "DateTime",
      numberFormat: {
        format: "mm/dd/yyyy;@",
      },
    },
    {
      id: "twoDecimalPlaces",
      numberFormat: {
        format: "#,##0.00",
      },
    },
    {
      id: "textFormat",
      dataType: "String",
    },
  ];
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtExport() {
    var params = {
      fontSize: getBooleanValue("#fontSize")
        ? getNumericValue("#fontSizeValue")
        : undefined,
      rowHeight: getBooleanValue("#rowHeight")
        ? getNumericValue("#rowHeightValue")
        : undefined,
      headerRowHeight: getBooleanValue("#headerRowHeight")
        ? getNumericValue("#headerRowHeightValue")
        : undefined,
    };
    this.gridApi.exportDataAsExcel(params);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    (document.getElementById("fontSize") as HTMLInputElement).checked = true;
    (document.getElementById("rowHeight") as HTMLInputElement).checked = true;
    (document.getElementById("headerRowHeight") as HTMLInputElement).checked =
      true;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}

function getBooleanValue(cssSelector: string) {
  return (
    (document.querySelector(cssSelector) as HTMLInputElement).checked === true
  );
}
function getTextValue(cssSelector: string) {
  return (document.querySelector(cssSelector) as HTMLInputElement).value;
}
function getNumericValue(cssSelector: string) {
  var value = parseFloat(getTextValue(cssSelector));
  if (isNaN(value)) {
    var message = "Invalid number entered in " + cssSelector + " field";
    alert(message);
    throw new Error(message);
  }
  return value;
}
