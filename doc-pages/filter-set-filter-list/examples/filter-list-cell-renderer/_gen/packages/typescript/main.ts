import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, FirstDataRenderedEvent, Grid, GridOptions, IFiltersToolPanel, SideBarDef } from 'ag-grid-community';
import { CountryCellRenderer } from './countryCellRenderer';

const COUNTRY_CODES: Record<string, string> = {
    Ireland: 'ie',
    Luxembourg: 'lu',
    Belgium: 'be',
    Spain: 'es',
    France: 'fr',
    Germany: 'de',
    Sweden: 'se',
    Italy: 'it',
    Greece: 'gr',
    Iceland: 'is',
    Portugal: 'pt',
    Malta: 'mt',
    Norway: 'no',
    Brazil: 'br',
    Argentina: 'ar',
    Colombia: 'co',
    Peru: 'pe',
    Venezuela: 've',
    Uruguay: 'uy',
};

const gridOptions: GridOptions = {
    columnDefs: [
        {
            headerName: 'No Cell Renderer',
            field: 'country',
            cellRenderer: CountryCellRenderer,
            filter: 'agSetColumnFilter',
            filterParams: {
                // no cell renderer!
            },
        },
        {
            headerName: 'With Cell Renderers',
            field: 'country',
            cellRenderer: CountryCellRenderer,
            filter: 'agSetColumnFilter',
            filterParams: {
                cellRenderer: CountryCellRenderer,
            },
        },
    ],
    context: {
        COUNTRY_CODES: COUNTRY_CODES
    },
    defaultColDef: {
        flex: 1,
        minWidth: 225,
        resizable: true,
        floatingFilter: true,
    },
    sideBar: 'filters',
    onFirstDataRendered: onFirstDataRendered,
}

function printFilterModel() {
    const filterModel = gridOptions.api!.getFilterModel();
    console.log(filterModel)
}

function onFirstDataRendered(params: FirstDataRenderedEvent) {
    ((params.api.getToolPanelInstance(
        'filters'
    ) as any) as IFiltersToolPanel).expandFilters()
}

// setup the grid after the page has finished loading
    const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
    new Grid(gridDiv, gridOptions)

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then(response => response.json())
        .then(function (data) {
            // only return data that has corresponding country codes
            const dataWithFlags = data.filter(function (d: any) {
                return COUNTRY_CODES[d.country]
            });

            gridOptions.api!.setRowData(dataWithFlags)
        })

 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).printFilterModel = printFilterModel;
}