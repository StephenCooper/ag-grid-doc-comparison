import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
  ColDef,
  ColGroupDef,
  GetRowIdFunc,
  GetServerSideStoreParamsParams,
  Grid,
  GridOptions,
  GridReadyEvent,
  IServerSideDatasource,
  IServerSideGetRowsParams,
  ServerSideStoreParams,
  ServerSideStoreType,
} from "ag-grid-community";

const columnDefs: ColDef[] = [
  { field: "productName", rowGroup: true, hide: true },
  { field: "tradeName" },
  { field: "value" },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    width: 250,
    resizable: true,
  },
  getRowId: function (params) {
    return params.data.id;
  },
  rowModelType: "serverSide",
  serverSideStoreType: "full",
  columnDefs: columnDefs,
  animateRows: true,
  purgeClosedRowNodes: true,
  onGridReady: function (params: GridReadyEvent) {
    setupData();

    const dataSource: IServerSideDatasource = {
      getRows: function (params2: IServerSideGetRowsParams) {
        // To make the demo look real, wait for 500ms before returning
        setTimeout(function () {
          const doingTopLevel = params2.request.groupKeys.length == 0;

          if (doingTopLevel) {
            params2.success({
              rowData: products.slice(),
              rowCount: products.length,
            });
          } else {
            const key = params2.request.groupKeys[0];
            let foundProduct: any = undefined;
            products.forEach(function (product) {
              if (product.productName == key) {
                foundProduct = product;
              }
            });
            if (foundProduct) {
              params2.success({ rowData: foundProduct.trades });
            } else {
              params2.fail();
            }
          }
        }, 2000);
      },
    };

    params.api.setServerSideDatasource(dataSource);
  },
  getServerSideStoreParams: function (params) {
    const type = params.level == 0 ? "partial" : "full";
    return {
      storeType: type,
    };
  },
};
const productsNames = ["Palm Oil", "Rubber", "Wool", "Amber", "Copper"];
const products: any[] = [];
let idSequence = 0;

function createOneTrade() {
  return {
    id: idSequence++,
    tradeName: "TRD-" + Math.floor(Math.random() * 20000),
    value: Math.floor(Math.random() * 20000),
  };
}

function setupData() {
  productsNames.forEach(function (productName) {
    const product: any = {
      id: idSequence++,
      productName: productName,
      trades: [],
    };
    products.push(product);
    for (let i = 0; i < 2; i++) {
      product.trades.push(createOneTrade());
    }
  });
}

function onBtNewPalmOil() {
  const transaction = {
    route: ["Palm Oil"],
    add: [createOneTrade()],
  };
  const res = gridOptions.api!.applyServerSideTransaction(transaction);
  console.log("New Palm Oil, result = " + (res && res.status));
}

function onBtNewRubber() {
  const transaction = {
    route: ["Rubber"],
    add: [createOneTrade()],
  };
  const res = gridOptions.api!.applyServerSideTransaction(transaction);
  console.log("New Rubber, result = " + (res && res.status));
}

function onBtNewWoolAmber() {
  const transactions = [];
  transactions.push({
    route: ["Wool"],
    add: [createOneTrade()],
  });
  transactions.push({
    route: ["Amber"],
    add: [createOneTrade()],
  });

  const api = gridOptions.api!;
  transactions.forEach(function (tx) {
    const res = api.applyServerSideTransaction(tx);
    console.log("New " + tx.route[0] + ", result = " + (res && res.status));
  });
}

function onBtNewProduct() {
  const transaction = {
    route: [],
    add: [{ id: idSequence++, productName: "Rice", trades: [] }],
  };
  const res = gridOptions.api!.applyServerSideTransaction(transaction);
  console.log("New Product, result = " + (res && res.status));
}

function onBtStoreState() {
  const storeState = gridOptions.api!.getServerSideStoreState();
  console.log("Store States:");
  storeState.forEach(function (state, index) {
    console.log(
      index +
        " - " +
        JSON.stringify(state).replace(/"/g, "").replace(/,/g, ", ")
    );
  });
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtNewPalmOil = onBtNewPalmOil;
  (<any>window).onBtNewRubber = onBtNewRubber;
  (<any>window).onBtNewWoolAmber = onBtNewWoolAmber;
  (<any>window).onBtNewProduct = onBtNewProduct;
  (<any>window).onBtStoreState = onBtStoreState;
}
