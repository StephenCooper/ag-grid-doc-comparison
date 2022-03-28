
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, ITextFilterParams } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    {
        field: 'athlete',
        filterParams: athleteFilterParams,
    },
    {
        field: 'country',
        filter: 'agTextColumnFilter',
        filterParams: countryFilterParams,
    },
    {
        field: 'sport',
        filter: 'agTextColumnFilter',
        filterParams: {
            caseSensitive: true,
            defaultOption: 'startsWith',
        },
    },
];
public defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
    filter: true,
};
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}



function contains(target: string, lookingFor: string) {
    return target && target.indexOf(lookingFor) >= 0;
}
var athleteFilterParams: ITextFilterParams = {
    filterOptions: ['contains', 'notContains'],
    textFormatter: function (r) {
        if (r == null)
            return null;
        return r
            .toLowerCase()
            .replace(/[àáâãäå]/g, 'a')
            .replace(/æ/g, 'ae')
            .replace(/ç/g, 'c')
            .replace(/[èéêë]/g, 'e')
            .replace(/[ìíîï]/g, 'i')
            .replace(/ñ/g, 'n')
            .replace(/[òóôõö]/g, 'o')
            .replace(/œ/g, 'oe')
            .replace(/[ùúûü]/g, 'u')
            .replace(/[ýÿ]/g, 'y');
    },
    debounceMs: 200,
    suppressAndOrCondition: true,
} as ITextFilterParams;
var countryFilterParams: ITextFilterParams = {
    filterOptions: ['contains'],
    textMatcher: function ({ value, filterText }) {
        var filterTextLowerCase = filterText ? filterText.toLowerCase() : '';
        var valueLowerCase = value.toString().toLowerCase();
        var aliases: Record<string, string> = {
            usa: 'united states',
            holland: 'netherlands',
            vodka: 'russia',
            niall: 'ireland',
            sean: 'south africa',
            alberto: 'mexico',
            john: 'australia',
            xi: 'china',
        };
        var literalMatch = contains(valueLowerCase, filterTextLowerCase);
        return (!!literalMatch || !!contains(valueLowerCase, aliases[filterTextLowerCase]));
    },
    trimInput: true,
    debounceMs: 1000,
} as ITextFilterParams;
