
import { Component } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { CellValueChangedEvent, ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div class="example-wrapper">
    <div>
        <span class="button-group">
            <label>Available Undo's</label>
            <input id="undoInput" class="undo-redo-input">
            <label>Available Redo's</label>
            <input id="redoInput" class="undo-redo-input">
            <button id="undoBtn" class="undo-btn" (click)="undo()">Undo</button>
            <button id="redoBtn" class="redo-btn" (click)="redo()">Redo</button>
        </span>
    </div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    [enableRangeSelection]="true"
    [enableFillHandle]="true"
    [undoRedoCellEditing]="true"
    [undoRedoCellEditingLimit]="undoRedoCellEditingLimit"
    [enableCellChangeFlash]="true"
    (firstDataRendered)="onFirstDataRendered($event)"
    (cellValueChanged)="onCellValueChanged($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    { field: 'a' },
    { field: 'b' },
    { field: 'c' },
    { field: 'd' },
    { field: 'e' },
    { field: 'f' },
    { field: 'g' },
    { field: 'h' },
];
public defaultColDef: ColDef = {
    flex: 1,
    editable: true,
};
public rowData: any[] | null = getRows();
public undoRedoCellEditingLimit = 5


    onFirstDataRendered() {
    setValue('#undoInput', 0);
    disable('#undoInput', true);
    disable('#undoBtn', true);
    setValue('#redoInput', 0);
    disable('#redoInput', true);
    disable('#redoBtn', true);
}

onCellValueChanged(params: CellValueChangedEvent) {
    var undoSize = params.api.getCurrentUndoSize();
    setValue('#undoInput', undoSize);
    disable('#undoBtn', undoSize < 1);
    var redoSize = params.api.getCurrentRedoSize();
    setValue('#redoInput', redoSize);
    disable('#redoBtn', redoSize < 1);
}

undo() {
    this.gridApi.undoCellEditing();
}

redo() {
    this.gridApi.redoCellEditing();
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
    }
}



function disable(id: string, disabled: boolean) {
    (document.querySelector(id) as any).disabled = disabled;
}
function setValue(id: string, value: number) {
    (document.querySelector(id) as any).value = value;
}
function getRows() {
    return Array.apply(null, Array(100)).map(function (_, i) {
        return {
            a: 'a-' + i,
            b: 'b-' + i,
            c: 'c-' + i,
            d: 'd-' + i,
            e: 'e-' + i,
            f: 'f-' + i,
            g: 'g-' + i,
            h: 'h-' + i,
        };
    });
}
