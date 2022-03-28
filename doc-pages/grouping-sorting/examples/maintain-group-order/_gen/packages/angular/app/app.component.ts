
import { Component } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, RowGroupingDisplayType } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [groupDisplayType]="groupDisplayType"
    [groupMaintainOrder]="true"
    [groupDefaultExpanded]="groupDefaultExpanded"
    [animateRows]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'assignee', rowGroup: true, hide: true },
    { field: 'priority', rowGroup: true, hide: true },
    { field: 'task' },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    resizable: true,
};
public autoGroupColumnDef: ColDef = {
    minWidth: 200,
};
public groupDisplayType: RowGroupingDisplayType = 'multipleColumns';
public groupDefaultExpanded = -1;
public rowData: any[] | null = getData()


    onGridReady(params: GridReadyEvent) {
        
    }
}




