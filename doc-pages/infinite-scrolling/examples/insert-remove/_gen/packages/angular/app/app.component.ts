import { Component } from '@angular/core';
import {
  ColDef,
  FirstDataRenderedEvent,
  GetRowIdFunc,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
  IDatasource,
  IGetRowsParams,
  RowClassParams,
  RowStyle,
  ValueFormatterParams,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'my-app',
  template: `<div style="display: flex; flex-direction: column; height: 100%;">
    <div style="margin-bottom: 10px;">
      <button (click)="insertItemsAt2AndRefresh(5)">Insert Rows</button>
      <button (click)="removeItem(3, 10)">Delete Rows</button>
      <button (click)="setRowCountTo200()">Set Row Count</button>
      <button (click)="rowsAndMaxFound()">Print Info</button>
      <button (click)="jumpTo500()">Jump to 500</button>
      <button (click)="printCacheState()">Print Cache State</button>
    </div>
    <div style="margin-bottom: 10px;">
      <button (click)="setPricesHigh()">Set Prices High</button>
      <button (click)="setPricesLow()">Set Prices Low</button>
      <button (click)="refreshCache()">Refresh Cache</button>
      <button (click)="purgeCache()">Purge Cache</button>
    </div>
    <div style="flex-grow: 1;">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [columnDefs]="columnDefs"
        [datasource]="datasource"
        [defaultColDef]="defaultColDef"
        [rowSelection]="rowSelection"
        [rowModelType]="rowModelType"
        [maxBlocksInCache]="maxBlocksInCache"
        [infiniteInitialRowCount]="infiniteInitialRowCount"
        [maxConcurrentDatasourceRequests]="maxConcurrentDatasourceRequests"
        [getRowId]="getRowId"
        [getRowStyle]="getRowStyle"
        [rowData]="rowData"
        (firstDataRendered)="onFirstDataRendered($event)"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    {
      headerName: 'Item ID',
      field: 'id',
      valueGetter: 'node.id',
      cellRenderer: (params: ICellRendererParams) => {
        if (params.value !== undefined) {
          return params.value;
        } else {
          return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
        }
      },
    },
    { field: 'make' },
    { field: 'model' },
    {
      field: 'price',
      valueFormatter: valueFormatter,
    },
  ];
  public datasource: IDatasource = {
    rowCount: undefined,
    getRows: (params: IGetRowsParams) => {
      console.log('asking for ' + params.startRow + ' to ' + params.endRow);
      // At this point in your code, you would call the server.
      // To make the demo look real, wait for 500ms before returning
      setTimeout(function () {
        // take a slice of the total rows
        const rowsThisPage = allOfTheData.slice(params.startRow, params.endRow);
        // make a copy of each row - this is what would happen if taking data from server
        for (let i = 0; i < rowsThisPage.length; i++) {
          const item = rowsThisPage[i];
          // this is a trick to copy an object
          const itemCopy = JSON.parse(JSON.stringify(item));
          rowsThisPage[i] = itemCopy;
        }
        // if on or after the last page, work out the last row.
        let lastRow = -1;
        if (allOfTheData.length <= params.endRow) {
          lastRow = allOfTheData.length;
        }
        // call the success callback
        params.successCallback(rowsThisPage, lastRow);
      }, 500);
    },
  };
  public defaultColDef: ColDef = {
    resizable: true,
  };
  public rowSelection = 'multiple';
  public rowModelType = 'infinite';
  public maxBlocksInCache = 2;
  public infiniteInitialRowCount = 500;
  public maxConcurrentDatasourceRequests = 2;
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return params.data.id.toString();
  };
  public getRowStyle: (params: RowClassParams) => RowStyle | undefined = (
    params: RowClassParams
  ): RowStyle | undefined => {
    if (params.data && params.data.make === 'Honda') {
      return {
        fontWeight: 'bold',
      };
    } else {
      return undefined;
    }
  };
  public rowData!: any[];

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  insertItemsAt2AndRefresh(count: number) {
    insertItemsAt2(count);
    // if the data has stopped looking for the last row, then we need to adjust the
    // row count to allow for the extra data, otherwise the grid will not allow scrolling
    // to the last row. eg if we have 1000 rows, scroll all the way to the bottom (so
    // maxRowFound=true), and then add 5 rows, the rowCount needs to be adjusted
    // to 1005, so grid can scroll to the end. the grid does NOT do this for you in the
    // refreshVirtualPageCache() method, as this would be assuming you want to do it which
    // is not true, maybe the row count is constant and you just want to refresh the details.
    const maxRowFound = this.gridApi.isLastRowIndexKnown();
    if (maxRowFound) {
      const rowCount = this.gridApi.getInfiniteRowCount() || 0;
      this.gridApi.setRowCount(rowCount + count);
    }
    // get grid to refresh the data
    this.gridApi.refreshInfiniteCache();
  }

  removeItem(start: number, limit: number) {
    allOfTheData.splice(start, limit);
    this.gridApi.refreshInfiniteCache();
  }

  refreshCache() {
    this.gridApi.refreshInfiniteCache();
  }

  purgeCache() {
    this.gridApi.purgeInfiniteCache();
  }

  setRowCountTo200() {
    this.gridApi.setRowCount(200, false);
  }

  rowsAndMaxFound() {
    console.log(
      'getInfiniteRowCount() => ' + this.gridApi.getInfiniteRowCount()
    );
    console.log(
      'isLastRowIndexKnown() => ' + this.gridApi.isLastRowIndexKnown()
    );
  }

  // function just gives new prices to the row data, it does not update the grid
  setPricesHigh() {
    allOfTheData.forEach(function (dataItem) {
      dataItem.price = Math.round(55500 + 400 * (0.5 + Math.random()));
    });
  }

  setPricesLow() {
    allOfTheData.forEach(function (dataItem) {
      dataItem.price = Math.round(1000 + 100 * (0.5 + Math.random()));
    });
  }

  printCacheState() {
    console.log('*** Cache State ***');
    console.log(this.gridApi.getCacheBlockState());
  }

  jumpTo500() {
    // first up, need to make sure the grid is actually showing 500 or more rows
    if ((this.gridApi.getInfiniteRowCount() || 0) < 501) {
      this.gridApi.setRowCount(501, false);
    }
    // next, we can jump to the row
    this.gridApi.ensureIndexVisible(500);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    sequenceId = 1;
    allOfTheData = [];
    for (let i = 0; i < 1000; i++) {
      allOfTheData.push(createRowData(sequenceId++));
    }
  }
}

const valueFormatter = function (params: ValueFormatterParams) {
  if (typeof params.value === 'number') {
    return '£' + params.value.toLocaleString();
  } else {
    return params.value;
  }
};
// this counter is used to give id's to the rows
var sequenceId = 0;
var allOfTheData: any[] = [];
function createRowData(id: number) {
  const makes = ['Toyota', 'Ford', 'Porsche', 'Chevy', 'Honda', 'Nissan'];
  const models = [
    'Cruze',
    'Celica',
    'Mondeo',
    'Boxster',
    'Genesis',
    'Accord',
    'Taurus',
  ];
  return {
    id: id,
    make: makes[id % makes.length],
    model: models[id % models.length],
    price: 72000,
  };
}
function insertItemsAt2(count: number) {
  const newDataItems = [];
  for (let i = 0; i < count; i++) {
    const newItem = createRowData(sequenceId++);
    allOfTheData.splice(2, 0, newItem);
    newDataItems.push(newItem);
  }
  return newDataItems;
}
