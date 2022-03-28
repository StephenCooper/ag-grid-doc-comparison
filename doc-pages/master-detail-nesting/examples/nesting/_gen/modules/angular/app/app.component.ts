
import { Component } from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, IDetailCellRendererParams } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [rowData]="rowData"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [groupDefaultExpanded]="groupDefaultExpanded"
    [masterDetail]="true"
    [detailCellRendererParams]="detailCellRendererParams"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>`
})

export class AppComponent {

    
    public rowData: any[] | null = [
    {
        a1: 'level 1 - 111',
        b1: 'level 1 - 222',
        children: [
            {
                a2: 'level 2 - 333',
                b2: 'level 2 - 444',
                children: [
                    { a3: 'level 3 - 5551', b3: 'level 3 - 6661' },
                    { a3: 'level 3 - 5552', b3: 'level 3 - 6662' },
                    { a3: 'level 3 - 5553', b3: 'level 3 - 6663' },
                    { a3: 'level 3 - 5554', b3: 'level 3 - 6664' },
                    { a3: 'level 3 - 5555', b3: 'level 3 - 6665' },
                    { a3: 'level 3 - 5556', b3: 'level 3 - 6666' },
                ],
            },
        ],
    },
    {
        a1: 'level 1 - 111',
        b1: 'level 1 - 222',
        children: [
            {
                a2: 'level 2 - 333',
                b2: 'level 2 - 444',
                children: [
                    { a3: 'level 3 - 5551', b3: 'level 3 - 6661' },
                    { a3: 'level 3 - 5552', b3: 'level 3 - 6662' },
                    { a3: 'level 3 - 5553', b3: 'level 3 - 6663' },
                    { a3: 'level 3 - 5554', b3: 'level 3 - 6664' },
                    { a3: 'level 3 - 5555', b3: 'level 3 - 6665' },
                    { a3: 'level 3 - 5556', b3: 'level 3 - 6666' },
                ],
            },
        ],
    },
];
public columnDefs: ColDef[] = [
    { field: 'a1', cellRenderer: 'agGroupCellRenderer' },
    { field: 'b1' },
];
public defaultColDef: ColDef = {
    flex: 1,
};
public groupDefaultExpanded = 1;
public detailCellRendererParams: any = {
    // level 2 grid options
    detailGridOptions: {
        columnDefs: [
            { field: 'a2', cellRenderer: 'agGroupCellRenderer' },
            { field: 'b2' },
        ],
        defaultColDef: {
            flex: 1,
        },
        groupDefaultExpanded: 1,
        masterDetail: true,
        detailRowHeight: 240,
        detailCellRendererParams: {
            // level 3 grid options
            detailGridOptions: {
                columnDefs: [
                    { field: 'a3', cellRenderer: 'agGroupCellRenderer' },
                    { field: 'b3' },
                ],
                defaultColDef: {
                    flex: 1,
                },
            },
            getDetailRowData: function (params) {
                params.successCallback(params.data.children);
            },
        } as IDetailCellRendererParams,
    },
    getDetailRowData: function (params) {
        params.successCallback(params.data.children);
    },
} as IDetailCellRendererParams


    onGridReady(params: GridReadyEvent) {
        
    }
}




