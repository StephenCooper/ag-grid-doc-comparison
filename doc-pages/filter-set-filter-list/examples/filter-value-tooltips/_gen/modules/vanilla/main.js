const gridOptions = {
  columnDefs: [
    {
      field: 'colA',
      tooltipField: 'colA',
      filter: 'agSetColumnFilter',
    },
    {
      field: 'colB',
      tooltipField: 'colB',
      filter: 'agSetColumnFilter',
      filterParams: {
        showTooltips: true,
      },
    },
    {
      field: 'colC',
      tooltipField: 'colC',
      tooltipComponent: CustomTooltip,
      filter: 'agSetColumnFilter',
      filterParams: {
        showTooltips: true,
      },
    },
  ],
  sideBar: 'filters',
  defaultColDef: {
    flex: 1,
    resizable: true,
  },
  tooltipShowDelay: 100,
  rowData: getData(),
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);
});
