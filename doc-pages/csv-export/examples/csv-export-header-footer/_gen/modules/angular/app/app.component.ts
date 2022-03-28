
import { Component } from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent } from '@ag-grid-community/core';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `

<div style="display: flex; flex-direction: column; height: 100%;">
    <div style="display: flex;">
        <div style="margin-left: 10px;">
            <div class="row">
                <label>prependContent = </label>
                <select id="prependContent">
                    <option>none</option>
                    <option value="array">CSVCell[][] (recommended format)</option>
                    <option value="string">string (legacy format)</option>
                </select>
            </div>
            <div class="row">
                <label>appendContent = </label>
                <select id="appendContent">
                    <option>none</option>
                    <option value="array">CSVCell[][] (recommended format)</option>
                    <option value="string">string (legacy format)</option>
                </select>
            </div>
        </div>
    </div>

    <div style="margin: 10px 0;">
        <button (click)="onBtnUpdate()">Show CSV export content text</button>
        <button (click)="onBtnExport()">Download CSV export file</button>
    </div>


    <div style="flex: 1 1 0px; position: relative;">
        <div id="gridContainer">
            <ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [defaultColDef]="defaultColDef"
    [suppressExcelExport]="true"
    [popupParent]="popupParent"
    [columnDefs]="columnDefs"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
        </div>
        <textarea id="csvResult">Click the Show CSV export content button to view exported CSV here</textarea>
    </div>
</div>

`
})

export class AppComponent {
    private gridApi!: GridApi;

    
    public defaultColDef: ColDef = {
    editable: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
};
public popupParent: HTMLElement = document.body;
public columnDefs: ColDef[] = [{ field: 'make' }, { field: 'model' }, { field: 'price' }];
public rowData: any[] | null = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
]


    onBtnExport() {
    var params = getParams();
    if (params.suppressQuotes || params.columnSeparator) {
        alert('NOTE: you are downloading a file with non-standard quotes or separators - it may not render correctly in Excel.');
    }
    this.gridApi.exportDataAsCsv(params);
}

onBtnUpdate() {
    (document.querySelector('#csvResult') as any).value = this.gridApi.getDataAsCsv(getParams());
}

onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
    }
}



function getValue(inputSelector: string) {
    var text = (document.querySelector(inputSelector) as HTMLInputElement).value;
    switch (text) {
        case 'string':
            return ('Here is a comma, and a some "quotes". You can see them using the\n' +
                'api.getDataAsCsv() button but they will not be visible when the downloaded\n' +
                'CSV file is opened in Excel because string content passed to\n' +
                'prependContent and appendContent is not escaped.');
        case 'array':
            return [
                [],
                [
                    {
                        data: {
                            value: 'Here is a comma, and a some "quotes".',
                            type: 'String',
                        },
                    },
                ],
                [
                    {
                        data: {
                            value: 'They are visible when the downloaded CSV file is opened in Excel because custom content is properly escaped (provided that suppressQuotes is not set to true)',
                            type: 'String',
                        },
                    },
                ],
                [
                    { data: { value: 'this cell:', type: 'String' }, mergeAcross: 1 },
                    {
                        data: {
                            value: 'is empty because the first cell has mergeAcross=1',
                            type: 'String',
                        },
                    },
                ],
                [],
            ];
        case 'none':
            return;
        default:
            return text;
    }
}
function getParams() {
    return {
        prependContent: getValue('#prependContent'),
        appendContent: getValue('#appendContent'),
        suppressQuotes: undefined,
        columnSeparator: undefined,
    };
}
