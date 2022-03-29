import { createApp } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

class CustomAgeFilter {
  constructor() {
    CustomAgeFilter.prototype.__init.call(this);
  }

  __init() {
    this.filterValue = null;
  }

  init(params) {
    this.eGui = document.createElement("div");
    this.eGui.innerHTML = `<div>  
          <label>    
              <input type="radio" name="ageFilterValue" ref="btAll" checked/> All  
          </label>  
          <label>    
              <input type="radio" name="ageFilterValue" ref="bt20"/> 20  
          </label>  
          <label>    
              <input type="radio" name="ageFilterValue" ref="bt22"/> 22  
          </label>
        </div>`;

    this.filterValue = null;
    this.params = params;

    // var that = this;

    this.eGui
      .querySelector('[ref="btAll"]')
      .addEventListener("change", this.onSelection.bind(this, null));
    this.eGui
      .querySelector('[ref="bt20"]')
      .addEventListener("change", this.onSelection.bind(this, 20));
    this.eGui
      .querySelector('[ref="bt22"]')
      .addEventListener("change", this.onSelection.bind(this, 22));
  }

  onSelection(value) {
    this.filterValue = value;
    this.params.filterChangedCallback();
  }

  getGui() {
    return this.eGui;
  }

  isFilterActive() {
    return this.filterValue !== null;
  }

  doesFilterPass(params) {
    // not needed for server side filtering
    const { api, colDef, column, columnApi, context } = this.params;
    const { node } = params;
    const value = this.params.valueGetter({
      api,
      colDef,
      column,
      columnApi,
      context,
      data: node.data,
      getValue: (field) => node.data[field],
      node,
    });
    return value == this.filterValue;
  }

  getModel() {
    if (this.filterValue === null) {
      return null;
    } else {
      // the format of what you return depends on your server side, just
      // return something that your server side can work with.
      return {
        filter: this.filterValue,
        type: "equals",
      };
    }
  }

  setModel(model) {
    if (model && model.filter === 20) {
      this.eGui.querySelector('[ref="bt20"]').checked = true;
      this.filterValue = 20;
    } else if (model && model.filter === 22) {
      this.eGui.querySelector('[ref="bt22"]').checked = true;
      this.filterValue = 22;
    } else {
      this.eGui.querySelector('[ref="btAll"]').checked = true;
      this.filterValue = null;
    }
  }
}

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"
                :rowGroupPanelShow="rowGroupPanelShow"
                :pivotPanelShow="pivotPanelShow"
                :animateRows="true"
                :debug="true"
                :enableRangeSelection="true"
                :sideBar="true"
                :suppressAggFuncInHeader="true"
                :maxConcurrentDatasourceRequests="maxConcurrentDatasourceRequests"
                :cacheBlockSize="cacheBlockSize"
                :maxBlocksInCache="maxBlocksInCache"
                :purgeClosedRowNodes="true"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          field: "athlete",
          enableRowGroup: true,
          enablePivot: true,
          filter: false,
        },
        { field: "age", enableRowGroup: true, filter: CustomAgeFilter },
        {
          field: "country",
          enableRowGroup: true,
          enablePivot: true,
          rowGroup: true,
          hide: true,
          filter: "agSetColumnFilter",
          filterParams: { values: countries },
        },
        {
          field: "year",
          enableRowGroup: true,
          enablePivot: true,
          rowGroup: true,
          hide: true,
          filter: "agSetColumnFilter",
          filterParams: {
            values: ["2000", "2002", "2004", "2006", "2008", "2010", "2012"],
          },
        },
        {
          field: "sport",
          enableRowGroup: true,
          enablePivot: true,
          filter: false,
        },
        { field: "gold", aggFunc: "sum", filter: false, enableValue: true },
        { field: "silver", aggFunc: "sum", filter: false, enableValue: true },
        { field: "bronze", aggFunc: "sum", filter: false, enableValue: true },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        // restrict what aggregation functions the columns can have,
        // include a custom function 'random' that just returns a
        // random number
        allowedAggFuncs: ["sum", "min", "max", "random"],
        sortable: true,
        resizable: true,
        filter: true,
      },
      autoGroupColumnDef: null,
      rowModelType: null,
      serverSideStoreType: null,
      rowGroupPanelShow: null,
      pivotPanelShow: null,
      maxConcurrentDatasourceRequests: null,
      cacheBlockSize: null,
      maxBlocksInCache: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      width: 180,
    };
    this.rowModelType = "serverSide";
    this.serverSideStoreType = "partial";
    this.rowGroupPanelShow = "always";
    this.pivotPanelShow = "always";
    this.maxConcurrentDatasourceRequests = 1;
    this.cacheBlockSize = 100;
    this.maxBlocksInCache = 2;
  },
  methods: {
    onFirstDataRendered(params) {
      params.api.sizeColumnsToFit();
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        const fakeServer = createFakeServer(data);
        const datasource = createServerSideDatasource(fakeServer, params);
        params.api.setServerSideDatasource(datasource);
      };

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

const countries = getCountries();

createApp(VueExample).mount("#app");
