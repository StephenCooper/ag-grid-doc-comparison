
import { Component } from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px; display: flex; justify-content: space-between;">
        <div>
            <button (click)="onBtStartEditing()">edit (0)</button>
            <button (click)="onBtStartEditing('Delete')">edit (0, Delete)</button>
            <button (click)="onBtStartEditing(undefined, 'T')">edit (0, 'T')</button>
            <button (click)="onBtStartEditing(undefined, undefined, 'top')">edit (0, Top)</button>
            <button (click)="onBtStartEditing(undefined, undefined, 'bottom')">edit (0, Bottom)</button>
        </div>
        <div>
            <button (click)="onBtStopEditing()">stop ()</button>
            <button (click)="onBtNextCell()">next ()</button>
            <button (click)="onBtPreviousCell()">previous ()</button>
        </div>
        <div>
            <button (click)="onBtWhich()">which ()</button>
        </div>
    </div>
    <div class="grid-wrapper">
        <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    [pinnedTopRowData]="pinnedTopRowData"
    [pinnedBottomRowData]="pinnedBottomRowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
    </div>
</div>`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'gender' },
    { field: 'age' },
    { field: 'mood' },
    { field: 'country' },
    { field: 'address', minWidth: 550 },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 110,
    editable: true,
    resizable: true,
};
public rowData: any[] | null = getData();
public pinnedTopRowData: any[] = getPinnedTopData();
public pinnedBottomRowData: any[] = getPinnedBottomData()


    onBtStopEditing() {
    this.gridApi.stopEditing();
}

onBtStartEditing(key: string | undefined, char: string | undefined, pinned: string) {
    this.gridApi.setFocusedCell(0, 'lastName', pinned);
    this.gridApi.startEditingCell({
        rowIndex: 0,
        colKey: 'lastName',
        // set to 'top', 'bottom' or undefined
        rowPinned: pinned,
        key: key,
        charPress: char,
    });
}

onBtNextCell() {
    this.gridApi.tabToNextCell();
}

onBtPreviousCell() {
    this.gridApi.tabToPreviousCell();
}

onBtWhich() {
    var cellDefs = this.gridApi.getEditingCells();
    if (cellDefs.length > 0) {
        var cellDef = cellDefs[0];
        console.log('editing cell is: row = ' +
            cellDef.rowIndex +
            ', col = ' +
            cellDef.column.getId() +
            ', floating = ' +
            cellDef.rowPinned);
    }
    else {
        console.log('no cells are editing');
    }
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
    }
}



function getPinnedTopData() {
    return [
        {
            firstName: '##',
            lastName: '##',
            gender: '##',
            address: '##',
            mood: '##',
            country: '##',
        },
    ];
}
function getPinnedBottomData() {
    return [
        {
            firstName: '##',
            lastName: '##',
            gender: '##',
            address: '##',
            mood: '##',
            country: '##',
        },
    ];
}
