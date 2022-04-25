import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue';
import Vue from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div>
                    <div class="button-group">
                        <button v-on:click="saveFilterModel()">Save Filter Model</button>
                        <button v-on:click="restoreFilterModel()">Restore Saved Filter Model</button>
                        <button v-on:click="restoreFromHardCoded()" title="Name = 'Mich%', Country = ['Ireland', 'United States'], Age < 30, Date < 01/01/2010">
                            Set Custom Filter Model
                        </button>
                        <button v-on:click="clearFilters()">Reset Filters</button>
                        <button v-on:click="destroyFilter()">Destroy Filter</button>
                    </div>
                </div>
                <div>
                    <div class="button-group">
                        Saved Filters: <span id="savedFilters">(none)</span>
                    </div>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
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
        { field: 'athlete', filter: 'agTextColumnFilter' },
        { field: 'age', filter: 'agNumberColumnFilter', maxWidth: 100 },
        { field: 'country' },
        { field: 'year', maxWidth: 100 },
        {
          field: 'date',
          filter: 'agDateColumnFilter',
          filterParams: filterParams,
        },
        { field: 'sport' },
        { field: 'gold', filter: 'agNumberColumnFilter' },
        { field: 'silver', filter: 'agNumberColumnFilter' },
        { field: 'bronze', filter: 'agNumberColumnFilter' },
        { field: 'total', filter: 'agNumberColumnFilter' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
        sortable: true,
      },
      sideBar: null,
      rowData: null,
    };
  },
  created() {
    this.sideBar = 'filters';
  },
  methods: {
    clearFilters() {
      this.gridApi.setFilterModel(null);
    },
    saveFilterModel() {
      savedFilterModel = this.gridApi.getFilterModel();
      var keys = Object.keys(savedFilterModel);
      var savedFilters = keys.length > 0 ? keys.join(', ') : '(none)';
      document.querySelector('#savedFilters').innerHTML = savedFilters;
    },
    restoreFilterModel() {
      this.gridApi.setFilterModel(savedFilterModel);
    },
    restoreFromHardCoded() {
      var hardcodedFilter = {
        country: {
          type: 'set',
          values: ['Ireland', 'United States'],
        },
        age: { type: 'lessThan', filter: '30' },
        athlete: { type: 'startsWith', filter: 'Mich' },
        date: { type: 'lessThan', dateFrom: '2010-01-01' },
      };
      this.gridApi.setFilterModel(hardcodedFilter);
    },
    destroyFilter() {
      this.gridApi.destroyFilter('athlete');
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      params.api.getToolPanelInstance('filters').expandFilters();

      const updateData = (data) => params.api.setRowData(data);

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

var filterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('/');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  // browserDatePicker: true,
};

var savedFilterModel = null;

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
