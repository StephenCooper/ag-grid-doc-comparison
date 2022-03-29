"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([InfiniteRowModelModule]);

const sortAndFilter = (allOfTheData, sortModel, filterModel) => {
  return sortData(sortModel, filterData(filterModel, allOfTheData));
};

const sortData = (sortModel, data) => {
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

const filterData = (filterModel, data) => {
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

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete", colId: "athlete", minWidth: 180 },
    { field: "age", colId: "age" },
    { field: "country", colId: "country", minWidth: 180 },
    { field: "year", colId: "year" },
    { field: "sport", colId: "sport", minWidth: 180 },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      sortable: true,
      resizable: true,
      filter: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => {
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
      });
  }, []);

  const onBtShowYearColumn = useCallback(() => {
    gridRef.current.api.setColumnDefs([
      { field: "athlete", colId: "athlete" },
      { field: "age", colId: "age" },
      { field: "country", colId: "country" },
      { field: "year", colId: "year" },
      { field: "sport", colId: "sport" },
    ]);
  }, []);

  const onBtHideYearColumn = useCallback(() => {
    gridRef.current.api.setColumnDefs([
      { field: "athlete", colId: "athlete" },
      { field: "age", colId: "age" },
      { field: "country", colId: "country" },
      { field: "sport", colId: "sport" },
    ]);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="test-container">
        <div className="test-header">
          <button onClick={onBtShowYearColumn}>Show Year</button>
          <button onClick={onBtHideYearColumn}>Hide Year</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowModelType={"infinite"}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
