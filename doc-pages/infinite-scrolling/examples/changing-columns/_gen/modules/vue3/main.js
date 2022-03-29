import { createApp } from "vue";
import { AgGridVue } from "@ag-grid-community/vue3";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([InfiniteRowModelModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="test-container">
                <div class="test-header">
                    <button v-on:click="onBtShowYearColumn()">Show Year</button>
                    <button v-on:click="onBtHideYearColumn()">Hide Year</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowModelType="rowModelType"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "athlete", colId: "athlete", minWidth: 180 },
        { field: "age", colId: "age" },
        { field: "country", colId: "country", minWidth: 180 },
        { field: "year", colId: "year" },
        { field: "sport", colId: "sport", minWidth: 180 },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        sortable: true,
        resizable: true,
        filter: true,
      },
      rowModelType: null,
    };
  },
  created() {
    this.rowModelType = "infinite";
  },
  methods: {
    onBtShowYearColumn() {
      this.gridApi.setColumnDefs([
        { field: "athlete", colId: "athlete" },
        { field: "age", colId: "age" },
        { field: "country", colId: "country" },
        { field: "year", colId: "year" },
        { field: "sport", colId: "sport" },
      ]);
    },
    onBtHideYearColumn() {
      this.gridApi.setColumnDefs([
        { field: "athlete", colId: "athlete" },
        { field: "age", colId: "age" },
        { field: "country", colId: "country" },
        { field: "sport", colId: "sport" },
      ]);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        // give each row an id
        data.forEach(function (d, index) {
          d.id = "R" + (index + 1);
        });
        var dataSource = {
          rowCount: undefined,
          getRows: function (params) {
            console.log(
              "asking for " + params.startRow + " to " + params.endRow
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
        params.api.setDatasource(dataSource);
      };

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

window.sortAndFilter = function sortAndFilter(
  allOfTheData,
  sortModel,
  filterModel
) {
  return sortData(sortModel, filterData(filterModel, allOfTheData));
};

window.sortData = function sortData(sortModel, data) {
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
      var sortDirection = sortColModel.sort === "asc" ? 1 : -1;
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
};

window.filterData = function filterData(filterModel, data) {
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
};

createApp(VueExample).mount("#app");
