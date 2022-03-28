




let aggCallCount = 0;
let compareCallCount = 0;
let filterCallCount = 0;
let idCounter = 0;

function myAggFunc(params) {
    aggCallCount++

    let total = 0;
    for (let i = 0; i < params.values.length; i++) {
        total += params.values[i]
    }
    return total
}

function myComparator(a, b) {
    compareCallCount++
    return a < b ? -1 : 1
}

function getMyFilter() {

    class MyFilter  {
        
        
        
        

        init(params) {
            this.filterParams = params;
            this.filterValue = null

            this.eGui = document.createElement('div')
            this.eGui.innerHTML = '<div>Greater Than: <input type="text"/></div>'
            this.eInput = this.eGui.querySelector('input')
            this.eInput.addEventListener('input', () => {
                this.getValueFromInput()
                params.filterChangedCallback()
            })
        }

        getGui() {
            return this.eGui
        }

        getValueFromInput() {
            const value = parseInt(this.eInput.value);
            this.filterValue = isNaN(value) ? null : value
        }

        setModel(model) {
            this.eInput.value = model == null ? null : model.value;
            this.getValueFromInput()
        }

        getModel() {
            if (!this.isFilterActive()) {
                return null;
            }

            return { value: this.eInput.value }
        }

        isFilterActive() {
            return this.filterValue !== null
        }

        doesFilterPass(params) {
            filterCallCount++

            const { api, colDef, column, columnApi, context } = this.filterParams;
            const { node } = params;
            const value = this.filterParams.valueGetter({
                api,
                colDef,
                column,
                columnApi,
                context,
                data: node.data,
                getValue: (field) => node.data[field],
                node,
            });
            return value > (this.filterValue || 0)
        }
    }

    return MyFilter;
}


const myFilter = getMyFilter();


const columnDefs = [
    { field: 'city', rowGroup: true, hide: true },
    { field: 'laptop', rowGroup: true, hide: true },
    { field: 'distro', sort: 'asc', comparator: myComparator },
    {
        field: 'value',
        enableCellChangeFlash: true,
        aggFunc: myAggFunc,
        filter: myFilter,
    },
]

function getRowId(params) {
    return params.data.id
}

function onBtDuplicate() {
    const api = gridOptions.api;

    // get the first child of the
    const selectedRows = api.getSelectedRows();
    if (!selectedRows || selectedRows.length === 0) {
        console.log('No rows selected!')
        return
    }

    const newItems = [];
    selectedRows.forEach(function (selectedRow) {
        idCounter++
        const newItem = createDataItem(
            idCounter,
            selectedRow.name,
            selectedRow.distro,
            selectedRow.laptop,
            selectedRow.city,
            selectedRow.value
        );
        newItems.push(newItem)
    })

    timeOperation('Duplicate', function () {
        api.applyTransaction({ add: newItems })
    })
}

function onBtUpdate() {
    const api = gridOptions.api;

    // get the first child of the
    const selectedRows = api.getSelectedRows();
    if (!selectedRows || selectedRows.length === 0) {
        console.log('No rows selected!')
        return
    }

    const updatedItems = [];
    selectedRows.forEach(function (oldItem) {
        const newValue = Math.floor(Math.random() * 100) + 10;
        const newItem = createDataItem(
            oldItem.id,
            oldItem.name,
            oldItem.distro,
            oldItem.laptop,
            oldItem.city,
            newValue
        );
        updatedItems.push(newItem)
    })

    timeOperation('Update', function () {
        api.applyTransaction({ update: updatedItems })
    })
}

function onBtDelete() {
    const api = gridOptions.api;

    // get the first child of the
    const selectedRows = api.getSelectedRows();
    if (!selectedRows || selectedRows.length === 0) {
        console.log('No rows selected!')
        return
    }

    timeOperation('Delete', function () {
        api.applyTransaction({ remove: selectedRows })
    })
}

function onBtClearSelection() {
    gridOptions.api.deselectAll()
}

function onBtUpdateModel() {
    const api = gridOptions.api;

    timeOperation('Update Model', function () {
        api.refreshClientSideRowModel('filter')
    })
}

const gridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
        flex: 1,
        filter: true,
        sortable: true,
        resizable: true,
    },
    suppressModelUpdateAfterUpdateTransaction: true,
    getRowId: getRowId,
    rowSelection: 'multiple',
    groupSelectsChildren: true,
    animateRows: true,
    suppressAggAtRootLevel: true,
    suppressRowClickSelection: true,
    autoGroupColumnDef: {
        field: 'name',
        cellRendererParams: { checkbox: true },
    },
    onGridReady: function (params) {
        params.api.setFilterModel({
            value: { value: '50' },
        })

        timeOperation('Initialisation', function () {
            params.api.setRowData(getData())
        })

        params.api.getDisplayedRowAtIndex(2).setExpanded(true)
        params.api.getDisplayedRowAtIndex(4).setExpanded(true)
    },
}

// wait for the document to be loaded, otherwise
// AG Grid will not find the div in the document.
document.addEventListener('DOMContentLoaded', function () {
    const eGridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(eGridDiv, gridOptions)
})

function timeOperation(name, operation) {
    aggCallCount = 0
    compareCallCount = 0
    filterCallCount = 0
    const start = new Date().getTime();
    operation()
    const end = new Date().getTime();
    console.log(
        name +
        ' finished in ' +
        (end - start) +
        'ms, aggCallCount = ' +
        aggCallCount +
        ', compareCallCount = ' +
        compareCallCount +
        ', filterCallCount = ' +
        filterCallCount
    )
}


function letter(i) {
    return 'abcdefghijklmnopqrstuvwxyz'.substring(i, i + 1)
}

function randomLetter() {
    return letter(Math.floor(Math.random() * 26 + 1))
}

function getData() {
    const myRowData = [];
    for (let i = 0; i < 10000; i++) {
        const name =
            'Mr ' +
            randomLetter().toUpperCase() +
            ' ' +
            randomLetter().toUpperCase() +
            randomLetter() +
            randomLetter() +
            randomLetter() +
            randomLetter();
        const city = CITIES[i % CITIES.length];
        const distro =
            LINUX_DISTROS[i % LINUX_DISTROS.length] +
            ' v' +
            Math.floor(Math.random() * 100 + 1) / 10;
        const university = LAPTOPS[i % LAPTOPS.length];
        const value = Math.floor(Math.random() * 100) + 10; // between 10 and 110
        idCounter++
        myRowData.push(
            createDataItem(idCounter, name, distro, university, city, value)
        )
    }
    return myRowData;
}

function createDataItem(id, name, distro, laptop, city, value) {
    return {
        id: id,
        name: name,
        city: city,
        distro: distro,
        laptop: laptop,
        value: value,
    }
}
