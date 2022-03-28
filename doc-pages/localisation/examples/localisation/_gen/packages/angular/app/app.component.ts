
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, ICellRendererComp, ICellRendererParams, SideBarDef, StatusPanelDef } from 'ag-grid-community';
import { doc } from 'prettier';
declare var AG_GRID_LOCALE_ZZZ: {
  [key: string]: string;
};

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [localeText]="localeText"
    [defaultColDef]="defaultColDef"
    [sideBar]="true"
    [statusBar]="statusBar"
    [rowGroupPanelShow]="rowGroupPanelShow"
    [pagination]="true"
    [paginationPageSize]="paginationPageSize"
    [enableRangeSelection]="true"
    [enableCharts]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    // this row just shows the row index, doesn't use any data from the row
    {
        headerName: '#',
        cellRenderer: NodeIdRenderer,
        checkboxSelection: true,
        headerCheckboxSelection: true,
    },
    { field: 'athlete', filterParams: { buttons: ['clear', 'reset', 'apply'] } },
    {
        field: 'age',
        filterParams: { buttons: ['apply', 'cancel'] },
        enablePivot: true,
    },
    { field: 'country', enableRowGroup: true },
    { field: 'year', filter: 'agNumberColumnFilter' },
    { field: 'date' },
    {
        field: 'sport',
        filter: 'agMultiColumnFilter',
        filterParams: {
            filters: [
                {
                    filter: 'agTextColumnFilter',
                    display: 'accordion',
                },
                {
                    filter: 'agSetColumnFilter',
                    display: 'accordion',
                },
            ],
        },
    },
    { field: 'gold', enableValue: true },
    { field: 'silver', enableValue: true },
    { field: 'bronze', enableValue: true },
    { field: 'total', enableValue: true },
];
public localeText: {
        [key: string]: string;
    } = AG_GRID_LOCALE_ZZZ;
public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
};
public statusBar: {
        statusPanels: StatusPanelDef[];
    } = {
    statusPanels: [
        { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
        { statusPanel: 'agAggregationComponent' },
    ],
};
public rowGroupPanelShow = 'always';
public paginationPageSize = 500;
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    onGridReady(params: GridReadyEvent) {
        

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}

class NodeIdRenderer implements ICellRendererComp {
  eGui!: HTMLElement;

  init(params: ICellRendererParams) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = params.node!.id! + 1;
  }

  getGui() {
    return this.eGui;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}


