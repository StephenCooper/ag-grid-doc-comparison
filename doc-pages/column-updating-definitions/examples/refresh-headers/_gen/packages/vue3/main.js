import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from 'ag-grid-vue3';
import { createApp } from 'vue';
import CustomHeader from './customHeaderVue.js';

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="test-container">
                <div class="test-header">
                    <button v-on:click="onBtUpperNames()">Upper Header Names</button>
                    <button v-on:click="onBtLowerNames()">Lower Lower Names</button>
                    &nbsp;&nbsp;&nbsp;
                    <button v-on:click="onBtFilterOn()">Filter On</button>
                    <button v-on:click="onBtFilterOff()">Filter Off</button>
                    &nbsp;&nbsp;&nbsp;
                    <button v-on:click="onBtResizeOn()">Resize On</button>
                    <button v-on:click="onBtResizeOff()">Resize Off</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :rowData="rowData"
                :defaultColDef="defaultColDef"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
    CustomHeader,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        headerComponent: 'CustomHeader',
      },
      rowData: null,
    };
  },
  created() {},
  methods: {
    onBtUpperNames() {
      const columnDefs = [
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ];
      columnDefs.forEach(function (c) {
        c.headerName = c.field.toUpperCase();
      });
      this.gridApi.setColumnDefs(columnDefs);
    },
    onBtLowerNames() {
      const columnDefs = [
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ];
      columnDefs.forEach(function (c) {
        c.headerName = c.field;
      });
      this.gridApi.setColumnDefs(columnDefs);
    },
    onBtFilterOn() {
      const columnDefs = [
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ];
      columnDefs.forEach(function (c) {
        c.filter = true;
      });
      this.gridApi.setColumnDefs(columnDefs);
    },
    onBtFilterOff() {
      const columnDefs = [
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ];
      columnDefs.forEach(function (c) {
        c.filter = false;
      });
      this.gridApi.setColumnDefs(columnDefs);
    },
    onBtResizeOn() {
      const columnDefs = [
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ];
      columnDefs.forEach(function (c) {
        c.resizable = true;
      });
      this.gridApi.setColumnDefs(columnDefs);
    },
    onBtResizeOff() {
      const columnDefs = [
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ];
      columnDefs.forEach(function (c) {
        c.resizable = false;
      });
      this.gridApi.setColumnDefs(columnDefs);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        this.rowData = data;
      };

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

createApp(VueExample).mount('#app');
