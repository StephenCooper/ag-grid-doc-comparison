import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  ExcelExportParams,
  ExcelHeaderFooterConfig,
  ExcelHeaderFooterContent,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from "@ag-grid-community/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<div class="container">
    <div class="columns">
      <div class="column">
        <span>Header</span>
        <label>
          Position
          <select id="headerPosition">
            <option>Left</option>
            <option>Center</option>
            <option>Right</option>
          </select>
        </label>
        <label>
          Font
          <select id="headerFontName">
            <option>Calibri</option>
            <option>Arial</option>
          </select>
          <select id="headerFontSize">
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>16</option>
            <option>20</option>
          </select>
          <select id="headerFontWeight">
            <option>Regular</option>
            <option>Bold</option>
            <option>Italic</option>
            <option>Bold Italic</option>
          </select>
          <label class="option underline" for="headerUnderline">
            <input type="checkbox" id="headerUnderline" />
            <button style="text-decoration: underline;">U</button>
          </label>
        </label>
        <label class="option" for="headerValue"
          >Value
          <input id="headerValue" />
        </label>
      </div>
      <div class="column">
        <span>Footer</span>
        <label>
          Position
          <select id="footerPosition">
            <option>Left</option>
            <option>Center</option>
            <option>Right</option>
          </select>
        </label>
        <label>
          Font
          <select id="footerFontName">
            <option>Calibri</option>
            <option>Arial</option>
          </select>
          <select id="footerFontSize">
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>16</option>
            <option>20</option>
          </select>
          <select id="footerFontWeight">
            <option>Regular</option>
            <option>Bold</option>
            <option>Italic</option>
            <option>Bold Italic</option>
          </select>
          <label class="option underline" for="footerUnderline">
            <input type="checkbox" id="footerUnderline" />
            <button style="text-decoration: underline;">U</button>
          </label>
        </label>
        <label class="option" for="footerValue"
          >Value
          <input id="footerValue" />
        </label>
      </div>
    </div>
    <div>
      <button
        (click)="onBtExport()"
        style="margin: 5px 0px; font-weight: bold;"
      >
        Export to Excel
      </button>
    </div>
    <div class="grid-wrapper">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [popupParent]="popupParent"
        [rowData]="rowData"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "athlete", minWidth: 200 },
    { field: "country", minWidth: 200 },
    { field: "sport", minWidth: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  };
  public popupParent: HTMLElement = document.body;
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtExport() {
    this.gridApi.exportDataAsExcel(getParams());
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>(
        "https://www.ag-grid.com/example-assets/small-olympic-winners.json"
      )
      .subscribe((data) =>
        params.api!.setRowData(data.filter((rec: any) => rec.country != null))
      );
  }
}

const getValues = (type: string) => {
  const value = (
    document.querySelector("#" + type + "Value") as HTMLInputElement
  ).value;
  if (value == null) {
    return;
  }
  const obj: ExcelHeaderFooterContent = {
    value: value,
  };
  obj.position = (
    document.querySelector("#" + type + "Position") as HTMLInputElement
  ).value as "Left" | "Center" | "Right";
  const fontName = (
    document.querySelector("#" + type + "FontName") as HTMLInputElement
  ).value;
  const fontSize = (
    document.querySelector("#" + type + "FontSize") as HTMLInputElement
  ).value;
  const fontWeight = (
    document.querySelector("#" + type + "FontWeight") as HTMLInputElement
  ).value;
  const underline = (
    document.querySelector("#" + type + "Underline") as HTMLInputElement
  ).checked;
  if (
    fontName !== "Calibri" ||
    fontSize != "11" ||
    fontWeight !== "Regular" ||
    underline
  ) {
    obj.font = {};
    if (fontName !== "Calibri") {
      obj.font.fontName = fontName;
    }
    if (fontSize != "11") {
      obj.font.size = Number.parseInt(fontSize);
    }
    if (fontWeight !== "Regular") {
      if (fontWeight.indexOf("Bold") !== -1) {
        obj.font.bold = true;
      }
      if (fontWeight.indexOf("Italic") !== -1) {
        obj.font.italic = true;
      }
    }
    if (underline) {
      obj.font.underline = "Single";
    }
  }
  return obj;
};
const getParams: () => ExcelExportParams | undefined = () => {
  const header = getValues("header");
  const footer = getValues("footer");
  if (!header && !footer) {
    return undefined;
  }
  const obj: ExcelExportParams = {
    headerFooterConfig: {
      all: {},
    },
  };
  if (header) {
    obj.headerFooterConfig!.all!.header = [header];
  }
  if (footer) {
    obj.headerFooterConfig!.all!.footer = [footer];
  }
  return obj;
};
