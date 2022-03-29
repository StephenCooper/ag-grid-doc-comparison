import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
import { createApp } from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowSelection="rowSelection"
                :rowModelType="rowModelType"
                :cacheBlockSize="cacheBlockSize"
                :cacheOverflowSize="cacheOverflowSize"
                :maxConcurrentDatasourceRequests="maxConcurrentDatasourceRequests"
                :infiniteInitialRowCount="infiniteInitialRowCount"
                :maxBlocksInCache="maxBlocksInCache"
                :pagination="true"
                :paginationAutoPageSize="true"
                :getRowId="getRowId"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          headerName: "ID",
          maxWidth: 100,
          valueGetter: "node.id",
          cellRenderer: (params) => {
            if (params.value !== undefined) {
              return params.value;
            } else {
              return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
            }
          },
          sortable: false,
          suppressMenu: true,
        },
        { headerName: "Athlete", field: "athlete", suppressMenu: true },
        {
          field: "age",
          filter: "agNumberColumnFilter",
          filterParams: {
            filterOptions: ["equals", "lessThan", "greaterThan"],
          },
        },
        {
          field: "country",
          filter: "agSetColumnFilter",
          filterParams: filterParams,
        },
        {
          field: "year",
          filter: "agSetColumnFilter",
          filterParams: { values: ["2000", "2004", "2008", "2012"] },
        },
        { field: "date" },
        { field: "sport", suppressMenu: true },
        { field: "gold", suppressMenu: true },
        { field: "silver", suppressMenu: true },
        { field: "bronze", suppressMenu: true },
        { field: "total", suppressMenu: true },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        sortable: true,
        resizable: true,
        floatingFilter: true,
      },
      rowSelection: null,
      rowModelType: null,
      cacheBlockSize: null,
      cacheOverflowSize: null,
      maxConcurrentDatasourceRequests: null,
      infiniteInitialRowCount: null,
      maxBlocksInCache: null,
      getRowId: null,
    };
  },
  created() {
    this.rowSelection = "multiple";
    this.rowModelType = "infinite";
    this.cacheBlockSize = 100;
    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 2;
    this.infiniteInitialRowCount = 1;
    this.maxBlocksInCache = 2;
    this.getRowId = (params) => {
      return params.data.id;
    };
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        data.forEach(function (d, index) {
          d.id = "R" + (index + 1);
        });
        const dataSource = {
          rowCount: undefined,
          getRows: function (params) {
            console.log(
              "asking for " + params.startRow + " to " + params.endRow
            );
            // At this point in your code, you would call the server.
            // To make the demo look real, wait for 500ms before returning
            setTimeout(function () {
              // take a slice of the total rows
              const dataAfterSortingAndFiltering = sortAndFilter(
                data,
                params.sortModel,
                params.filterModel
              );
              const rowsThisPage = dataAfterSortingAndFiltering.slice(
                params.startRow,
                params.endRow
              );
              // if on or after the last page, work out the last row.
              let lastRow = -1;
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
  const sortPresent = sortModel && sortModel.length > 0;
  if (!sortPresent) {
    return data;
  }
  // do an in memory sort of the data, across all the fields
  const resultOfSort = data.slice();
  resultOfSort.sort(function (a, b) {
    for (let k = 0; k < sortModel.length; k++) {
      const sortColModel = sortModel[k];
      const valueA = a[sortColModel.colId];
      const valueB = b[sortColModel.colId];
      // this filter didn't find a difference, move onto the next one
      if (valueA == valueB) {
        continue;
      }
      const sortDirection = sortColModel.sort === "asc" ? 1 : -1;
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
  const filterPresent = filterModel && Object.keys(filterModel).length > 0;
  if (!filterPresent) {
    return data;
  }
  const resultOfFilter = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (filterModel.age) {
      const age = item.age;
      const allowedAge = parseInt(filterModel.age.filter);
      // EQUALS = 1;
      // LESS_THAN = 2;
      // GREATER_THAN = 3;
      if (filterModel.age.type == "equals") {
        if (age !== allowedAge) {
          continue;
        }
      } else if (filterModel.age.type == "lessThan") {
        if (age >= allowedAge) {
          continue;
        }
      } else {
        if (age <= allowedAge) {
          continue;
        }
      }
    }
    if (filterModel.year) {
      if (filterModel.year.values.indexOf(item.year.toString()) < 0) {
        // year didn't match, so skip this record
        continue;
      }
    }
    if (filterModel.country) {
      if (filterModel.country.values.indexOf(item.country) < 0) {
        continue;
      }
    }
    resultOfFilter.push(item);
  }
  return resultOfFilter;
};

const filterParams = { values: countries() };

createApp(VueExample).mount("#app");
