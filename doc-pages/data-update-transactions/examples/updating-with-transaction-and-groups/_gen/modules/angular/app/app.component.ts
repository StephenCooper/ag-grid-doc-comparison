
import { Component } from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, RowClassParams, ValueFormatterParams } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts
declare function createNewRowData(category: string): any;

@Component({
    selector: 'my-app',
    template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
        <div>
            <button class="bt-action" (click)="onAddRow('For Sale')">Add For Sale</button>
            <button class="bt-action" (click)="onAddRow('In Workshop')">Add In Workshop</button>
            <button class="bt-action" (click)="onRemoveSelected()">Remove Selected</button>
            <button class="bt-action" (click)="getRowData()">Get Row Data</button>
        </div>
        <div style="margin-top: 5px;">
            <button class="bt-action" (click)="onMoveToGroup('For Sale')">Move to For Sale</button>
            <button class="bt-action" (click)="onMoveToGroup('In Workshop')">Move to In Workshop</button>
            <button class="bt-action" (click)="onMoveToGroup('Sold')">Move to Sold</button>
        </div>
    </div>

    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [groupDefaultExpanded]="groupDefaultExpanded"
    [rowData]="rowData"
    [suppressRowClickSelection]="true"
    [rowSelection]="rowSelection"
    [animateRows]="true"
    [groupSelectsChildren]="true"
    [suppressAggFuncInHeader]="true"
    [getRowClass]="getRowClass"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>
`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: ColDef[] = [
    { field: 'category', rowGroupIndex: 1, hide: true },
    { field: 'price', aggFunc: 'sum', valueFormatter: poundFormatter },
    { field: 'zombies' },
    { field: 'style' },
    { field: 'clothes' },
];
public defaultColDef: ColDef = {
    flex: 1,
    width: 100,
    sortable: true,
};
public autoGroupColumnDef: ColDef = {
    headerName: 'Group',
    minWidth: 250,
    field: 'model',
    rowGroupIndex: 1,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
        checkbox: true,
    },
};
public groupDefaultExpanded = 1;
public rowData: any[] | null = getData();
public rowSelection = 'multiple';
public getRowClass: (params: RowClassParams) => string | string[] | undefined = function (params) {
    var rowNode = params.node;
    if (rowNode.group) {
        switch (rowNode.key) {
            case 'In Workshop':
                return 'category-in-workshop';
            case 'Sold':
                return 'category-sold';
            case 'For Sale':
                return 'category-for-sale';
            default:
                return undefined;
        }
    }
    else {
        // no extra classes for leaf rows
        return undefined;
    }
}


    getRowData() {
    var rowData: any[] = [];
    this.gridApi.forEachNode(function (node) {
        rowData.push(node.data);
    });
    console.log('Row Data:');
    console.log(rowData);
}

onAddRow(category: string) {
    var rowDataItem = createNewRowData(category);
    this.gridApi.applyTransaction({ add: [rowDataItem] });
}

onMoveToGroup(category: string) {
    var selectedRowData = this.gridApi.getSelectedRows();
    selectedRowData.forEach(function (dataItem) {
        dataItem.category = category;
    });
    this.gridApi.applyTransaction({ update: selectedRowData });
}

onRemoveSelected() {
    var selectedRowData = this.gridApi.getSelectedRows();
    this.gridApi.applyTransaction({ remove: selectedRowData });
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
    }
}



function poundFormatter(params: ValueFormatterParams) {
    return ('£' +
        Math.floor(params.value)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
}
