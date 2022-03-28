
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from '@ag-grid-community/core';
import { CustomHeader } from './custom-header.component';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [rowData]="rowData"
    [suppressMenuHide]="true"
    [components]="components"
    [defaultColDef]="defaultColDef"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>


`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'athlete', suppressMenu: true, minWidth: 120 },
    {
        field: 'age',
        sortable: false,
        headerComponentParams: { menuIcon: 'fa-external-link-alt' },
    },
    { field: 'country', suppressMenu: true, minWidth: 120 },
    { field: 'year', sortable: false },
    { field: 'date', suppressMenu: true },
    { field: 'sport', sortable: false },
    {
        field: 'gold',
        headerComponentParams: { menuIcon: 'fa-cog' },
        minWidth: 120,
    },
    { field: 'silver', sortable: false },
    { field: 'bronze', suppressMenu: true, minWidth: 120 },
    { field: 'total', sortable: false },
];
public components: {
        [p: string]: any;
    } = {
    agColumnHeader: CustomHeader,
};
public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
    headerComponentParams: {
        menuIcon: 'fa-bars'
    },
};
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => {
    this.rowData = data;
});
    }
}




