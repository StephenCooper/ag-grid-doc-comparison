


function poundFormatter(params) {
  return (
    '£' +
    Math.floor(params.value)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  )
}

const gridOptions = {
  columnDefs: [
    { field: 'category', rowGroupIndex: 1, hide: true },
    { field: 'price', aggFunc: 'sum', valueFormatter: poundFormatter },
    { field: 'zombies' },
    { field: 'style' },
    { field: 'clothes' },
  ],
  defaultColDef: {
    flex: 1,
    width: 100,
    sortable: true,
  },
  autoGroupColumnDef: {
    headerName: 'Group',
    minWidth: 250,
    field: 'model',
    rowGroupIndex: 1,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true,
    },
  },
  groupDefaultExpanded: 1,
  rowData: getData(),
  suppressRowClickSelection: true,
  rowSelection: 'multiple',
  animateRows: true,
  groupSelectsChildren: true,
  suppressAggFuncInHeader: true,
  // this allows the different colors per group, by assigning a different
  // css class to each group level based on the key
  getRowClass: function (params) {
    var rowNode = params.node
    if (rowNode.group) {
      switch (rowNode.key) {
        case 'In Workshop':
          return 'category-in-workshop'
        case 'Sold':
          return 'category-sold'
        case 'For Sale':
          return 'category-for-sale'
        default:
          return undefined
      }
    } else {
      // no extra classes for leaf rows
      return undefined
    }
  },
}

function getRowData() {
  var rowData = []
  gridOptions.api.forEachNode(function (node) {
    rowData.push(node.data)
  })
  console.log('Row Data:')
  console.log(rowData)
}

function onAddRow(category) {
  var rowDataItem = createNewRowData(category)
  gridOptions.api.applyTransaction({ add: [rowDataItem] })
}

function onMoveToGroup(category) {
  var selectedRowData = gridOptions.api.getSelectedRows()
  selectedRowData.forEach(function (dataItem) {
    dataItem.category = category
  })
  gridOptions.api.applyTransaction({ update: selectedRowData })
}

function onRemoveSelected() {
  var selectedRowData = gridOptions.api.getSelectedRows()
  gridOptions.api.applyTransaction({ remove: selectedRowData })
}

// wait for the document to be loaded, otherwise
// AG Grid will not find the div in the document.
document.addEventListener('DOMContentLoaded', function () {
  var eGridDiv = document.querySelector('#myGrid')
  new agGrid.Grid(eGridDiv, gridOptions)
})
