const columnDefs = [
  { field: "id" },
  { field: "athlete", width: 150 },
  { field: "age" },
  { field: "country" },
  { field: "year" },
  { field: "sport" },
  { field: "gold" },
  { field: "silver" },
  { field: "bronze" },
];

const gridOptions = {
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
  loadingCellRenderer: CustomLoadingCellRenderer,
  loadingCellRendererParams: {
    loadingMessage: "One moment please...",
  },

  columnDefs: columnDefs,

  // use the server-side row model
  rowModelType: "serverSide",

  serverSideStoreType: "partial",

  // fetch 100 rows per at a time
  cacheBlockSize: 100,

  // only keep 10 blocks of rows
  maxBlocksInCache: 10,

  animateRows: true,
  // debug: true,
};

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", () => {
  const gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);

  fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
    .then((response) => response.json())
    .then((data) => {
      // add id to data
      let idSequence = 0;
      data.forEach((item) => {
        item.id = idSequence++;
      });

      const server = getFakeServer(data);
      const datasource = getServerSideDatasource(server);
      gridOptions.api.setServerSideDatasource(datasource);
    });
});

function getServerSideDatasource(server) {
  return {
    getRows: (params) => {
      // adding delay to simulate real server call
      setTimeout(() => {
        const response = server.getResponse(params.request);

        if (response.success) {
          // call the success callback
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 2000);
    },
  };
}

function getFakeServer(allData) {
  return {
    getResponse: (request) => {
      console.log(
        "asking for rows: " + request.startRow + " to " + request.endRow
      );

      // take a slice of the total rows
      const rowsThisPage = allData.slice(request.startRow, request.endRow);

      // if on or after the last page, work out the last row.
      const lastRow =
        allData.length <= (request.endRow || 0) ? allData.length : -1;

      return {
        success: true,
        rows: rowsThisPage,
        lastRow: lastRow,
      };
    },
  };
}
