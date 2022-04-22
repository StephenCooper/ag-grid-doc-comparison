import { ColDef, Grid, GridOptions } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const columnDefs: ColDef[] = [
  { field: 'athlete' },
  { field: 'age', width: 90 },
  { field: 'country' },
  { field: 'year', width: 90 },
  { field: 'date' },
  { field: 'sport' },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' },
  { field: 'total' },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    sortable: true,
  },
};

function sortByAthleteAsc() {
  gridOptions.columnApi!.applyColumnState({
    state: [{ colId: 'athlete', sort: 'asc' }],
    defaultState: { sort: null },
  });
}

function sortByAthleteDesc() {
  gridOptions.columnApi!.applyColumnState({
    state: [{ colId: 'athlete', sort: 'desc' }],
    defaultState: { sort: null },
  });
}

function sortByCountryThenSport() {
  gridOptions.columnApi!.applyColumnState({
    state: [
      { colId: 'country', sort: 'asc', sortIndex: 0 },
      { colId: 'sport', sort: 'asc', sortIndex: 1 },
    ],
    defaultState: { sort: null },
  });
}

function sortBySportThenCountry() {
  gridOptions.columnApi!.applyColumnState({
    state: [
      { colId: 'country', sort: 'asc', sortIndex: 1 },
      { colId: 'sport', sort: 'asc', sortIndex: 0 },
    ],
    defaultState: { sort: null },
  });
}

function clearSort() {
  gridOptions.columnApi!.applyColumnState({
    defaultState: { sort: null },
  });
}

var savedSort: any;

function saveSort() {
  var colState = gridOptions.columnApi!.getColumnState();
  var sortState = colState
    .filter(function (s) {
      return s.sort != null;
    })
    .map(function (s) {
      return { colId: s.colId, sort: s.sort, sortIndex: s.sortIndex };
    });
  savedSort = sortState;
  console.log('saved sort', sortState);
}

function restoreFromSave() {
  gridOptions.columnApi!.applyColumnState({
    state: savedSort,
    defaultState: { sort: null },
  });
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).sortByAthleteAsc = sortByAthleteAsc;
  (<any>window).sortByAthleteDesc = sortByAthleteDesc;
  (<any>window).sortByCountryThenSport = sortByCountryThenSport;
  (<any>window).sortBySportThenCountry = sortBySportThenCountry;
  (<any>window).clearSort = clearSort;
  (<any>window).saveSort = saveSort;
  (<any>window).restoreFromSave = restoreFromSave;
}
