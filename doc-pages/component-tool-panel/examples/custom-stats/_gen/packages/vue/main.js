import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue';
import Vue from 'vue';
import CustomStatsToolPanel from './customStatsToolPanelVue.js';

const VueExample = {
  template: `
        <div style="height: 100%">
            <div style="height: 100%; box-sizing: border-box;">
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :icons="icons"
                :sideBar="sideBar"
                :rowData="rowData"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
    CustomStatsToolPanel,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'athlete', width: 150, filter: 'agTextColumnFilter' },
        { field: 'age', width: 90 },
        { field: 'country', width: 120 },
        { field: 'year', width: 90 },
        { field: 'date', width: 110 },
        { field: 'gold', width: 100, filter: false },
        { field: 'silver', width: 100, filter: false },
        { field: 'bronze', width: 100, filter: false },
        { field: 'total', width: 100, filter: false },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
      icons: null,
      sideBar: null,
      rowData: null,
    };
  },
  created() {
    this.icons = {
      'custom-stats': '<span class="ag-icon ag-icon-custom-stats"></span>',
    };
    this.sideBar = {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
        },
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
        },
        {
          id: 'customStats',
          labelDefault: 'Custom Stats',
          labelKey: 'customStats',
          iconKey: 'custom-stats',
          toolPanel: 'CustomStatsToolPanel',
        },
      ],
      defaultToolPanel: 'customStats',
    };
  },
  methods: {
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

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
