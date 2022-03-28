
import { Component } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, SideBarDef } from 'ag-grid-community';
declare var CustomTooltip: any

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [sideBar]="sideBar"
    [defaultColDef]="defaultColDef"
    [tooltipShowDelay]="tooltipShowDelay"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    {
        field: 'colA',
        tooltipField: 'colA',
        filter: 'agSetColumnFilter',
    },
    {
        field: 'colB',
        tooltipField: 'colB',
        filter: 'agSetColumnFilter',
        filterParams: {
            showTooltips: true,
        },
    },
    {
        field: 'colC',
        tooltipField: 'colC',
        tooltipComponent: CustomTooltip,
        filter: 'agSetColumnFilter',
        filterParams: {
            showTooltips: true,
        },
    },
];
public sideBar: SideBarDef | string | boolean | null = 'filters';
public defaultColDef: ColDef = {
    flex: 1,
    resizable: true,
};
public tooltipShowDelay = 100;
public rowData: any[] | null = getData()


    onGridReady(params: GridReadyEvent) {
        
    }
}




