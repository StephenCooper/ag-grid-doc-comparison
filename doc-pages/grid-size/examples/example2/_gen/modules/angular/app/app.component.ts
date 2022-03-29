import { Component } from "@angular/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  FirstDataRenderedEvent,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
  GridSizeChangedEvent,
  RowHeightParams,
} from "@ag-grid-community/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    [getRowHeight]="getRowHeight"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridSizeChanged)="onGridSizeChanged($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "athlete", minWidth: 150 },
    { field: "age", minWidth: 70, maxWidth: 90 },
    { field: "country", minWidth: 130 },
    { field: "year", minWidth: 70, maxWidth: 90 },
    { field: "date", minWidth: 120 },
    { field: "sport", minWidth: 120 },
    { field: "gold", minWidth: 80 },
    { field: "silver", minWidth: 80 },
    { field: "bronze", minWidth: 80 },
    { field: "total", minWidth: 80 },
  ];
  public defaultColDef: ColDef = {
    resizable: true,
  };
  public rowData: any[] | null = getData();
  public getRowHeight: (params: RowHeightParams) => number | undefined | null =
    function () {
      return currentRowHeight;
    };

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    updateRowHeight(params);
  }

  onGridSizeChanged(params: GridSizeChangedEvent) {
    updateRowHeight(params);
  }

  onGridReady(params: GridReadyEvent) {
    minRowHeight = params.api.getSizesForCurrentTheme().rowHeight;
    currentRowHeight = minRowHeight;
    params.api.sizeColumnsToFit();
  }
}

var minRowHeight = 25;
var currentRowHeight: number;
const updateRowHeight = (params: { api: GridApi }) => {
  // get the height of the grid body - this excludes the height of the headers
  const bodyViewport = document.querySelector(".ag-body-viewport");
  if (!bodyViewport) {
    return;
  }
  var gridHeight = bodyViewport.clientHeight;
  // get the rendered rows
  var renderedRowCount = params.api.getDisplayedRowCount();
  // if the rendered rows * min height is greater than available height, just just set the height
  // to the min and let the scrollbar do its thing
  if (renderedRowCount * minRowHeight >= gridHeight) {
    if (currentRowHeight !== minRowHeight) {
      currentRowHeight = minRowHeight;
      params.api.resetRowHeights();
    }
  } else {
    // set the height of the row to the grid height / number of rows available
    currentRowHeight = Math.floor(gridHeight / renderedRowCount);
    params.api.resetRowHeights();
  }
};
