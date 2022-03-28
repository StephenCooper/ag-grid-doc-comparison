
var cellClassRules = {
  'header-cell': 'data.section === "big-title"',
  'quarters-cell': 'data.section === "quarters"',
}

const columnDefs = [
  {
    headerName: 'Jan',
    field: 'jan',
    colSpan: function (params) {
      if (isHeaderRow(params)) {
        return 6
      } else if (isQuarterRow(params)) {
        return 3
      } else {
        return 1
      }
    },
    cellClassRules: cellClassRules,
  },
  { headerName: 'Feb', field: 'feb' },
  { headerName: 'Mar', field: 'mar' },
  {
    headerName: 'Apr',
    field: 'apr',
    colSpan: function (params) {
      if (isQuarterRow(params)) {
        return 3
      } else {
        return 1
      }
    },
    cellClassRules: cellClassRules,
  },
  { headerName: 'May', field: 'may' },
  { headerName: 'Jun', field: 'jun' },
]

const gridOptions = {
  getRowHeight: function (params) {
    if (isHeaderRow(params)) {
      return 60
    }
  },
  columnDefs: columnDefs,
  rowData: getData(),
  defaultColDef: {
    width: 100,
  },
  onGridReady: function (params) {
    params.api.sizeColumnsToFit()
  },
}


function isHeaderRow(params) {
  return params.data.section === 'big-title'
}

function isQuarterRow(params) {
  return params.data.section === 'quarters'
}



// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid')
  new agGrid.Grid(gridDiv, gridOptions)
})
