
import { Component } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, IViewportDatasource, IViewportDatasourceParams } from 'ag-grid-community';

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [rowHeight]="rowHeight"
    [rowModelType]="rowModelType"
    [viewportDatasource]="viewportDatasource"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    {
        headerName: 'ID',
        field: 'id',
    },
    {
        headerName: 'Expected Position',
        valueGetter: '"translateY(" + node.rowIndex * 100 + "px)"',
    },
    {
        field: 'a',
    },
    {
        field: 'b',
    },
    {
        field: 'c',
    },
];
public rowHeight = 100;
public rowModelType = 'viewport';
public viewportDatasource: IViewportDatasource = createViewportDatasource();
public rowData!: any[];


    onGridReady(params: GridReadyEvent) {
        
    }
}



function createViewportDatasource(): IViewportDatasource {
    let initParams: IViewportDatasourceParams;
    return {
        init: (params: IViewportDatasourceParams) => {
            initParams = params;
            var oneMillion = 1000 * 1000;
            params.setRowCount(oneMillion);
        },
        setViewportRange(firstRow: number, lastRow: number) {
            var rowData: any = {};
            for (var rowIndex = firstRow; rowIndex <= lastRow; rowIndex++) {
                var item: any = {};
                item.id = rowIndex;
                item.a = 'A-' + rowIndex;
                item.b = 'B-' + rowIndex;
                item.c = 'C-' + rowIndex;
                rowData[rowIndex] = item;
            }
            initParams.setRowData(rowData);
        },
        destroy: () => { }
    };
}
