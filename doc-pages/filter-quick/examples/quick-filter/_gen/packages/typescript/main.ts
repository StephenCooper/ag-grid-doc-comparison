import { Grid, GridOptions, ICellRendererParams } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const getMedalString = function ({
  gold,
  silver,
  bronze,
}: {
  gold: number;
  silver: number;
  bronze: number;
}) {
  const goldStr = gold > 0 ? `Gold: ${gold} ` : '';
  const silverStr = silver > 0 ? `Silver: ${silver} ` : '';
  const bronzeStr = bronze > 0 ? `Bronze: ${bronze}` : '';
  return goldStr + silverStr + bronzeStr;
};

const MedalRenderer = function (params: ICellRendererParams) {
  return getMedalString(params.value);
};

const gridOptions: GridOptions = {
  columnDefs: [
    // simple column, easy to understand
    { field: 'name' },
    // the grid works with embedded fields
    { headerName: 'Age', field: 'person.age' },
    // or use value getter, all works with quick filter
    { headerName: 'Country', valueGetter: 'data.person.country' },
    // or use the object value, so value passed around is an object
    {
      headerName: 'Results',
      field: 'medals',
      cellRenderer: MedalRenderer,
      // this is needed to avoid toString=[object,object] result with objects
      getQuickFilterText: (params) => {
        return getMedalString(params.value);
      },
    },
  ],
  defaultColDef: {
    flex: 1,
    editable: true,
  },
  rowData: getData(),
  cacheQuickFilter: true,
};

function onFilterTextBoxChanged() {
  gridOptions.api!.setQuickFilter(
    (document.getElementById('filter-text-box') as HTMLInputElement).value
  );
}

function onPrintQuickFilterTexts() {
  gridOptions.api!.forEachNode(function (rowNode, index) {
    console.log(
      'Row ' +
        index +
        ' quick filter text is ' +
        rowNode.quickFilterAggregateText
    );
  });
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onFilterTextBoxChanged = onFilterTextBoxChanged;
  (<any>window).onPrintQuickFilterTexts = onPrintQuickFilterTexts;
}
