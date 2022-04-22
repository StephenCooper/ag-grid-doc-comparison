import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from '@ag-grid-community/vue3';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { createApp } from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div class="example-header">
                    <span class="legend-item ag-row-level-0"></span>
                    <span class="legend-label">Top Level Group</span>
                    <span class="legend-item ag-row-level-1"></span>
                    <span class="legend-label">Second Level Group</span>
                    <span class="legend-item ag-row-level-2"></span>
                    <span class="legend-label">Bottom Rows</span>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :groupDisplayType="groupDisplayType"
                :groupHideOpenParents="true"
                :enableRangeSelection="true"
                :animateRows="true"
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
        {
          headerName: 'Country',
          showRowGroup: 'country',
          cellRenderer: 'agGroupCellRenderer',
          minWidth: 200,
        },
        {
          headerName: 'Year',
          valueGetter: (params) => {
            if (params.data) {
              return params.data.year;
            }
          },
          showRowGroup: 'year',
          cellRenderer: 'agGroupCellRenderer',
        },
        { field: 'athlete', minWidth: 200 },
        { field: 'gold', aggFunc: 'sum' },
        { field: 'silver', aggFunc: 'sum' },
        { field: 'bronze', aggFunc: 'sum' },
        { field: 'total', aggFunc: 'sum' },
        { field: 'country', rowGroup: true, hide: true },
        { field: 'year', rowGroup: true, hide: true },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        sortable: true,
        resizable: true,
      },
      groupDisplayType: null,
      rowData: null,
    };
  },
  created() {
    this.groupDisplayType = 'custom';
  },
  methods: {
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
