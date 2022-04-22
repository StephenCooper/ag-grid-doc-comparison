import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue3';
import { createApp } from 'vue';
import ClickableStatusBarComponent from './clickableStatusBarComponentVue.js';
import CountStatusBarComponent from './countStatusBarComponentVue.js';

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :enableRangeSelection="true"
                :rowSelection="rowSelection"
                :statusBar="statusBar"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
    CountStatusBarComponent,
    ClickableStatusBarComponent,
  },
  data: function () {
    return {
      columnDefs: [{ field: 'row' }, { field: 'name' }],
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
      rowData: null,
      rowSelection: null,
      statusBar: null,
    };
  },
  created() {
    this.rowData = [
      { row: 'Row 1', name: 'Michael Phelps' },
      { row: 'Row 2', name: 'Natalie Coughlin' },
      { row: 'Row 3', name: 'Aleksey Nemov' },
      { row: 'Row 4', name: 'Alicia Coutts' },
      { row: 'Row 5', name: 'Missy Franklin' },
      { row: 'Row 6', name: 'Ryan Lochte' },
      { row: 'Row 7', name: 'Allison Schmitt' },
      { row: 'Row 8', name: 'Natalie Coughlin' },
      { row: 'Row 9', name: 'Ian Thorpe' },
      { row: 'Row 10', name: 'Bob Mill' },
      { row: 'Row 11', name: 'Willy Walsh' },
      { row: 'Row 12', name: 'Sarah McCoy' },
      { row: 'Row 13', name: 'Jane Jack' },
      { row: 'Row 14', name: 'Tina Wills' },
    ];
    this.rowSelection = 'multiple';
    this.statusBar = {
      statusPanels: [
        { statusPanel: 'CountStatusBarComponent' },
        { statusPanel: 'ClickableStatusBarComponent' },
        {
          statusPanel: 'agAggregationComponent',
          statusPanelParams: { aggFuncs: ['count', 'sum'] },
        },
      ],
    };
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      params.api.sizeColumnsToFit();
    },
  },
};

createApp(VueExample).mount('#app');
