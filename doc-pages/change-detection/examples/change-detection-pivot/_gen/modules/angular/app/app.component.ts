import {
  ColDef,
  ColumnApi,
  GetRowIdFunc,
  GridApi,
  GridReadyEvent,
  RowNode,
  ValueGetterParams,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { Component } from "@angular/core";
// Required feature modules are registered in app.module.ts
interface Student {
  student: number;
  yearGroup: string;
  age: number;
  course: string;
  points: number;
}

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div class="example-header">
      <div>
        <label>
          <input type="checkbox" id="pivot-mode" (click)="pivotMode()" />
          Group &amp; Pivot
        </label>
      </div>

      <div style="margin-top: 6px;">
        <button (click)="updateOneRecord()">Set One Value</button>
        <button (click)="updateUsingTransaction()">Update Points</button>
        <button (click)="addNewGroupUsingTransaction()">Add New Group</button>
        <button (click)="addNewCourse()">Add Physics Row</button>
        <button (click)="removePhysics()">Remove All Physics</button>
        <button (click)="moveCourse()">Move Course</button>
      </div>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine-dark"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      [pivotMode]="true"
      [groupDefaultExpanded]="groupDefaultExpanded"
      [animateRows]="true"
      [getRowId]="getRowId"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  public columnDefs: ColDef[] = [
    { headerName: "Student ID", field: "student" },
    { headerName: "Year Group", field: "yearGroup", rowGroup: true },
    { headerName: "Age", field: "age" },
    { headerName: "Course", field: "course", pivot: true },
    {
      headerName: "Age Range",
      valueGetter: ageRangeValueGetter,
      pivot: true,
    },
    { headerName: "Points", field: "points", aggFunc: "sum" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    sortable: true,
    resizable: true,
    cellRenderer: "agAnimateShowChangeCellRenderer",
  };
  public rowData: any[] | null = getRowData();
  public groupDefaultExpanded = 1;
  public getRowId: GetRowIdFunc = function (params) {
    return params.data.student;
  };

  pivotMode() {
    var pivotModeOn = (
      document.getElementById("pivot-mode") as HTMLInputElement
    ).checked;
    this.gridColumnApi.setPivotMode(pivotModeOn);
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "yearGroup", rowGroup: pivotModeOn },
        { colId: "course", pivot: pivotModeOn },
        { colId: "ageRange", pivot: pivotModeOn },
      ],
    });
  }

  updateOneRecord() {
    var rowNodeToUpdate = pickExistingRowNodeAtRandom(this.gridApi!);
    if (!rowNodeToUpdate) return;
    var randomValue = createNewRandomScore(rowNodeToUpdate.data);
    console.log(
      "updating points to " + randomValue + " on ",
      rowNodeToUpdate.data
    );
    rowNodeToUpdate.setDataValue("points", randomValue);
  }

  updateUsingTransaction() {
    var itemToUpdate = pickExistingRowItemAtRandom(this.gridApi!);
    if (!itemToUpdate) {
      return;
    }
    console.log("updating - before", itemToUpdate);
    itemToUpdate.points = createNewRandomScore(itemToUpdate);
    var transaction = {
      update: [itemToUpdate],
    };
    console.log("updating - after", itemToUpdate);
    this.gridApi.applyTransaction(transaction);
  }

  addNewGroupUsingTransaction() {
    var item1 = createRow();
    var item2 = createRow();
    item1.yearGroup = "Year 5";
    item2.yearGroup = "Year 5";
    var transaction = {
      add: [item1, item2],
    };
    console.log("add - ", item1);
    console.log("add - ", item2);
    this.gridApi.applyTransaction(transaction);
  }

  addNewCourse() {
    var item1 = createRow();
    item1.course = "Physics";
    var transaction = {
      add: [item1],
    };
    console.log("add - ", item1);
    this.gridApi.applyTransaction(transaction);
  }

  removePhysics() {
    var allPhysics: any = [];
    this.gridApi.forEachLeafNode(function (rowNode) {
      if (rowNode.data.course === "Physics") {
        allPhysics.push(rowNode.data);
      }
    });
    var transaction = {
      remove: allPhysics,
    };
    console.log("removing " + allPhysics.length + " physics items.");
    this.gridApi.applyTransaction(transaction);
  }

  moveCourse() {
    var item = pickExistingRowItemAtRandom(this.gridApi!);
    if (!item) {
      return;
    }
    item.course = item.course === "History" ? "Science" : "History";
    var transaction = {
      update: [item],
    };
    console.log("moving " + item);
    this.gridApi.applyTransaction(transaction);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    (document.getElementById("pivot-mode") as HTMLInputElement).checked = true;
  }
}

function ageRangeValueGetter(params: ValueGetterParams) {
  var age = params.getValue("age");
  if (age === undefined) {
    return null;
  }
  if (age < 20) {
    return "< 20";
  } else if (age > 30) {
    return "> 30";
  } else {
    return "20 to 30";
  }
}
// pretty basic, but deterministic (so same numbers each time we run), random number generator
var seed: number;
function random() {
  seed = ((seed || 1) * 16807) % 2147483647;
  return seed;
}
function getRowData() {
  var rowData = [];
  for (var i = 1; i <= 100; i++) {
    var row = createRow();
    rowData.push(row);
  }
  return rowData;
}
var studentId: number;
function createRow() {
  studentId = studentId ? studentId : 10023;
  var randomNumber = random();
  return {
    student: studentId++,
    points: (randomNumber % 60) + 40,
    course: ["Science", "History"][randomNumber % 3 === 0 ? 0 : 1],
    yearGroup: "Year " + ((randomNumber % 4) + 1),
    age: (randomNumber % 25) + 15, // 15 to 40
  };
}
function createNewRandomScore(data: Student) {
  var randomValue = createRandomNumber();
  // make sure random number is not actually the same number again
  while (randomValue === data.points) {
    randomValue = createRandomNumber();
  }
  return randomValue;
}
function createRandomNumber() {
  return Math.floor(Math.random() * 100);
}
function pickExistingRowNodeAtRandom(gridApi: GridApi) {
  var allItems: RowNode[] = [];
  gridApi.forEachLeafNode(function (rowNode) {
    allItems.push(rowNode);
  });
  if (allItems.length === 0) {
    return;
  }
  var result = allItems[Math.floor(Math.random() * allItems.length)];
  return result;
}
function pickExistingRowItemAtRandom(gridApi: GridApi): Student | null {
  var rowNode = pickExistingRowNodeAtRandom(gridApi);
  return rowNode ? rowNode.data : null;
}
