
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, FirstDataRenderedEvent, Grid, GridApi, GridOptions, GridReadyEvent, IDetailCellRendererParams } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [masterDetail]="true"
    [detailCellRendererParams]="detailCellRendererParams"
    [rowData]="rowData"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    // group cell renderer needed for expand / collapse icons
    { field: 'name', cellRenderer: 'agGroupCellRenderer' },
    { field: 'account' },
    { field: 'calls' },
    { field: 'minutes', valueFormatter: "x.toLocaleString() + 'm'" },
];
public defaultColDef: ColDef = {
    flex: 1,
};
public detailCellRendererParams: any = {
    detailGridOptions: {
        columnDefs: [
            { field: 'callId' },
            { field: 'direction' },
            { field: 'number' },
            { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
            { field: 'switchCode' },
        ],
        defaultColDef: {
            flex: 1,
        },
    },
    getDetailRowData: function (params) {
        params.successCallback(params.data.callRecords);
    },
    template: function (params) {
        var personName = params.data.name;
        return ('<div style="height: 100%; background-color: #EDF6FF; padding: 20px; box-sizing: border-box;">' +
            '  <div style="height: 10%; padding: 2px; font-weight: bold;">###### Name: ' +
            personName +
            '</div>' +
            '  <div ref="eDetailGrid" style="height: 90%;"></div>' +
            '</div>');
    },
} as IDetailCellRendererParams;
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onFirstDataRendered(params: FirstDataRenderedEvent) {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
        params.api.getDisplayedRowAtIndex(1)!.setExpanded(true);
    }, 0);
}

onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/master-detail-data.json').subscribe(data => {
    this.rowData = data;
});
    }
}




