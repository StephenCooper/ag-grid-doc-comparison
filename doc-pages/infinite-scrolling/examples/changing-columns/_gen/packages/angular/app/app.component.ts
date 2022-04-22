import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  IDatasource,
  SortModelItem,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'my-app',
  template: `<div class="test-container">
    <div class="test-header">
      <button (click)="onBtShowYearColumn()">Show Year</button>
      <button (click)="onBtHideYearColumn()">Hide Year</button>
    </div>

    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowModelType]="rowModelType"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: 'athlete', colId: 'athlete', minWidth: 180 },
    { field: 'age', colId: 'age' },
    { field: 'country', colId: 'country', minWidth: 180 },
    { field: 'year', colId: 'year' },
    { field: 'sport', colId: 'sport', minWidth: 180 },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
    resizable: true,
    filter: true,
  };
  public rowModelType = 'infinite';
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtShowYearColumn() {
    this.gridApi.setColumnDefs([
      { field: 'athlete', colId: 'athlete' },
      { field: 'age', colId: 'age' },
      { field: 'country', colId: 'country' },
      { field: 'year', colId: 'year' },
      { field: 'sport', colId: 'sport' },
    ]);
  }

  onBtHideYearColumn() {
    this.gridApi.setColumnDefs([
      { field: 'athlete', colId: 'athlete' },
      { field: 'age', colId: 'age' },
      { field: 'country', colId: 'country' },
      { field: 'sport', colId: 'sport' },
    ]);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        // give each row an id
        data.forEach(function (d: any, index: number) {
          d.id = 'R' + (index + 1);
        });
        var dataSource: IDatasource = {
          rowCount: undefined,
          getRows: function (params) {
            console.log(
              'asking for ' + params.startRow + ' to ' + params.endRow
            );
            // At this point in your code, you would call the server.
            // To make the demo look real, wait for 500ms before returning
            setTimeout(function () {
              // take a slice of the total rows
              var dataAfterSortingAndFiltering = sortAndFilter(
                data,
                params.sortModel,
                params.filterModel
              );
              var rowsThisPage = dataAfterSortingAndFiltering.slice(
                params.startRow,
                params.endRow
              );
              // if on or after the last page, work out the last row.
              var lastRow = -1;
              if (dataAfterSortingAndFiltering.length <= params.endRow) {
                lastRow = dataAfterSortingAndFiltering.length;
              }
              // call the success callback
              params.successCallback(rowsThisPage, lastRow);
            }, 500);
          },
        };
        params.api!.setDatasource(dataSource);
      });
  }
}

function sortAndFilter(
  allOfTheData: any[],
  sortModel: SortModelItem[],
  filterModel: any
) {
  return sortData(sortModel, filterData(filterModel, allOfTheData));
}
function sortData(sortModel: SortModelItem[], data: any[]) {
  var sortPresent = sortModel && sortModel.length > 0;
  if (!sortPresent) {
    return data;
  }
  // do an in memory sort of the data, across all the fields
  var resultOfSort = data.slice();
  resultOfSort.sort(function (a, b) {
    for (var k = 0; k < sortModel.length; k++) {
      var sortColModel = sortModel[k];
      var valueA = a[sortColModel.colId];
      var valueB = b[sortColModel.colId];
      // this filter didn't find a difference, move onto the next one
      if (valueA == valueB) {
        continue;
      }
      var sortDirection = sortColModel.sort === 'asc' ? 1 : -1;
      if (valueA > valueB) {
        return sortDirection;
      } else {
        return sortDirection * -1;
      }
    }
    // no filters found a difference
    return 0;
  });
  return resultOfSort;
}
function filterData(filterModel: any, data: any[]) {
  var filterPresent = filterModel && Object.keys(filterModel).length > 0;
  if (!filterPresent) {
    return data;
  }
  var resultOfFilter = [];
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var filterFails = false;
    var filterKeys = Object.keys(filterModel);
    filterKeys.forEach(function (filterKey) {
      var filterValue = filterModel[filterKey].filter;
      var valueForRow = item[filterKey];
      if (filterValue != valueForRow) {
        // year didn't match, so skip this record
        filterFails = true;
      }
    });
    // if (filterModel.year) {
    //     var val1 = filterModel.year.filter;
    //     var val2 = item.year;
    //     if (val1 != val2) {
    //         // year didn't match, so skip this record
    //         continue;
    //     }
    // }
    //
    if (!filterFails) {
      resultOfFilter.push(item);
    }
  }
  return resultOfFilter;
}
