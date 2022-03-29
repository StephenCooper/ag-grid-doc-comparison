import { Component } from "@angular/core";
import { ColDef, GridReadyEvent, RowClassRules } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { DragSourceRenderer } from "./drag-source-renderer.component";

@Component({
  selector: "my-app",
  template: `<div class="outer">
    <div class="grid-col">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [rowClassRules]="rowClassRules"
        [defaultColDef]="defaultColDef"
        [rowData]="rowData"
        [rowDragManaged]="true"
        [columnDefs]="columnDefs"
        [animateRows]="true"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>

    <div
      class="drop-col"
      (dragover)="onDragOver($event)"
      (drop)="onDrop($event)"
    >
      <span id="eDropTarget" class="drop-target"> ==&gt; Drop to here </span>
      <div id="eJsonDisplay" class="json-display"></div>
    </div>
  </div> `,
})
export class AppComponent {
  public rowClassRules: RowClassRules = {
    "red-row": 'data.color == "Red"',
    "green-row": 'data.color == "Green"',
    "blue-row": 'data.color == "Blue"',
  };
  public defaultColDef: ColDef = {
    width: 80,
    sortable: true,
    filter: true,
    resizable: true,
  };
  public rowData: any[] | null = getData();
  public columnDefs: ColDef[] = [
    { cellRenderer: DragSourceRenderer, minWidth: 100 },
    { field: "id" },
    { field: "color" },
    { field: "value1" },
    { field: "value2" },
  ];

  onDragOver(event: any) {
    var types = event.dataTransfer.types;
    var dragSupported = types.length;
    if (dragSupported) {
      event.dataTransfer.dropEffect = "move";
    }
    event.preventDefault();
  }

  onDrop(event: any) {
    event.preventDefault();
    var textData = event.dataTransfer.getData("text/plain");
    var eJsonRow = document.createElement("div");
    eJsonRow.classList.add("json-row");
    eJsonRow.innerText = textData;
    var eJsonDisplay = document.querySelector("#eJsonDisplay")!;
    eJsonDisplay.appendChild(eJsonRow);
  }

  onGridReady(params: GridReadyEvent) {}
}
