var swimmingHeight;
var groupHeight;
var russiaHeight;

const gridOptions = {
  columnDefs: [
    { field: 'country', rowGroup: true },
    { field: 'athlete' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ],
  rowData: getData(),
  animateRows: true,
  groupDefaultExpanded: 1,
  getRowHeight: getRowHeight,
};

function getRowHeight(params) {
  if (params.node.group && groupHeight != null) {
    return groupHeight;
  } else if (
    params.data &&
    params.data.country === 'Russia' &&
    russiaHeight != null
  ) {
    return russiaHeight;
  } else if (
    params.data &&
    params.data.sport === 'Swimming' &&
    swimmingHeight != null
  ) {
    return swimmingHeight;
  }
}

function setSwimmingHeight(height) {
  swimmingHeight = height;
  gridOptions.api.resetRowHeights();
}

function setGroupHeight(height) {
  groupHeight = height;
  gridOptions.api.resetRowHeights();
}

function setRussiaHeight(height) {
  // this is used next time resetRowHeights is called
  russiaHeight = height;

  gridOptions.api.forEachNode(function (rowNode) {
    if (rowNode.data && rowNode.data.country === 'Russia') {
      rowNode.setRowHeight(height);
    }
  });
  gridOptions.api.onRowHeightChanged();
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);
});
