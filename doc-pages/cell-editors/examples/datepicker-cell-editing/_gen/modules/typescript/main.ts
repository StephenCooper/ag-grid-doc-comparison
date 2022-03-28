import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions, ICellEditorComp, ICellEditorParams } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule, ColumnsToolPanelModule])

class DatePicker implements ICellEditorComp {
    eInput!: HTMLInputElement

    // gets called once before the renderer is used
    init(params: ICellEditorParams) {
        // create the cell
        this.eInput = document.createElement('input')
        this.eInput.value = params.value
        this.eInput.classList.add('ag-input')
        this.eInput.style.height = '100%'

        // https://jqueryui.com/datepicker/
        $(this.eInput).datepicker({
            dateFormat: 'dd/mm/yy',
            onSelect: () => { this.eInput.focus(); }
        })
    }

    // gets called once when grid ready to insert the element
    getGui() {
        return this.eInput
    }

    // focus and select can be done after the gui is attached
    afterGuiAttached() {
        this.eInput.focus()
        this.eInput.select()
    }

    // returns the new value after editing
    getValue() {
        return this.eInput.value
    }

    // any cleanup we need to be done here
    destroy() {
        // but this example is simple, no cleanup, we could
        // even leave this method out as it's optional
    }

    // if true, then this editor will appear in a popup
    isPopup() {
        // and we could leave this method out also, false is the default
        return false
    }
}

const columnDefs: ColDef[] = [
    { field: 'athlete' },
    { field: 'date', editable: true, cellEditor: DatePicker, cellEditorPopup: true },
    { field: 'age', maxWidth: 110 },
    { field: 'country' },
    { field: 'year', maxWidth: 120 },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
]

const gridOptions: GridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
        flex: 1,
        minWidth: 150,
    }
}

// setup the grid after the page has finished loading
    const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
    new Grid(gridDiv, gridOptions)

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then(response => response.json())
        .then(data => gridOptions.api!.setRowData(data))
 