import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue';
import Vue from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <div style="height: 100%; display: flex; flex-direction: column;">
                <div>
                    <span class="button-group">
                        <button v-on:click="irelandAndUk()">Ireland &amp; UK</button>
                        <button v-on:click="endingStan()">Countries Ending 'stan'</button>
                        <button v-on:click="printCountryModel()">Print Country</button>
                        <button v-on:click="clearCountryFilter()">Clear Country</button>
                        <button v-on:click="destroyCountryFilter()">Destroy Country</button>
                    </span>
                    <span class="button-group">
                        <button v-on:click="ageBelow25()">Age Below 25</button>
                        <button v-on:click="ageAbove30()">Age Above 30</button>
                        <button v-on:click="ageBelow25OrAbove30()">Age Below 25 or Above 30</button>
                        <button v-on:click="ageBetween25And30()">Age Between 25 and 30</button>
                        <button v-on:click="clearAgeFilter()">Clear Age Filter</button>
                    </span>
                    <span class="button-group">
                        <button v-on:click="after2010()">Date after 01/01/2010</button>
                        <button v-on:click="before2012()">Date before 01/01/2012</button>
                        <button v-on:click="dateCombined()">Date combined</button>
                        <button v-on:click="clearDateFilter()">Clear Date Filter</button>
                    </span>
                    <span class="button-group">
                        <button v-on:click="sportStartsWithS()">Sport starts with S</button>
                        <button v-on:click="sportEndsWithG()">Sport ends with G</button>
                        <button v-on:click="sportsCombined()">Sport starts with S and ends with G</button>
                    </span>
                </div>
                <div style="flex-grow: 1; height: 10px;">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"></ag-grid-vue>
                </div>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'athlete', filter: PersonFilter, suppressMenu: true },
        { field: 'age', filter: 'agNumberColumnFilter', suppressMenu: true },
        { field: 'country', filter: 'agSetColumnFilter', suppressMenu: true },
        {
          field: 'year',
          maxWidth: 120,
          filter: 'agNumberColumnFilter',
          floatingFilter: false,
        },
        {
          field: 'date',
          minWidth: 215,
          filter: 'agDateColumnFilter',
          filterParams: dateFilterParams,
          suppressMenu: true,
        },
        { field: 'sport', suppressMenu: true, filter: 'agTextColumnFilter' },
        {
          field: 'gold',
          filter: 'agNumberColumnFilter',
          filterParams: { buttons: ['apply'] },
          suppressMenu: true,
        },
        {
          field: 'silver',
          filter: 'agNumberColumnFilter',
          floatingFilterComponentParams: { suppressFilterButton: true },
        },
        {
          field: 'bronze',
          filter: 'agNumberColumnFilter',
          floatingFilterComponentParams: { suppressFilterButton: true },
        },
        { field: 'total', filter: false },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
        sortable: true,
        floatingFilter: true,
      },
      rowData: null,
    };
  },
  created() {},
  methods: {
    irelandAndUk() {
      var countryFilterComponent = this.gridApi.getFilterInstance('country');
      countryFilterComponent.setModel({ values: ['Ireland', 'Great Britain'] });
      this.gridApi.onFilterChanged();
    },
    clearCountryFilter() {
      var countryFilterComponent = this.gridApi.getFilterInstance('country');
      countryFilterComponent.setModel(null);
      this.gridApi.onFilterChanged();
    },
    destroyCountryFilter() {
      this.gridApi.destroyFilter('country');
    },
    endingStan() {
      var countryFilterComponent = this.gridApi.getFilterInstance('country');
      var countriesEndingWithStan = countryFilterComponent
        .getValues()
        .filter(function (value) {
          return value.indexOf('stan') === value.length - 4;
        });
      countryFilterComponent.setModel({ values: countriesEndingWithStan });
      this.gridApi.onFilterChanged();
    },
    printCountryModel() {
      var countryFilterComponent = this.gridApi.getFilterInstance('country');
      var model = countryFilterComponent.getModel();
      if (model) {
        console.log('Country model is: ' + JSON.stringify(model));
      } else {
        console.log('Country model filter is not active');
      }
    },
    sportStartsWithS() {
      var sportsFilterComponent = this.gridApi.getFilterInstance('sport');
      sportsFilterComponent.setModel({
        type: 'startsWith',
        filter: 's',
      });
      this.gridApi.onFilterChanged();
    },
    sportEndsWithG() {
      var sportsFilterComponent = this.gridApi.getFilterInstance('sport');
      sportsFilterComponent.setModel({
        type: 'endsWith',
        filter: 'g',
      });
      this.gridApi.onFilterChanged();
    },
    sportsCombined() {
      var sportsFilterComponent = this.gridApi.getFilterInstance('sport');
      sportsFilterComponent.setModel({
        condition2: {
          type: 'endsWith',
          filter: 'g',
        },
        operator: 'AND',
        condition1: {
          type: 'startsWith',
          filter: 's',
        },
      });
      this.gridApi.onFilterChanged();
    },
    ageBelow25() {
      var ageFilterComponent = this.gridApi.getFilterInstance('age');
      ageFilterComponent.setModel({
        type: 'lessThan',
        filter: 25,
        filterTo: null,
      });
      this.gridApi.onFilterChanged();
    },
    ageAbove30() {
      var ageFilterComponent = this.gridApi.getFilterInstance('age');
      ageFilterComponent.setModel({
        type: 'greaterThan',
        filter: 30,
        filterTo: null,
      });
      this.gridApi.onFilterChanged();
    },
    ageBelow25OrAbove30() {
      var ageFilterComponent = this.gridApi.getFilterInstance('age');
      ageFilterComponent.setModel({
        condition1: {
          type: 'greaterThan',
          filter: 30,
          filterTo: null,
        },
        operator: 'OR',
        condition2: {
          type: 'lessThan',
          filter: 25,
          filterTo: null,
        },
      });
      this.gridApi.onFilterChanged();
    },
    ageBetween25And30() {
      var ageFilterComponent = this.gridApi.getFilterInstance('age');
      ageFilterComponent.setModel({
        type: 'inRange',
        filter: 25,
        filterTo: 30,
      });
      this.gridApi.onFilterChanged();
    },
    clearAgeFilter() {
      var ageFilterComponent = this.gridApi.getFilterInstance('age');
      ageFilterComponent.setModel(null);
      this.gridApi.onFilterChanged();
    },
    after2010() {
      var dateFilterComponent = this.gridApi.getFilterInstance('date');
      dateFilterComponent.setModel({
        type: 'greaterThan',
        dateFrom: '2010-01-01',
        dateTo: null,
      });
      this.gridApi.onFilterChanged();
    },
    before2012() {
      var dateFilterComponent = this.gridApi.getFilterInstance('date');
      dateFilterComponent.setModel({
        type: 'lessThan',
        dateFrom: '2012-01-01',
        dateTo: null,
      });
      this.gridApi.onFilterChanged();
    },
    dateCombined() {
      var dateFilterComponent = this.gridApi.getFilterInstance('date');
      dateFilterComponent.setModel({
        condition1: {
          type: 'lessThan',
          dateFrom: '2012-01-01',
          dateTo: null,
        },
        operator: 'OR',
        condition2: {
          type: 'greaterThan',
          dateFrom: '2010-01-01',
          dateTo: null,
        },
      });
      this.gridApi.onFilterChanged();
    },
    clearDateFilter() {
      var dateFilterComponent = this.gridApi.getFilterInstance('date');
      dateFilterComponent.setModel(null);
      this.gridApi.onFilterChanged();
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

var dateFilterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
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
  browserDatePicker: true,
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
