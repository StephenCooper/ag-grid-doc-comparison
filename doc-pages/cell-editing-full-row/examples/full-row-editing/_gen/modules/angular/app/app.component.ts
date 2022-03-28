
import { Component } from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { CellValueChangedEvent, ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, ICellEditorComp, ICellEditorParams, RowValueChangedEvent } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts
declare var NumericCellEditor: ICellEditorComp;

@Component({
    selector: 'my-app',
    template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
        <button style="font-size: 12px" (click)="onBtStartEditing()">Start Editing Line 2</button>
        <button style="font-size: 12px" (click)="onBtStopEditing()">Stop Editing</button>
    </div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [editType]="editType"
    [rowData]="rowData"
    (cellValueChanged)="onCellValueChanged($event)"
    (rowValueChanged)="onRowValueChanged($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>
`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    {
        field: 'make',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
            values: ['Porsche', 'Toyota', 'Ford', 'AAA', 'BBB', 'CCC'],
        },
    },
    { field: 'model' },
    { field: 'field4', headerName: 'Read Only', editable: false },
    { field: 'price', cellEditor: NumericCellEditor },
    {
        headerName: 'Suppress Navigable',
        field: 'field5',
        suppressNavigable: true,
        minWidth: 200,
    },
    { headerName: 'Read Only', field: 'field6', editable: false },
];
public defaultColDef: ColDef = {
    flex: 1,
    editable: true,
};
public editType = 'fullRow';
public rowData: any[] | null = getRowData()


    onCellValueChanged(event: CellValueChangedEvent) {
    console.log('onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue);
}

onRowValueChanged(event: RowValueChangedEvent) {
    var data = event.data;
    console.log('onRowValueChanged: (' +
        data.make +
        ', ' +
        data.model +
        ', ' +
        data.price +
        ', ' +
        data.field5 +
        ')');
}

onBtStopEditing() {
    this.gridApi.stopEditing();
}

onBtStartEditing() {
    this.gridApi.setFocusedCell(2, 'make');
    this.gridApi.startEditingCell({
        rowIndex: 2,
        colKey: 'make',
    });
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
    }
}



function getRowData() {
    var rowData = [];
    for (var i = 0; i < 10; i++) {
        rowData.push({
            make: 'Toyota',
            model: 'Celica',
            price: 35000 + i * 1000,
            field4: 'Sample XX',
            field5: 'Sample 22',
            field6: 'Sample 23',
        });
        rowData.push({
            make: 'Ford',
            model: 'Mondeo',
            price: 32000 + i * 1000,
            field4: 'Sample YY',
            field5: 'Sample 24',
            field6: 'Sample 25',
        });
        rowData.push({
            make: 'Porsche',
            model: 'Boxter',
            price: 72000 + i * 1000,
            field4: 'Sample ZZ',
            field5: 'Sample 26',
            field6: 'Sample 27',
        });
    }
    return rowData;
}
