
const columnDefs = [
    { field: 'athlete', filter: 'agTextColumnFilter' },
    {
        field: 'gold',
        floatingFilterComponent: NumberFloatingFilterComponent,
        floatingFilterComponentParams: {
            suppressFilterButton: true,
        },
        filter: NumberFilterComponent
    },
    {
        field: 'silver',
        floatingFilterComponent: NumberFloatingFilterComponent,
        floatingFilterComponentParams: {
            suppressFilterButton: true,
        },
        filter: NumberFilterComponent
    },
    {
        field: 'bronze',
        floatingFilterComponent: NumberFloatingFilterComponent,
        floatingFilterComponentParams: {
            suppressFilterButton: true,
        },
        filter: NumberFilterComponent
    },
    {
        field: 'total',
        floatingFilterComponent: NumberFloatingFilterComponent,
        floatingFilterComponentParams: {
            suppressFilterButton: true,
        },
        filter: NumberFilterComponent
    },
]

const gridOptions = {
    defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        floatingFilter: true,
        resizable: true,
    },
    columnDefs: columnDefs,
    rowData: null,
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#myGrid')
    new agGrid.Grid(gridDiv, gridOptions)

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then(response => response.json())
        .then(data => {
            gridOptions.api.setRowData(data)
        })
})
