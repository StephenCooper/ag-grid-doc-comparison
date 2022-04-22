import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from '@ag-grid-community/vue3';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { createApp } from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div>
                    <span class="button-group">
                        <button v-on:click="showPivotModeSection()">Show Pivot Mode Section</button>
                        <button v-on:click="showRowGroupsSection()">Show Row Groups Section</button>
                        <button v-on:click="showValuesSection()">Show Values Section</button>
                        <button v-on:click="showPivotSection()">Show Pivot Section</button>
                    </span>
                    
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
        { headerName: 'Name', field: 'athlete', minWidth: 200 },
        { field: 'age', enableRowGroup: true },
        { field: 'country', minWidth: 200 },
        { field: 'year' },
        { field: 'date', suppressColumnsToolPanel: true, minWidth: 180 },
        { field: 'sport', minWidth: 200 },
        { field: 'gold', aggFunc: 'sum' },
        { field: 'silver', aggFunc: 'sum' },
        { field: 'bronze', aggFunc: 'sum' },
        { field: 'total', aggFunc: 'sum' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: true,
        enablePivot: true,
      },
      sideBar: null,
      rowData: null,
    };
  },
  created() {
    this.sideBar = {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          toolPanelParams: {
            suppressRowGroups: true,
            suppressValues: true,
            suppressPivots: true,
            suppressPivotMode: true,
            suppressColumnFilter: true,
            suppressColumnSelectAll: true,
            suppressColumnExpandAll: true,
          },
        },
      ],
      defaultToolPanel: 'columns',
    };
  },
  methods: {
    showPivotModeSection() {
      var columnToolPanel = this.gridApi.getToolPanelInstance('columns');
      columnToolPanel.setPivotModeSectionVisible(true);
    },
    showRowGroupsSection() {
      var columnToolPanel = this.gridApi.getToolPanelInstance('columns');
      columnToolPanel.setRowGroupsSectionVisible(true);
    },
    showValuesSection() {
      var columnToolPanel = this.gridApi.getToolPanelInstance('columns');
      columnToolPanel.setValuesSectionVisible(true);
    },
    showPivotSection() {
      var columnToolPanel = this.gridApi.getToolPanelInstance('columns');
      columnToolPanel.setPivotSectionVisible(true);
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
