import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  GetRowIdFunc,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
  IServerSideDatasource,
  IServerSideGetRowsParams,
  ServerSideStoreType,
} from "ag-grid-community";

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="onAdd()">Add at End</button>
      <button (click)="onAdd(0)">Add at Start</button>
      <button (click)="onUpdateSelected()">Update Selected</button>
      <button (click)="onUpdateRandom()">Update Random</button>
      <button (click)="onRemoveSelected()">Remove Selected</button>
      <button (click)="onRemoveRandom()">Remove Random</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine-dark"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [getRowId]="getRowId"
      [rowSelection]="rowSelection"
      [serverSideStoreType]="serverSideStoreType"
      [enableCellChangeFlash]="true"
      [rowModelType]="rowModelType"
      [animateRows]="true"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [{ field: "product" }, { field: "value" }];
  public defaultColDef: ColDef = {
    width: 250,
    resizable: true,
  };
  public getRowId: GetRowIdFunc = function (params) {
    return params.data.product;
  };
  public rowSelection = "multiple";
  public serverSideStoreType: ServerSideStoreType = "full";
  public rowModelType = "serverSide";
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onRemoveSelected() {
    const rowsToRemove = this.gridApi.getSelectedRows();
    const tx = {
      remove: rowsToRemove,
    };
    this.gridApi.applyServerSideTransaction(tx);
  }

  onRemoveRandom() {
    const rowsToRemove: any[] = [];
    let firstRow: any;
    this.gridApi.forEachNode(function (node) {
      if (firstRow == null) {
        firstRow = node.data;
      }
      // skip half the nodes at random
      if (Math.random() < 0.75) {
        return;
      }
      rowsToRemove.push(node.data);
    });
    if (rowsToRemove.length == 0 && firstRow != null) {
      rowsToRemove.push(firstRow);
    }
    const tx = {
      remove: rowsToRemove,
    };
    this.gridApi.applyServerSideTransaction(tx);
  }

  onUpdateSelected() {
    const rowsToUpdate = this.gridApi.getSelectedRows();
    rowsToUpdate.forEach(function (data) {
      data.value = getNextValue();
    });
    const tx = {
      update: rowsToUpdate,
    };
    this.gridApi.applyServerSideTransaction(tx);
  }

  onUpdateRandom() {
    const rowsToUpdate: any[] = [];
    this.gridApi.forEachNode(function (node) {
      // skip half the nodes at random
      if (Math.random() > 0.5) {
        return;
      }
      const data = node.data;
      data.value = getNextValue();
      rowsToUpdate.push(data);
    });
    const tx = {
      update: rowsToUpdate,
    };
    this.gridApi.applyServerSideTransaction(tx);
  }

  onAdd(index: number) {
    const newProductName =
      all_products[Math.floor(all_products.length * Math.random())];
    const itemsToAdd = [];
    for (let i = 0; i < 5; i++) {
      itemsToAdd.push({
        product: newProductName + " " + newProductSequence++,
        value: getNextValue(),
      });
    }
    const tx = {
      addIndex: index,
      add: itemsToAdd,
    };
    this.gridApi.applyServerSideTransaction(tx);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => {
        const dataSource: IServerSideDatasource = {
          getRows: function (params: IServerSideGetRowsParams) {
            // To make the demo look real, wait for 500ms before returning
            setTimeout(function () {
              const rows: any[] = [];
              products.forEach(function (product, index) {
                rows.push({
                  product: product,
                  value: getNextValue(),
                });
              });
              // call the success callback
              params.success({ rowData: rows, rowCount: rows.length });
            }, 500);
          },
        };
        params.api!.setServerSideDatasource(dataSource);
      });
  }
}

const products = ["Palm Oil", "Rubber", "Wool", "Amber", "Copper"];
const all_products = [
  "Palm Oil",
  "Rubber",
  "Wool",
  "Amber",
  "Copper",
  "Lead",
  "Zinc",
  "Tin",
  "Aluminium",
  "Aluminium Alloy",
  "Nickel",
  "Cobalt",
  "Molybdenum",
  "Recycled Steel",
  "Corn",
  "Oats",
  "Rough Rice",
  "Soybeans",
  "Rapeseed",
  "Soybean Meal",
  "Soybean Oil",
  "Wheat",
  "Milk",
  "Coca",
  "Coffee C",
  "Cotton No.2",
  "Sugar No.11",
  "Sugar No.14",
];
let newProductSequence = 0;
let valueCounter = 0;
function getNextValue() {
  valueCounter++;
  return Math.floor((valueCounter * 987654321) / 7) % 10000;
}
