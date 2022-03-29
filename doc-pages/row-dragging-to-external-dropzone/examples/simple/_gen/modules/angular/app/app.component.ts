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
  RowClassRules,
  RowDropZoneParams,
} from "@ag-grid-community/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div class="toolbar">
      <label
        ><input type="checkbox" /> Enable suppressMoveWhenRowDragging</label
      >
    </div>
    <div class="drop-containers">
      <div class="grid-wrapper">
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
      <div class="drop-col">
        <span id="eDropTarget" class="drop-target">==&gt; Drop to here</span>
        <div class="tile-container"></div>
      </div>
    </div>
  </div> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "id", rowDrag: true },
    { field: "color" },
    { field: "value1" },
    { field: "value2" },
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
  };
  public rowClassRules: RowClassRules = {
    "red-row": 'data.color == "Red"',
    "green-row": 'data.color == "Green"',
    "blue-row": 'data.color == "Blue"',
  };
  public rowData: any[] | null = createRowData();

  onGridReady(params: GridReadyEvent) {
    addDropZones(params);
    addCheckboxListener(params);
  }
}

var rowIdSequence = 100;
function addCheckboxListener(params: GridReadyEvent) {
  var checkbox = document.querySelector("input[type=checkbox]")! as any;
  checkbox.addEventListener("change", function () {
    params.api.setSuppressMoveWhenRowDragging(checkbox.checked);
  });
}
function createRowData() {
  var data: any[] = [];
  [
    "Red",
    "Green",
    "Blue",
    "Red",
    "Green",
    "Blue",
    "Red",
    "Green",
    "Blue",
  ].forEach(function (color) {
    var newDataItem = {
      id: rowIdSequence++,
      color: color,
      value1: Math.floor(Math.random() * 100),
      value2: Math.floor(Math.random() * 100),
    };
    data.push(newDataItem);
  });
  return data;
}
function createTile(data: any) {
  var el = document.createElement("div");
  el.classList.add("tile");
  el.classList.add(data.color.toLowerCase());
  el.innerHTML =
    '<div class="id">' +
    data.id +
    "</div>" +
    '<div class="value">' +
    data.value1 +
    "</div>" +
    '<div class="value">' +
    data.value2 +
    "</div>";
  return el;
}
function addDropZones(params: GridReadyEvent) {
  var tileContainer = document.querySelector(".tile-container") as any;
  var dropZone: RowDropZoneParams = {
    getContainer: function () {
      return tileContainer as any;
    },
    onDragStop: function (params) {
      var tile = createTile(params.node.data);
      tileContainer.appendChild(tile);
    },
  };
  params.api.addRowDropZone(dropZone);
}
