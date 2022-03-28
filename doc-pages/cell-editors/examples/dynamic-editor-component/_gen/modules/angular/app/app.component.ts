
import { Component } from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { CellEditingStartedEvent, CellEditingStoppedEvent, ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, ICellEditorParams, RowEditingStartedEvent, RowEditingStoppedEvent } from '@ag-grid-community/core';
import { MoodEditor } from './mood-editor.component';
import { NumericCellEditor } from './numeric-cell-editor.component';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (rowEditingStarted)="onRowEditingStarted($event)"
    (rowEditingStopped)="onRowEditingStopped($event)"
    (cellEditingStarted)="onCellEditingStarted($event)"
    (cellEditingStopped)="onCellEditingStopped($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'type' },
    {
        field: 'value',
        editable: true,
        cellEditorSelector: cellEditorSelector
    }
];
public defaultColDef: ColDef = {
    flex: 1,
};
public rowData: any[] | null = getData()


    onRowEditingStarted(event: RowEditingStartedEvent) {
    console.log('never called - not doing row editing');
}

onRowEditingStopped(event: RowEditingStoppedEvent) {
    console.log('never called - not doing row editing');
}

onCellEditingStarted(event: CellEditingStartedEvent) {
    console.log('cellEditingStarted');
}

onCellEditingStopped(event: CellEditingStoppedEvent) {
    console.log('cellEditingStopped');
}

onGridReady(params: GridReadyEvent) {
        
    }
}



function cellEditorSelector(params: ICellEditorParams) {
    if (params.data.type === 'age') {
        return {
            component: NumericCellEditor,
        };
    }
    if (params.data.type === 'gender') {
        return {
            component: 'agRichSelectCellEditor',
            params: {
                values: ['Male', 'Female']
            },
            popup: true
        };
    }
    if (params.data.type === 'mood') {
        return {
            component: MoodEditor,
            popup: true,
            popupPosition: 'under'
        };
    }
    return undefined;
}
