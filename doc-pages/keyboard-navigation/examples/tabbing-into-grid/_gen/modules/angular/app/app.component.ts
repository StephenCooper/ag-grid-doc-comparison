
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, FirstDataRenderedEvent, Grid, GridApi, GridOptions, GridReadyEvent } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<div class="test-container">
    <div>
        <div class="form-container">
            <label>
                Tab into Grid (Focus the First Cell)
                <input id="my-input">
            </label>
        </div>
        <div class="form-container">
            <label>
                Tab into the Grid (Default Behavior)
                <input>
            </label>
        </div>
    </div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [rowData]="rowData"
    [defaultColDef]="defaultColDef"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
    <div class="form-container">
        <label>
            Tab into the grid with Shift-Tab (Default Behavior)
            <input>
        </label>
    </div>
</div>
`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { headerName: '#', colId: 'rowNum', valueGetter: 'node.id' },
    { field: 'athlete', minWidth: 170 },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
];
public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
};
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onFirstDataRendered(params: FirstDataRenderedEvent) {
    // obtain reference to input element
    var myInput = document.getElementById('my-input')!;
    // intercept key strokes within input element
    myInput.addEventListener('keydown', function (event) {
        // ignore non Tab key strokes
        if (event.key !== 'Tab')
            return;
        // prevents tabbing into the url section
        event.preventDefault();
        // scrolls to the first row
        params.api.ensureIndexVisible(0);
        // scrolls to the first column
        var firstCol = params.columnApi.getAllDisplayedColumns()[0];
        params.api.ensureColumnVisible(firstCol);
        // sets focus into the first grid cell
        params.api.setFocusedCell(0, firstCol);
    }, true);
}

onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}




