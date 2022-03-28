
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, IColumnToolPanel, SideBarDef } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<div class="example-wrapper">
    <div>
        <span class="button-group">
            <button (click)="expandAllGroups()">Expand All</button>
            <button (click)="collapseAllGroups()">Collapse All</button>
            <button (click)="expandAthleteAndCompetitionGroups()">Expand Athlete &amp; Competition</button>
            <button (click)="collapseCompetitionGroups()">Collapse Competition</button>
        </span>
    </div>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [sideBar]="sideBar"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>
`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public columnDefs: (ColDef | ColGroupDef)[] = [
    {
        groupId: 'athleteGroupId',
        headerName: 'Athlete',
        children: [
            {
                headerName: 'Name',
                field: 'athlete',
                minWidth: 200,
                filter: 'agTextColumnFilter',
            },
            {
                groupId: 'competitionGroupId',
                headerName: 'Competition',
                children: [{ field: 'year' }, { field: 'date', minWidth: 180 }],
            },
        ],
    },
    {
        groupId: 'medalsGroupId',
        headerName: 'Medals',
        children: [
            { field: 'gold' },
            { field: 'silver' },
            { field: 'bronze' },
            { field: 'total' },
        ],
    },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    // allow every column to be aggregated
    enableValue: true,
    // allow every column to be grouped
    enableRowGroup: true,
    // allow every column to be pivoted
    enablePivot: true,
    filter: true,
    sortable: true,
    resizable: true,
};
public sideBar: SideBarDef | string | boolean | null = 'columns';
public rowData!: any[];

    constructor(private http: HttpClient) {
}


    expandAllGroups() {
    var columnToolPanel = (this.gridApi.getToolPanelInstance('columns') as unknown) as IColumnToolPanel;
    columnToolPanel.expandColumnGroups();
}

collapseAllGroups() {
    var columnToolPanel = (this.gridApi.getToolPanelInstance('columns') as unknown) as IColumnToolPanel;
    columnToolPanel.collapseColumnGroups();
}

expandAthleteAndCompetitionGroups() {
    var columnToolPanel = (this.gridApi.getToolPanelInstance('columns') as unknown) as IColumnToolPanel;
    columnToolPanel.expandColumnGroups(['athleteGroupId', 'competitionGroupId']);
}

collapseCompetitionGroups() {
    var columnToolPanel = (this.gridApi.getToolPanelInstance('columns') as unknown) as IColumnToolPanel;
    columnToolPanel.collapseColumnGroups(['competitionGroupId']);
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        
    var columnToolPanel = (params.api!.getToolPanelInstance('columns') as unknown) as IColumnToolPanel;
    columnToolPanel.collapseColumnGroups();

        this.http.get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json').subscribe(data => this.rowData = data);
    }
}




