
import { Component } from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, RowClassParams, RowStyle } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
        <button (click)="redrawAllRows()">Redraw All Rows</button>
        <button (click)="redrawTopRows()">Redraw Top Rows</button>
    </div>

    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    [getRowStyle]="getRowStyle"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>
`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    { headerName: 'A', field: 'a' },
    { headerName: 'B', field: 'b' },
    { headerName: 'C', field: 'c' },
    { headerName: 'D', field: 'd' },
    { headerName: 'E', field: 'e' },
    { headerName: 'F', field: 'f' },
];
public defaultColDef: ColDef = {
    flex: 1,
};
public rowData: any[] | null = createData(12);
public getRowStyle: (params: RowClassParams) => RowStyle | undefined = function () {
    return {
        backgroundColor: colors[colorIndex],
    };
}


    redrawAllRows() {
    progressColor();
    this.gridApi.redrawRows();
}

redrawTopRows() {
    progressColor();
    var rows = [];
    for (var i = 0; i < 6; i++) {
        var row = this.gridApi.getDisplayedRowAtIndex(i)!;
        rows.push(row);
    }
    this.gridApi.redrawRows({ rowNodes: rows });
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
    }
}



var colorIndex = 0;
var colors = ['#000000', '#000066', '#006600', '#660000'];
function createData(count: number) {
    var result = [];
    for (var i = 1; i <= count; i++) {
        result.push({
            a: (i * 863) % 100,
            b: (i * 811) % 100,
            c: (i * 743) % 100,
            d: (i * 677) % 100,
            e: (i * 619) % 100,
            f: (i * 571) % 100,
        });
    }
    return result;
}
function progressColor() {
    colorIndex++;
    if (colorIndex === colors.length) {
        colorIndex = 0;
    }
}
