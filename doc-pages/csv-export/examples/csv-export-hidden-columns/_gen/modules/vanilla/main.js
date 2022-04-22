const gridOptions = {
  defaultColDef: {
    editable: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  },

  suppressExcelExport: true,
  popupParent: document.body,

  columnDefs: [
    { field: 'athlete' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'gold', hide: true },
    { field: 'silver', hide: true },
    { field: 'bronze', hide: true },
    { field: 'total' },
  ],

  rowData: getData(),
};

function getBoolean(id) {
  var field = document.querySelector('#' + id);

  return !!field.checked;
}

function getParams() {
  return {
    allColumns: getBoolean('allColumns'),
  };
}

function onBtnExport() {
  gridOptions.api.exportDataAsCsv(getParams());
}

function onBtnUpdate() {
  document.querySelector('#csvResult').value = gridOptions.api.getDataAsCsv(
    getParams()
  );
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);
});
