
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, IServerSideDatasource, ISetFilter, ServerSideStoreType, SetFilterValuesFuncParams } from 'ag-grid-community';
declare var FakeServer: any;

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowModelType]="rowModelType"
    [serverSideStoreType]="serverSideStoreType"
    [cacheBlockSize]="cacheBlockSize"
    [maxBlocksInCache]="maxBlocksInCache"
    [animateRows]="true"
    [rowData]="rowData"
    (filterChanged)="onFilterChanged($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    {
        field: 'country',
        filter: 'agSetColumnFilter',
        filterParams: {
            values: getCountryValuesAsync,
        },
        menuTabs: ['filterMenuTab'],
    },
    {
        field: 'sport',
        filter: 'agSetColumnFilter',
        filterParams: {
            values: getSportValuesAsync,
        },
        menuTabs: ['filterMenuTab'],
    },
    { field: 'athlete', menuTabs: undefined },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    sortable: true,
    resizable: true,
};
public rowModelType = 'serverSide';
public serverSideStoreType: ServerSideStoreType = 'partial';
public cacheBlockSize = 100;
public maxBlocksInCache = 10;
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onFilterChanged() {
    var countryFilterModel = this.gridApi.getFilterModel()['country'];
    var selected = countryFilterModel && countryFilterModel.values;
    if (!areEqual(selectedCountries, selected)) {
        selectedCountries = selected;
        console.log('Refreshing sports filter');
        var sportFilter = this.gridApi.getFilterInstance('sport') as ISetFilter;
        sportFilter!.refreshFilterValues();
    }
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => {
    // setup the fake server with entire dataset
    fakeServer = new FakeServer(data);
    // create datasource with a reference to the fake server
    var datasource = getServerSideDatasource(fakeServer);
    // register the datasource with the grid
    params.api!.setServerSideDatasource(datasource);
});
    }
}



var fakeServer: any;
var selectedCountries: string[] | null = null;
function areEqual(a: null | string[], b: null | string[]) {
    if (a == null && b == null) {
        return true;
    }
    if (a != null || b != null) {
        return false;
    }
    return (a!.length === b!.length &&
        a!.every(function (v, i) {
            return b![i] === v;
        }));
}
function getCountryValuesAsync(params: SetFilterValuesFuncParams) {
    var countries = fakeServer.getCountries();
    // simulating real server call with a 500ms delay
    setTimeout(function () {
        params.success(countries);
    }, 500);
}
function getSportValuesAsync(params: SetFilterValuesFuncParams) {
    var sports = fakeServer.getSports(selectedCountries);
    // simulating real server call with a 500ms delay
    setTimeout(function () {
        params.success(sports);
    }, 500);
}
function getServerSideDatasource(server: any): IServerSideDatasource {
    return {
        getRows: function (params) {
            console.log('[Datasource] - rows requested by grid: ', params.request);
            // get data for request from our fake server
            var response = server.getData(params.request);
            // simulating real server call with a 500ms delay
            setTimeout(function () {
                if (response.success) {
                    // supply rows for requested block to grid
                    params.success({ rowData: response.rows, rowCount: response.lastRow });
                }
                else {
                    params.fail();
                }
            }, 500);
        },
    };
}
