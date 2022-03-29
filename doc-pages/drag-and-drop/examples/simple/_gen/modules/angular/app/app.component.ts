import { ColDef, GridReadyEvent, RowClassRules } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { Component } from "@angular/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<div class="outer">
    <div class="grid-col">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [rowClassRules]="rowClassRules"
        [rowData]="rowData"
        [rowDragManaged]="true"
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
  public columnDefs: ColDef[] = [
    { valueGetter: "'Drag'", dndSource: true },
    { field: "id" },
    { field: "color" },
    { field: "value1" },
    { field: "value2" },
  ];
  public defaultColDef: ColDef = {
    width: 80,
    sortable: true,
    filter: true,
    resizable: true,
  };
  public rowClassRules: RowClassRules = {
    "red-row": 'data.color == "Red"',
    "green-row": 'data.color == "Green"',
    "blue-row": 'data.color == "Blue"',
  };
  public rowData: any[] | null = getData();

  onDragOver(event: any) {
    var dragSupported = event.dataTransfer.length;
    if (dragSupported) {
      event.dataTransfer.dropEffect = "move";
    }
    event.preventDefault();
  }

  onDrop(event: any) {
    var jsonData = event.dataTransfer.getData("application/json");
    var eJsonRow = document.createElement("div");
    eJsonRow.classList.add("json-row");
    eJsonRow.innerText = jsonData;
    var eJsonDisplay = document.querySelector("#eJsonDisplay")!;
    eJsonDisplay.appendChild(eJsonRow);
    event.preventDefault();
  }

  onGridReady(params: GridReadyEvent) {}
}
