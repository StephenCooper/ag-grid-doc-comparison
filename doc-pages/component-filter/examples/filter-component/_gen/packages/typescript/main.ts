import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions } from 'ag-grid-community';
import { PartialMatchFilter } from './partialMatchFilter';

const columnDefs: ColDef[] = [
    { field: 'row' },
    {
        field: 'name',
        filter: PartialMatchFilter,
        menuTabs: ['filterMenuTab'],
    },
]

const gridOptions: GridOptions = {
    defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
    },
    columnDefs: columnDefs,
    rowData: getData()
}

function onClicked() {
    gridOptions.api!.getFilterInstance('name', function (instance) {
        (instance as PartialMatchFilter).componentMethod('Hello World!');
    })
}

// setup the grid after the page has finished loading
    var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
    new Grid(gridDiv, gridOptions)
    gridOptions.api!.sizeColumnsToFit()
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).onClicked = onClicked;
}