
import { Component } from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, ICellRendererComp, ICellRendererParams, RowGroupingDisplayType } from '@ag-grid-community/core';
import { SimpleCellRenderer } from './simple-cell-renderer.component';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `


    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    [groupDisplayType]="groupDisplayType"
    [suppressRowClickSelection]="true"
    [groupDefaultExpanded]="groupDefaultExpanded"
    [rowSelection]="rowSelection"
    [groupSelectsChildren]="true"
    [animateRows]="true"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    // this column shows just the country group values, but has not group renderer, so there is no expand / collapse functionality
    {
        headerName: 'Country Group - No Renderer',
        showRowGroup: 'country',
        minWidth: 250,
    },
    // same as before, but we show all group values, again with no cell renderer
    { headerName: 'All Groups - No Renderer', showRowGroup: true, minWidth: 240 },
    // add in a cell renderer
    {
        headerName: 'Group Renderer A',
        showRowGroup: true,
        cellRenderer: 'agGroupCellRenderer',
        minWidth: 220,
    },
    // add in a field
    {
        headerName: 'Group Renderer B',
        field: 'city',
        showRowGroup: true,
        cellRenderer: 'agGroupCellRenderer',
        minWidth: 220,
    },
    // add in a cell renderer params
    {
        headerName: 'Group Renderer C',
        field: 'city',
        minWidth: 240,
        showRowGroup: true,
        cellRenderer: 'agGroupCellRenderer',
        cellRendererParams: {
            suppressCount: true,
            checkbox: true,
            innerRenderer: SimpleCellRenderer,
            suppressDoubleClickExpand: true,
            suppressEnterExpand: true,
        },
    },
    { headerName: 'Type', field: 'type', rowGroup: true },
    { headerName: 'Country', field: 'country', rowGroup: true },
    { headerName: 'City', field: 'city' },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 120,
    resizable: true,
};
public rowData: any[] | null = getData();
public groupDisplayType: RowGroupingDisplayType = 'custom';
public groupDefaultExpanded = 1;
public rowSelection = 'multiple'


    onGridReady(params: GridReadyEvent) {
        
    }
}




