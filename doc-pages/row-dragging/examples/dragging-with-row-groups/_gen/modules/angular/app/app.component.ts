
import { Component } from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, RowDragCallbackParams, RowDragEndEvent } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [animateRows]="true"
    [groupDefaultExpanded]="groupDefaultExpanded"
    [rowData]="rowData"
    (rowDragMove)="onRowDragMove($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    { field: 'athlete', rowDrag: rowDrag },
    { field: 'country', rowGroup: true },
    { field: 'year', width: 100 },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
];
public defaultColDef: ColDef = {
    width: 170,
    sortable: true,
    filter: true,
};
public groupDefaultExpanded = 1;
public rowData!: any[];


    onRowDragMove(event: RowDragEndEvent) {
    var movingNode = event.node!;
    var overNode = event.overNode!;
    // find out what country group we are hovering over
    var groupCountry;
    if (overNode.group) {
        // if over a group, we take the group key (which will be the
        // country as we are grouping by country)
        groupCountry = overNode.key;
    }
    else {
        // if over a non-group, we take the country directly
        groupCountry = overNode.data.country;
    }
    var needToChangeParent = movingNode.data.country !== groupCountry;
    if (needToChangeParent) {
        var movingData = movingNode.data;
        movingData.country = groupCountry;
        this.gridApi.applyTransaction({
            update: [movingData],
        });
        this.gridApi.clearFocusedCell();
    }
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        
    params.api!.setRowData(getData());

    }
}



var rowDrag = function (params: RowDragCallbackParams) {
    // only rows that are NOT groups should be draggable
    return !params.node.group;
};
