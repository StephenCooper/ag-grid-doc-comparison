
import { Component } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, GetRowIdFunc, Grid, GridApi, GridOptions, GridReadyEvent, ValueFormatterParams } from 'ag-grid-community';
declare function createMockServer(): any;

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [enableRangeSelection]="true"
    [getRowId]="getRowId"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'code', maxWidth: 90 },
    { field: 'name', minWidth: 200 },
    {
        field: 'bid',
        cellClass: 'cell-number',
        valueFormatter: numberFormatter,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
        field: 'mid',
        cellClass: 'cell-number',
        valueFormatter: numberFormatter,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
        field: 'ask',
        cellClass: 'cell-number',
        valueFormatter: numberFormatter,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
        field: 'volume',
        cellClass: 'cell-number',
        cellRenderer: 'agAnimateSlideCellRenderer',
    },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
};
public getRowId: GetRowIdFunc = function (params) {
    return params.data.code;
};
public rowData!: any[];


    onGridReady(params: GridReadyEvent) {
        

        
    var mockServer = createMockServer(), initialLoad$ = mockServer.initialLoad(), updates$ = mockServer.byRowupdates();
    initialLoad$.subscribe(function (rowData: any[]) {
        // the initial full set of data
        // note that we don't need to un-subscribe here as it's a one off data load
        params.api.setRowData(rowData);
        // now listen for updates
        // we process the updates with a transaction - this ensures that only the changes
        // rows will get re-rendered, improving performance
        updates$.subscribe(function (updates: any[]) {
            return params.api.applyTransaction({ update: updates });
        });
    });

    }
}



function numberFormatter(params: ValueFormatterParams) {
    if (typeof params.value === 'number') {
        return params.value.toFixed(2);
    }
    return params.value;
}
