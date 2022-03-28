
import { Component } from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<div style="height: 100%; box-sizing: border-box;">
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    // colId will be 'firstCol'
    { headerName: 'Col 1', colId: 'firstCol', field: 'height' },
    // colId will be 'firstCol_1', cos 'firstCol' already taken
    { headerName: 'Col 2', colId: 'firstCol', field: 'height' },
    // colId will be 'height'
    { headerName: 'Col 3', field: 'height' },
    // colId will be 'height_1', cos 'height' already taken
    { headerName: 'Col 4', field: 'height' },
    // no colId, no field, so grid generated ID
    { headerName: 'Col 5', valueGetter: 'data.width' },
    { headerName: 'Col 6', valueGetter: 'data.width' }
];
public rowData: any[] | null = createRowData()


    onGridReady(params: GridReadyEvent) {
        

        
    var cols = params.columnApi.getAllColumns()!;
    cols.forEach(function (col) {
        var colDef = col.getColDef();
        console.log(colDef.headerName + ', Column ID = ' + col.getId(), JSON.stringify(colDef));
    });

    }
}



function createRowData() {
    var data = [];
    for (var i = 0; i < 20; i++) {
        data.push({
            height: Math.floor(Math.random() * 100),
            width: Math.floor(Math.random() * 100),
            depth: Math.floor(Math.random() * 100)
        });
    }
    return data;
}
