import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, FirstDataRenderedEvent, Grid, GridOptions } from 'ag-grid-community';
import { DetailCellRenderer } from './detailCellRenderer';

const gridOptions: GridOptions = {
  masterDetail: true,
  detailCellRenderer: DetailCellRenderer,
  detailRowHeight: 150,
  animateRows: true,
  columnDefs: [
    // group cell renderer needed for expand / collapse icons
    { field: 'name', cellRenderer: 'agGroupCellRenderer', pinned: 'left' },
    { field: 'account' },
    { field: 'calls' },
    { field: 'minutes', valueFormatter: "x.toLocaleString() + 'm'" },
    { headerName: 'Extra Col 1', valueGetter: '"AAA"' },
    { headerName: 'Extra Col 2', valueGetter: '"BBB"' },
    { headerName: 'Extra Col 3', valueGetter: '"CCC"' },
    { headerName: 'Pinned Right', pinned: 'right' },
  ],
  defaultColDef: {},
  embedFullWidthRows: true,
  onFirstDataRendered: onFirstDataRendered,
}

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  setTimeout(function () {
    params.api.forEachNode(function (node) {
      node.setExpanded(node.id === '1')
    })
  }, 1000)
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/master-detail-data.json')
    .then(response => response.json())
    .then(function (data) {
      gridOptions.api!.setRowData(data)
    })
 