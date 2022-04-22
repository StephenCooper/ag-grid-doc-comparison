import {
  ColDef,
  GridApi,
  GridReadyEvent,
  RowNodeTransaction,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<div style="height: 100%; display: flex; flex-direction: column;">
    <div style="margin-bottom: 4px;">
      <button (click)="addItems(undefined)">Add Items</button>
      <button (click)="addItems(2)">Add Items addIndex=2</button>
      <button (click)="updateItems()">Update Top 2</button>
      <button (click)="onRemoveSelected()">Remove Selected</button>
      <button (click)="getRowData()">Get Row Data</button>
      <button (click)="clearData()">Clear Data</button>
    </div>
    <div style="flex-grow: 1;">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [rowData]="rowData"
        [rowSelection]="rowSelection"
        [animateRows]="true"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'zombies' },
    { field: 'style' },
    { field: 'clothes' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
  };
  public rowData: any[] | null = getData();
  public rowSelection = 'multiple';

  getRowData() {
    const rowData: any[] = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    console.log('Row Data:');
    console.table(rowData);
  }

  clearData() {
    this.gridApi.setRowData([]);
  }

  addItems(addIndex: number | undefined) {
    const newItems = [
      createNewRowData(),
      createNewRowData(),
      createNewRowData(),
    ];
    const res = this.gridApi.applyTransaction({
      add: newItems,
      addIndex: addIndex,
    })!;
    printResult(res);
  }

  updateItems() {
    // update the first 2 items
    const itemsToUpdate: any[] = [];
    this.gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
      // only do first 2
      if (index >= 2) {
        return;
      }
      const data = rowNode.data;
      data.price = Math.floor(Math.random() * 20000 + 20000);
      itemsToUpdate.push(data);
    });
    const res = this.gridApi.applyTransaction({ update: itemsToUpdate })!;
    printResult(res);
  }

  onRemoveSelected() {
    const selectedData = this.gridApi.getSelectedRows();
    const res = this.gridApi.applyTransaction({ remove: selectedData })!;
    printResult(res);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}

let newCount = 1;
function createNewRowData() {
  const newData = {
    make: 'Toyota ' + newCount,
    model: 'Celica ' + newCount,
    price: 35000 + newCount * 17,
    zombies: 'Headless',
    style: 'Little',
    clothes: 'Airbag',
  };
  newCount++;
  return newData;
}
function printResult(res: RowNodeTransaction) {
  console.log('---------------------------------------');
  if (res.add) {
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
  }
  if (res.remove) {
    res.remove.forEach(function (rowNode) {
      console.log('Removed Row Node', rowNode);
    });
  }
  if (res.update) {
    res.update.forEach(function (rowNode) {
      console.log('Updated Row Node', rowNode);
    });
  }
}
