
const columnDefs = [
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
]

const gridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
        flex: 1,
        minWidth: 120,
        resizable: true,
    },
    rowData: getData(),
    // we don't want the auto column here, as we are providing our own cols
    groupDisplayType: 'custom',
    suppressRowClickSelection: true,
    groupDefaultExpanded: 1,
    rowSelection: 'multiple',
    groupSelectsChildren: true,
    animateRows: true,
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions)
})
