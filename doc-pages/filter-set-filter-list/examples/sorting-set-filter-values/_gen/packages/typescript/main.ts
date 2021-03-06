import { Grid, GridOptions, IFiltersToolPanel } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

var filterParams = {
  comparator: (a: string, b: string) => {
    var valA = parseInt(a);
    var valB = parseInt(b);
    if (valA === valB) return 0;
    return valA > valB ? 1 : -1;
  },
};

const gridOptions: GridOptions = {
  columnDefs: [
    {
      headerName: 'Age (No Comparator)',
      field: 'age',
      filter: 'agSetColumnFilter',
    },
    {
      headerName: 'Age (With Comparator)',
      field: 'age',
      filter: 'agSetColumnFilter',
      filterParams: filterParams,
    },
  ],
  defaultColDef: {
    flex: 1,
    filter: true,
    resizable: true,
  },
  rowData: getRowData(),
  sideBar: 'filters',
  onGridReady: (params) => {
    ((params.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).expandFilters();
  },
};

function getRowData() {
  var rows = [];
  for (var i = 1; i < 117; i++) {
    rows.push({ age: i });
  }
  return rows;
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);
