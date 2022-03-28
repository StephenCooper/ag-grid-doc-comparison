import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions } from 'ag-grid-community';

const columnDefs: ColGroupDef[] = [
  {
    headerName: 'Top Level Column Group',
    children: [
      {
        headerName: 'Group A',
        children: [
          { field: 'athlete', minWidth: 200 },
          { field: 'country', minWidth: 200 },
          { headerName: 'Group', valueGetter: 'data.country.charAt(0)' },
        ],
      },
      {
        headerName: 'Group B',
        children: [
          { field: 'date', minWidth: 150 },
          { field: 'sport', minWidth: 150 },
          { field: 'gold' },
          { field: 'silver' },
          { field: 'bronze' },
          { field: 'total' },
        ],
      },
    ],
  },
]

const gridOptions: GridOptions = {
  defaultColDef: {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  },

  columnDefs: columnDefs,
  popupParent: document.body,

  pinnedTopRowData: [
    {
      athlete: 'Floating <Top> Athlete',
      country: 'Floating <Top> Country',
      date: '01/08/2020',
      sport: 'Track & Field',
      gold: 22,
      silver: '003',
      bronze: 44,
      total: 55,
    },
  ],

  pinnedBottomRowData: [
    {
      athlete: 'Floating <Bottom> Athlete',
      country: 'Floating <Bottom> Country',
      date: '01/08/2030',
      sport: 'Track & Field',
      gold: 222,
      silver: '005',
      bronze: 244,
      total: 255,
    },
  ],
}

function getBoolean(id: string) {
  return !!(document.querySelector('#' + id) as HTMLInputElement).checked
}

function getParams() {
  return {
    skipPinnedTop: getBoolean('skipPinnedTop'),
    skipPinnedBottom: getBoolean('skipPinnedBottom'),
  }
}

function onBtExport() {
  gridOptions.api!.exportDataAsExcel(getParams())
}

// setup the grid after the page has finished loading
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)
  fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
    .then(response => response.json())
    .then(data =>
      gridOptions.api!.setRowData(data.filter((rec: any) => rec.country != null))
    )
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).onBtExport = onBtExport;
}