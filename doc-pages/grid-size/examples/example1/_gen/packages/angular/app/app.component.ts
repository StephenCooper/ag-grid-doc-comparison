
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, FirstDataRenderedEvent, Grid, GridApi, GridOptions, GridReadyEvent, GridSizeChangedEvent } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<div id="grid-wrapper" style="width:100%; height: 100%">
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridSizeChanged)="onGridSizeChanged($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 150 },
    { field: 'age', minWidth: 70, maxWidth: 90 },
    { field: 'country', minWidth: 130 },
    { field: 'year', minWidth: 70, maxWidth: 90 },
    { field: 'date', minWidth: 120 },
    { field: 'sport', minWidth: 120 },
    { field: 'gold', minWidth: 80 },
    { field: 'silver', minWidth: 80 },
    { field: 'bronze', minWidth: 80 },
    { field: 'total', minWidth: 80 },
];
public defaultColDef: ColDef = {
    resizable: true,
};
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
}

onGridSizeChanged(params: GridSizeChangedEvent) {
    // get the current grids width
    var gridWidth = document.getElementById('grid-wrapper')!.offsetWidth;
    // keep track of which columns to hide/show
    var columnsToShow = [];
    var columnsToHide = [];
    // iterate over all columns (visible or not) and work out
    // now many columns can fit (based on their minWidth)
    var totalColsWidth = 0;
    var allColumns = params.columnApi.getAllColumns();
    if (allColumns && allColumns.length > 0) {
        for (var i = 0; i < allColumns.length; i++) {
            var column = allColumns[i];
            totalColsWidth += column.getMinWidth() || 0;
            if (totalColsWidth > gridWidth) {
                columnsToHide.push(column.getColId());
            }
            else {
                columnsToShow.push(column.getColId());
            }
        }
    }
    // show/hide columns based on current grid width
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.columnApi.setColumnsVisible(columnsToHide, false);
    // fill out any available space to ensure there are no gaps
    params.api.sizeColumnsToFit();
}

onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}




