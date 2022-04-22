import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue3';
import { createApp } from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="test-container" style="height:100%; display: flex; flex-direction: column">
                <div class="test-header">
                    <div style="margin-bottom: 10px">
                        <button v-on:click="clearFilter()">Clear Filters</button>
                    </div>
                    <div>Primary Column Filters</div>
                    <div style="margin-bottom: 10px">
                        <div style="margin-bottom: 5px">
                            <button v-on:click="filterUsRussiaAustralia()">Country: US, Russia &amp; Australia</button>
                            <button v-on:click="filterCanadaNorwayChinaZimbabweNetherlands()">Country: Canada, Norway, China, Zimbabwe &amp; Netherlands</button>
                        </div>
                        <div style="margin-bottom: 5px">
                            <button v-on:click="filter20042006()">Year: 2004 &amp; 2006</button>
                            <button v-on:click="filter200820102012()">Year: 2008, 2010 &amp; 2012</button>
                            <button v-on:click="filterClearYears()">Year: Clear filter</button>
                        </div>
                        <div>
                            <button v-on:click="filterSwimmingHockey()">Sport: Swimming &amp; Hockey</button>
                            <button v-on:click="filterHockeyIceHockey()">Sport: Hockey &amp; Ice Hockey</button>
                        </div>
                    </div>
                    <div>Secondary Column Filters</div>
                    <div style="margin-bottom: 10px">
                        <div style="margin-bottom: 5px">
                            <button v-on:click="filterEveryYearGold()">All gold: &gt; 0</button>
                            <button v-on:click="filter2000Silver()">Year 2000, Silver: Not blank</button>
                        </div>
                    </div>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :processSecondaryColDef="processSecondaryColDef"
                :pivotMode="true"
                :sideBar="sideBar"
                :rowData="rowData"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'country', rowGroup: true, enableRowGroup: true },
        { field: 'year', pivot: true, enablePivot: true },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold', aggFunc: 'sum' },
        { field: 'silver', aggFunc: 'sum' },
        { field: 'bronze', aggFunc: 'sum' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
        floatingFilter: true,
        sortable: true,
        resizable: true,
      },
      processSecondaryColDef: null,
      sideBar: null,
      rowData: null,
    };
  },
  created() {
    this.processSecondaryColDef = (colDef) => {
      colDef.filter = 'agNumberColumnFilter';
      colDef.floatingFilter = true;
    };
    this.sideBar = 'filters';
  },
  methods: {
    clearFilter() {
      this.gridApi.setFilterModel(null);
    },
    filterUsRussiaAustralia() {
      this.gridApi.setFilterModel({
        ...this.gridApi.getFilterModel(),
        country: {
          type: 'set',
          values: ['United States', 'Russia', 'Australia'],
        },
      });
    },
    filterCanadaNorwayChinaZimbabweNetherlands() {
      this.gridApi.setFilterModel({
        ...this.gridApi.getFilterModel(),
        country: {
          type: 'set',
          values: ['Canada', 'Norway', 'China', 'Zimbabwe', 'Netherlands'],
        },
      });
    },
    filter20042006() {
      this.gridApi.setFilterModel({
        ...this.gridApi.getFilterModel(),
        year: {
          type: 'set',
          values: ['2004', '2006'],
        },
      });
    },
    filter200820102012() {
      this.gridApi.setFilterModel({
        ...this.gridApi.getFilterModel(),
        year: {
          type: 'set',
          values: ['2008', '2010', '2012'],
        },
      });
    },
    filterClearYears() {
      this.gridApi.setFilterModel({
        ...this.gridApi.getFilterModel(),
        year: undefined,
      });
    },
    filterSwimmingHockey() {
      this.gridApi.setFilterModel({
        ...this.gridApi.getFilterModel(),
        sport: {
          type: 'set',
          values: ['Swimming', 'Hockey'],
        },
      });
    },
    filterHockeyIceHockey() {
      this.gridApi.setFilterModel({
        ...this.gridApi.getFilterModel(),
        sport: {
          type: 'set',
          values: ['Hockey', 'Ice Hockey'],
        },
      });
    },
    filterEveryYearGold() {
      const goldPivotCols = this.gridColumnApi
        .getSecondaryColumns()
        .filter(
          (col) => col.getColDef().pivotValueColumn.getColId() === 'gold'
        );
      if (goldPivotCols) {
        const newOpts = goldPivotCols.reduce((acc, col) => {
          acc[col.getId()] = {
            filter: 0,
            filterType: 'number',
            type: 'greaterThan',
          };
          return acc;
        }, this.gridApi.getFilterModel() || {});
        this.gridApi.setFilterModel(newOpts);
      }
    },
    filter2000Silver() {
      const targetCol = this.gridColumnApi.getSecondaryPivotColumn(
        ['2000'],
        'silver'
      );
      if (targetCol) {
        this.gridApi.setFilterModel({
          ...this.gridApi.getFilterModel(),
          [targetCol.getId()]: {
            filterType: 'number',
            type: 'notBlank',
          },
        });
      }
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => params.api.setRowData(data);

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

createApp(VueExample).mount('#app');
