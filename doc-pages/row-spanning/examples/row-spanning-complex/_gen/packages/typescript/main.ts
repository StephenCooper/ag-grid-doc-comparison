import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions, ICellRendererComp, ICellRendererParams, RowSpanParams } from 'ag-grid-community';

function rowSpan(params: RowSpanParams) {
    if (params.data.show) {
        return 4
    } else {
        return 1
    }
}

class ShowCellRenderer implements ICellRendererComp {
    ui: any;

    init(params: ICellRendererParams) {
        const cellBlank = !params.value;
        if (cellBlank) {
            return;
        }

        this.ui = document.createElement('div')
        this.ui.innerHTML =
            '<div class="show-name">' +
            params.value.name +
            '' +
            '</div>' +
            '<div class="show-presenter">' +
            params.value.presenter +
            '</div>'
    }

    getGui() {
        return this.ui;
    }

    refresh() {
        return false;
    }
}

const columnDefs: ColDef[] = [
    { field: 'localTime' },
    {
        field: 'show',
        cellRenderer: ShowCellRenderer,
        rowSpan: rowSpan,
        cellClassRules: {
            'show-cell': 'value !== undefined',
        },
        width: 200,
    },
    { field: 'a' },
    { field: 'b' },
    { field: 'c' },
    { field: 'd' },
    { field: 'e' },
]

const gridOptions: GridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
        resizable: true,
        width: 170,
    },
    rowData: getData(),
    suppressRowTransform: true,
}

// setup the grid after the page has finished loading
    const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
    new Grid(gridDiv, gridOptions)
 