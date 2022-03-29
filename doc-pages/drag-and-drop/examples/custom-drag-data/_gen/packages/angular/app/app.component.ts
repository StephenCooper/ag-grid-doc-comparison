import { Component } from "@angular/core";
import {
  ColDef,
  DndSourceOnRowDragParams,
  GridReadyEvent,
  RowClassRules,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

@Component({
  selector: "my-app",
  template: `<div class="outer">
    <div class="grid-col">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [defaultColDef]="defaultColDef"
        [rowSelection]="rowSelection"
        [suppressRowClickSelection]="true"
        [rowClassRules]="rowClassRules"
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
  public defaultColDef: ColDef = {
    width: 80,
    sortable: true,
    filter: true,
    resizable: true,
  };
  public rowSelection = "multiple";
  public rowClassRules: RowClassRules = {
    "red-row": 'data.color == "Red"',
    "green-row": 'data.color == "Green"',
    "blue-row": 'data.color == "Blue"',
  };
  public rowData: any[] | null = getData();
  public columnDefs: ColDef[] = [
    {
      valueGetter: "'Drag'",
      dndSource: true,
      dndSourceOnRowDrag: onRowDrag,
      checkboxSelection: true,
    },
    { field: "id" },
    { field: "color" },
    { field: "value1" },
    { field: "value2" },
  ];

  onDragOver(event: any) {
    var dragSupported = event.dataTransfer.types.length;
    if (dragSupported) {
      event.dataTransfer.dropEffect = "move";
    }
    event.preventDefault();
  }

  onDrop(event: any) {
    event.preventDefault();
    var jsonData = event.dataTransfer.getData("application/json");
    var eJsonRow = document.createElement("div");
    eJsonRow.classList.add("json-row");
    eJsonRow.innerText = jsonData;
    var eJsonDisplay = document.querySelector("#eJsonDisplay")!;
    eJsonDisplay.appendChild(eJsonRow);
  }

  onGridReady(params: GridReadyEvent) {}
}

function onRowDrag(params: DndSourceOnRowDragParams) {
  // create the data that we want to drag
  var rowNode = params.rowNode;
  var e = params.dragEvent;
  var jsonObject = {
    grid: "GRID_001",
    operation: "Drag on Column",
    rowId: rowNode.data.id,
    selected: rowNode.isSelected(),
  };
  var jsonData = JSON.stringify(jsonObject);
  e.dataTransfer!.setData("application/json", jsonData);
  e.dataTransfer!.setData("text/plain", jsonData);
}
