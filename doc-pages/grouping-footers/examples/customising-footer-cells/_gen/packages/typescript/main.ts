import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions } from 'ag-grid-community';
import { MyInnerRenderer } from './myInnerRenderer';

const gridOptions: GridOptions = {
    columnDefs: [
        {field: 'country', rowGroup: true, hide: true},
        {field: 'year', rowGroup: true, hide: true},
        {field: 'gold', aggFunc: 'sum'},
        {field: 'silver', aggFunc: 'sum'},
        {field: 'bronze', aggFunc: 'sum'},
    ],
    defaultColDef: {
        flex: 1,
        minWidth: 150,
        sortable: true,
        resizable: true,
    },
    autoGroupColumnDef: {
        minWidth: 300,
        cellRendererParams: {
            innerRenderer: MyInnerRenderer
        }
    },
    groupIncludeFooter: true,
    groupIncludeTotalFooter: true,
    animateRows: true,
    rowData: getData(),
}

// setup the grid after the page has finished loading
    const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
    new Grid(gridDiv, gridOptions)
 