
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { CellRange, ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, ProcessCellForExportParams, RangeSelectionChangedEvent } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div class="example-wrapper">
    <div class="example-header">
        <button (click)="onAddRange()">Add Range</button>
        <button (click)="onClearRange()">Clear Range</button>
        Range Count:
        <span id="lbRangeCount" style="padding-right: 20px;"></span>
        Eager Sum:
        <span id="lbEagerSum" style="padding-right: 20px;"></span>
        Lazy Sum:
        <span id="lbLazySum" style="padding-right: 20px;"></span>
    </div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [enableRangeSelection]="true"
    [processCellForClipboard]="processCellForClipboard"
    [processCellFromClipboard]="processCellFromClipboard"
    [rowData]="rowData"
    (rangeSelectionChanged)="onRangeSelectionChanged($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 150 },
    { field: 'age', maxWidth: 90 },
    { field: 'country', minWidth: 150 },
    { field: 'year', maxWidth: 90 },
    { field: 'date', minWidth: 150 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    editable: true,
};
public processCellForClipboard: (params: ProcessCellForExportParams) => any = function (params) {
    if (params.column.getColId() === 'athlete' &&
        params.value &&
        params.value.toUpperCase) {
        return params.value.toUpperCase();
    }
    return params.value;
};
public processCellFromClipboard: (params: ProcessCellForExportParams) => any = function (params) {
    if (params.column.getColId() === 'athlete' &&
        params.value &&
        params.value.toLowerCase) {
        return params.value.toLowerCase();
    }
    return params.value;
};
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onRangeSelectionChanged(event: RangeSelectionChangedEvent) {
    var lbRangeCount = document.querySelector('#lbRangeCount')!;
    var lbEagerSum = document.querySelector('#lbEagerSum')!;
    var lbLazySum = document.querySelector('#lbLazySum')!;
    var cellRanges = this.gridApi.getCellRanges();
    // if no selection, clear all the results and do nothing more
    if (!cellRanges || cellRanges.length === 0) {
        lbRangeCount.innerHTML = '0';
        lbEagerSum.innerHTML = '-';
        lbLazySum.innerHTML = '-';
        return;
    }
    // set range count to the number of ranges selected
    lbRangeCount.innerHTML = cellRanges.length + '';
    var sum = 0;
    var api = this.gridApi!;
    if (cellRanges) {
        cellRanges.forEach(function (range: CellRange) {
            // get starting and ending row, remember rowEnd could be before rowStart
            var startRow = Math.min(range.startRow!.rowIndex, range.endRow!.rowIndex);
            var endRow = Math.max(range.startRow!.rowIndex, range.endRow!.rowIndex);
            for (var rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
                range.columns.forEach(function (column) {
                    var rowModel = api.getModel();
                    var rowNode = rowModel.getRow(rowIndex)!;
                    var value = api.getValue(column, rowNode);
                    if (typeof value === 'number') {
                        sum += value;
                    }
                });
            }
        });
    }
    lbEagerSum.innerHTML = sum + '';
    if (event.started) {
        lbLazySum.innerHTML = '?';
    }
    if (event.finished) {
        lbLazySum.innerHTML = sum + '';
    }
}

onAddRange() {
    this.gridApi.addCellRange({
        rowStartIndex: 4,
        rowEndIndex: 8,
        columnStart: 'age',
        columnEnd: 'date',
    });
}

onClearRange() {
    this.gridApi.clearRangeSelection();
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}




