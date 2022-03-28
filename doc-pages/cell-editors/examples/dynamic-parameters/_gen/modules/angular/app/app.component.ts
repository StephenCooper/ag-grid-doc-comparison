
import { Component } from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { CellValueChangedEvent, ColDef, ColGroupDef, ColumnApi, Grid, GridApi, GridOptions, GridReadyEvent, ICellEditorParams } from '@ag-grid-community/core';
import { GenderCellRenderer } from './gender-cell-renderer.component';
// Required feature modules are registered in app.module.ts

@Component({
    selector: 'my-app',
    template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (cellValueChanged)="onCellValueChanged($event)"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
`
})

export class AppComponent {

    
    public columnDefs: ColDef[] = [
    { field: 'name' },
    {
        field: 'gender',
        cellRenderer: GenderCellRenderer,
        cellEditor: 'agRichSelectCellEditor',
        cellEditorPopup: true,
        cellEditorParams: {
            values: ['Male', 'Female'],
            cellRenderer: GenderCellRenderer,
            cellEditorPopup: true
        },
    },
    {
        field: 'country',
        cellEditor: 'agRichSelectCellEditor',
        cellEditorPopup: true,
        cellEditorParams: {
            cellHeight: 50,
            values: ['Ireland', 'USA'],
        },
    },
    {
        field: 'city',
        cellEditor: 'agRichSelectCellEditor',
        cellEditorPopup: true,
        cellEditorParams: cellCellEditorParams,
    },
    { field: 'address', cellEditor: 'agLargeTextCellEditor', cellEditorPopup: true, minWidth: 550 },
];
public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 130,
    editable: true,
    resizable: true,
};
public rowData: any[] | null = getData()


    onCellValueChanged(params: CellValueChangedEvent) {
    const colId = params.column.getId();
    if (colId === 'country') {
        const selectedCountry = params.data.country;
        const selectedCity = params.data.city;
        const allowedCities = countyToCityMap(selectedCountry);
        const cityMismatch = allowedCities.indexOf(selectedCity) < 0;
        if (cityMismatch) {
            params.node.setDataValue('city', null);
        }
    }
}

onGridReady(params: GridReadyEvent) {
        
    }
}



const cellCellEditorParams = (params: ICellEditorParams) => {
    const selectedCountry = params.data.country;
    const allowedCities = countyToCityMap(selectedCountry);
    return {
        values: allowedCities,
        formatValue: (value: any) => `${value} (${selectedCountry})`,
    };
};
function countyToCityMap(match: string): string[] {
    const map: {
        [key: string]: string[];
    } = {
        Ireland: ['Dublin', 'Cork', 'Galway'],
        USA: ['New York', 'Los Angeles', 'Chicago', 'Houston'],
    };
    return map[match];
}
