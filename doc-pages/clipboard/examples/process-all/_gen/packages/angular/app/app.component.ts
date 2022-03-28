
import { Component } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, ProcessDataFromClipboardParams } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [rowData]="rowData"
    [enableRangeSelection]="true"
    [defaultColDef]="defaultColDef"
    [processDataFromClipboard]="processDataFromClipboard"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'a' },
    { field: 'b' },
    { field: 'c' },
    { field: 'd' },
    { field: 'e' },
    { field: 'f' },
    { field: 'g' },
    { field: 'h' },
    { field: 'i' },
    { field: 'j' },
    { field: 'k' },
];
public rowData: any[] | null = getData();
public defaultColDef: ColDef = {
    editable: true,
    minWidth: 120,
    resizable: true,
    flex: 1,
    cellClassRules: {
        'cell-green': 'value.startsWith("Green")',
        'cell-blue': 'value.startsWith("Blue")',
        'cell-red': 'value.startsWith("Red")',
        'cell-yellow': 'value.startsWith("Yellow")',
        'cell-orange': 'value.startsWith("Orange")',
        'cell-grey': 'value.startsWith("Grey")',
    },
}


    onGridReady(params: GridReadyEvent) {
        
    }

processDataFromClipboard(params: ProcessDataFromClipboardParams) {
    var containsRed;
    var containsYellow;
    var data = params.data;
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        for (var j = 0; j < row.length; j++) {
            var value = row[j];
            if (value) {
                if (value.startsWith('Red')) {
                    containsRed = true;
                }
                else if (value.startsWith('Yellow')) {
                    containsYellow = true;
                }
            }
        }
    }
    if (containsRed) {
        // replace the paste request with another
        return [
            ['Orange', 'Orange'],
            ['Grey', 'Grey'],
        ];
    }
    if (containsYellow) {
        // cancels the paste
        return null;
    }
    return data;
}
}




