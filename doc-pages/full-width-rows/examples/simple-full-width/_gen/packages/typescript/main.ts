import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions, ICellRendererComp, ICellRendererParams, IsFullWidthRowParams, RowHeightParams } from 'ag-grid-community';
import { FullWidthCellRenderer } from './fullWidthCellRenderer';

class CountryCellRenderer implements ICellRendererComp {
    eGui!: HTMLElement;

    init(params: ICellRendererParams) {
        const flag = `<img border="0" width="15" height="10" src="https://www.ag-grid.com/example-assets/flags/${params.data.code}.png">`

        const eTemp = document.createElement('div');
        eTemp.innerHTML = `<span style="cursor: default;">${flag} ${params.value}</span>`;
        this.eGui = eTemp.firstElementChild as HTMLElement;
    }

    getGui() {
        return this.eGui;
    }

    refresh(params: ICellRendererParams): boolean {
        return false;
    }
}

const gridOptions: GridOptions = {
    columnDefs: [
        { field: 'name', cellRenderer: CountryCellRenderer },
        { field: 'continent' },
        { field: 'language' },
    ],
    defaultColDef: {
        flex: 1,
        sortable: true,
        resizable: true,
        filter: true,
    },
    rowData: getData(),
    getRowHeight: function (params) {
        // return 100px height for full width rows
        if (isFullWidth(params.data)) {
            return 100
        }
    },
    isFullWidthRow: function (params: IsFullWidthRowParams) {
        return isFullWidth(params.rowNode.data)
    },
    // see AG Grid docs cellRenderer for details on how to build cellRenderers
    fullWidthCellRenderer: FullWidthCellRenderer,
}

function isFullWidth(data: any) {
    // return true when country is Peru, France or Italy
    return ['Peru', 'France', 'Italy'].indexOf(data.name) >= 0
}

// setup the grid after the page has finished loading
    const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
    new Grid(gridDiv, gridOptions)
 