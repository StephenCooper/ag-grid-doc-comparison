import { Component } from "@angular/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from "@ag-grid-community/core";
import { ColourCellRenderer } from "./colour-cell-renderer.component";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      headerName: "Text Editor",
      field: "color1",
      cellRenderer: ColourCellRenderer,
      cellEditor: "agTextCellEditor",
    },
    {
      headerName: "Select Editor",
      field: "color2",
      cellRenderer: ColourCellRenderer,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: colors,
      },
    },
    {
      headerName: "Rich Select Editor",
      field: "color3",
      cellRenderer: ColourCellRenderer,
      cellEditor: "agRichSelectCellEditor",
      cellEditorPopup: true,
      cellEditorParams: {
        values: colors,
        cellRenderer: ColourCellRenderer,
      },
    },
    {
      headerName: "Large Text Editor",
      field: "description",
      cellEditorPopup: true,
      cellEditor: "agLargeTextCellEditor",
      flex: 2,
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    resizable: true,
    editable: true,
  };
  public rowData: any[] | null = data;

  onGridReady(params: GridReadyEvent) {}
}

const colors = ["Red", "Green", "Blue"];
const data = Array.from(Array(20).keys()).map((val: any, index: number) => ({
  color1: colors[index % 3],
  color2: colors[index % 3],
  color3: colors[index % 3],
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
}));
