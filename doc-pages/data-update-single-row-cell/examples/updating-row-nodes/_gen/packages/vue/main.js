import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from 'ag-grid-vue';
import Vue from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 1rem;">
                    <button v-on:click="setPriceOnToyota()">Set Price on Toyota</button>
                    <button v-on:click="setDataOnFord()">Set Data on Ford</button>
                    <button v-on:click="updateSort()" style="margin-left: 15px">Sort</button>
                    <button v-on:click="updateFilter()">Filter</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :rowData="rowData"
                :defaultColDef="defaultColDef"
                :animateRows="true"
                :getRowId="getRowId"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'make' },
        { field: 'model' },
        { field: 'price', filter: 'agNumberColumnFilter' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        editable: true,
        sortable: true,
        filter: true,
      },
      rowData: null,
      getRowId: null,
    };
  },
  created() {
    this.rowData = [
      { id: 'aa', make: 'Toyota', model: 'Celica', price: 35000 },
      { id: 'bb', make: 'Ford', model: 'Mondeo', price: 32000 },
      { id: 'cc', make: 'Porsche', model: 'Boxster', price: 72000 },
      { id: 'dd', make: 'BMW', model: '5 Series', price: 59000 },
      { id: 'ee', make: 'Dodge', model: 'Challanger', price: 35000 },
      { id: 'ff', make: 'Mazda', model: 'MX5', price: 28000 },
      { id: 'gg', make: 'Horse', model: 'Outside', price: 99000 },
    ];
    this.getRowId = (params) => {
      return params.data.id;
    };
  },
  methods: {
    updateSort() {
      this.gridApi.refreshClientSideRowModel('sort');
    },
    updateFilter() {
      this.gridApi.refreshClientSideRowModel('filter');
    },
    setPriceOnToyota() {
      var rowNode = this.gridApi.getRowNode('aa');
      var newPrice = Math.floor(Math.random() * 100000);
      rowNode.setDataValue('price', newPrice);
    },
    setDataOnFord() {
      var rowNode = this.gridApi.getRowNode('bb');
      var newPrice = Math.floor(Math.random() * 100000);
      var newModel = 'T-' + Math.floor(Math.random() * 1000);
      var newData = {
        id: 'bb',
        make: 'Ford',
        model: newModel,
        price: newPrice,
      };
      rowNode.setData(newData);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
