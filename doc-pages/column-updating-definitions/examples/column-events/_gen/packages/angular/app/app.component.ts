
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, ColumnMovedEvent, ColumnPinnedEvent, ColumnPivotChangedEvent, ColumnResizedEvent, ColumnRowGroupChangedEvent, ColumnValueChangedEvent, ColumnVisibleEvent, Grid, GridApi, GridOptions, GridReadyEvent, SortChangedEvent } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div class="test-container">
    <div class="test-header">

        <div class="test-button-row">
            <div class="test-button-group">
                <button (click)="onBtSortOn()">Sort On</button>
                <br />
                <button (click)="onBtSortOff()">Sort Off</button>
            </div>
            <div class="test-button-group">
                <button (click)="onBtWidthNarrow()">Width Narrow</button>
                <br />
                <button (click)="onBtWidthNormal()">Width Normal</button>
            </div>
            <div class="test-button-group">
                <button (click)="onBtHide()">Hide Cols</button>
                <br />
                <button (click)="onBtShow()">Show Cols</button>
            </div>
            <div class="test-button-group">
                <button (click)="onBtPivotOn()">Pivot On</button>
                <br />
                <button (click)="onBtPivotOff()">Pivot Off</button>
            </div>
            <div class="test-button-group">
                <button (click)="onBtRowGroupOn()">Row Group On</button>
                <br />
                <button (click)="onBtRowGroupOff()">Row Group Off</button>
            </div>
            <div class="test-button-group">
                <button (click)="onBtAggFuncOn()">Agg Func On</button>
                <br />
                <button (click)="onBtAggFuncOff()">Agg Func Off</button>
            </div>
            <div class="test-button-group">
                <button (click)="onBtPinnedOn()">Pinned On</button>
                <br />
                <button (click)="onBtPinnedOff()">Pinned Off</button>
            </div>
        </div>
    </div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [defaultColDef]="defaultColDef"
    [columnDefs]="columnDefs"
    [rowData]="rowData"
    (sortChanged)="onSortChanged($event)"
    (columnResized)="onColumnResized($event)"
    (columnVisible)="onColumnVisible($event)"
    (columnPivotChanged)="onColumnPivotChanged($event)"
    (columnRowGroupChanged)="onColumnRowGroupChanged($event)"
    (columnValueChanged)="onColumnValueChanged($event)"
    (columnMoved)="onColumnMoved($event)"
    (columnPinned)="onColumnPinned($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>`
})

export class AppComponent {
    private gridApi!: GridApi;
    private gridColumnApi!: ColumnApi;

    
    public defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    width: 150,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
};
public columnDefs: ColDef[] = getColumnDefs();
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onSortChanged(e: SortChangedEvent) {
    console.log('Event Sort Changed', e);
}

onColumnResized(e: ColumnResizedEvent) {
    console.log('Event Column Resized', e);
}

onColumnVisible(e: ColumnVisibleEvent) {
    console.log('Event Column Visible', e);
}

onColumnPivotChanged(e: ColumnPivotChangedEvent) {
    console.log('Event Pivot Changed', e);
}

onColumnRowGroupChanged(e: ColumnRowGroupChangedEvent) {
    console.log('Event Row Group Changed', e);
}

onColumnValueChanged(e: ColumnValueChangedEvent) {
    console.log('Event Value Changed', e);
}

onColumnMoved(e: ColumnMovedEvent) {
    console.log('Event Column Moved', e);
}

onColumnPinned(e: ColumnPinnedEvent) {
    console.log('Event Column Pinned', e);
}

onBtSortOn() {
    const columnDefs: ColDef[] = getColumnDefs();
    columnDefs.forEach(function (colDef) {
        if (colDef.field === 'age') {
            colDef.sort = 'desc';
        }
        if (colDef.field === 'athlete') {
            colDef.sort = 'asc';
        }
    });
    this.gridApi.setColumnDefs(columnDefs);
}

onBtSortOff() {
    const columnDefs: ColDef[] = getColumnDefs();
    columnDefs.forEach(function (colDef) {
        colDef.sort = null;
    });
    this.gridApi.setColumnDefs(columnDefs);
}

onBtWidthNarrow() {
    const columnDefs: ColDef[] = getColumnDefs();
    columnDefs.forEach(function (colDef) {
        if (colDef.field === 'age' || colDef.field === 'athlete') {
            colDef.width = 100;
        }
    });
    this.gridApi.setColumnDefs(columnDefs);
}

onBtWidthNormal() {
    const columnDefs: ColDef[] = getColumnDefs();
    columnDefs.forEach(function (colDef) {
        colDef.width = 200;
    });
    this.gridApi.setColumnDefs(columnDefs);
}

onBtHide() {
    const columnDefs: ColDef[] = getColumnDefs();
    columnDefs.forEach(function (colDef) {
        if (colDef.field === 'age' || colDef.field === 'athlete') {
            colDef.hide = true;
        }
    });
    this.gridApi.setColumnDefs(columnDefs);
}

onBtShow() {
    const columnDefs: ColDef[] = getColumnDefs();
    columnDefs.forEach(function (colDef) {
        colDef.hide = false;
    });
    this.gridApi.setColumnDefs(columnDefs);
}

onBtPivotOn() {
    this.gridColumnApi.setPivotMode(true);
    const columnDefs: ColDef[] = getColumnDefs();
    columnDefs.forEach(function (colDef) {
        if (colDef.field === 'country') {
            colDef.pivot = true;
        }
    });
    this.gridApi.setColumnDefs(columnDefs);
}

onBtPivotOff() {
    this.gridColumnApi.setPivotMode(false);
    const columnDefs: ColDef[] = getColumnDefs();
    columnDefs.forEach(function (colDef) {
        colDef.pivot = false;
    });
    this.gridApi.setColumnDefs(columnDefs);
}

onBtRowGroupOn() {
    const columnDefs: ColDef[] = getColumnDefs();
    columnDefs.forEach(function (colDef) {
        if (colDef.field === 'sport') {
            colDef.rowGroup = true;
        }
    });
    this.gridApi.setColumnDefs(columnDefs);
}

onBtRowGroupOff() {
    const columnDefs: ColDef[] = getColumnDefs();
    columnDefs.forEach(function (colDef) {
        colDef.rowGroup = false;
    });
    this.gridApi.setColumnDefs(columnDefs);
}

onBtAggFuncOn() {
    const columnDefs: ColDef[] = getColumnDefs();
    columnDefs.forEach(function (colDef) {
        if (colDef.field === 'gold' ||
            colDef.field === 'silver' ||
            colDef.field === 'bronze') {
            colDef.aggFunc = 'sum';
        }
    });
    this.gridApi.setColumnDefs(columnDefs);
}

onBtAggFuncOff() {
    const columnDefs: ColDef[] = getColumnDefs();
    columnDefs.forEach(function (colDef) {
        colDef.aggFunc = null;
    });
    this.gridApi.setColumnDefs(columnDefs);
}

onBtPinnedOn() {
    const columnDefs: ColDef[] = getColumnDefs();
    columnDefs.forEach(function (colDef) {
        if (colDef.field === 'athlete') {
            colDef.pinned = 'left';
        }
        if (colDef.field === 'age') {
            colDef.pinned = 'right';
        }
    });
    this.gridApi.setColumnDefs(columnDefs);
}

onBtPinnedOff() {
    const columnDefs: ColDef[] = getColumnDefs();
    columnDefs.forEach(function (colDef) {
        colDef.pinned = null;
    });
    this.gridApi.setColumnDefs(columnDefs);
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;this.gridColumnApi = params.columnApi;

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}



function getColumnDefs(): ColDef[] {
    return [
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
    ];
}
