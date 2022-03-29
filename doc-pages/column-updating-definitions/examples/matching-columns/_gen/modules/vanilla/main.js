const athleteColumn = {
  headerName: "Athlete",
  valueGetter: function (params) {
    return params.data.athlete;
  },
};

function getColDefsMedalsIncluded() {
  return [
    athleteColumn,
    {
      colId: "myAgeCol",
      headerName: "Age",
      valueGetter: function (params) {
        return params.data.age;
      },
    },
    {
      headerName: "Country",
      headerClass: "country-header",
      valueGetter: function (params) {
        return params.data.country;
      },
    },
    { field: "sport" },
    { field: "year" },
    { field: "date" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
}

function getColDefsMedalsExcluded() {
  return [
    athleteColumn,
    {
      colId: "myAgeCol",
      headerName: "Age",
      valueGetter: function (params) {
        return params.data.age;
      },
    },
    {
      headerName: "Country",
      headerClass: "country-header",
      valueGetter: function (params) {
        return params.data.country;
      },
    },
    { field: "sport" },
    { field: "year" },
    { field: "date" },
  ];
}

const gridOptions = {
  defaultColDef: {
    initialWidth: 100,
    sortable: true,
    resizable: true,
  },
  columnDefs: getColDefsMedalsIncluded(),
};

function onBtExcludeMedalColumns() {
  gridOptions.api.setColumnDefs(getColDefsMedalsExcluded());
}

function onBtIncludeMedalColumns() {
  gridOptions.api.setColumnDefs(getColDefsMedalsIncluded());
}

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
  const gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);

  fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
    .then((response) => response.json())
    .then((data) => gridOptions.api.setRowData(data));
});
