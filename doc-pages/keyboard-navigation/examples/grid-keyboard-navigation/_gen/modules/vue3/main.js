import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from '@ag-grid-community/vue3';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { createApp } from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  SetFilterModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :rowData="rowData"
                :rowSelection="rowSelection"
                :suppressRowClickSelection="true"
                :defaultColDef="defaultColDef"
                :sideBar="sideBar"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          headerName: ' ',
          headerCheckboxSelection: true,
          checkboxSelection: true,
          floatingFilter: false,
          suppressMenu: true,
          minWidth: 55,
          maxWidth: 55,
          width: 55,
          flex: 0,
          resizable: false,
          sortable: false,
          editable: false,
          filter: false,
          suppressColumnsToolPanel: true,
        },
        {
          headerName: 'Participant',
          children: [
            { field: 'athlete', minWidth: 170 },
            { field: 'country', minWidth: 150 },
          ],
        },
        { field: 'sport' },
        {
          headerName: 'Medals',
          children: [
            {
              field: 'total',
              columnGroupShow: 'closed',
              filter: 'agNumberColumnFilter',
              width: 120,
              flex: 0,
            },
            {
              field: 'gold',
              columnGroupShow: 'open',
              filter: 'agNumberColumnFilter',
              width: 100,
              flex: 0,
            },
            {
              field: 'silver',
              columnGroupShow: 'open',
              filter: 'agNumberColumnFilter',
              width: 100,
              flex: 0,
            },
            {
              field: 'bronze',
              columnGroupShow: 'open',
              filter: 'agNumberColumnFilter',
              width: 100,
              flex: 0,
            },
          ],
        },
        { field: 'year', filter: 'agNumberColumnFilter' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        editable: true,
        sortable: true,
        minWidth: 100,
        filter: true,
        resizable: true,
        floatingFilter: true,
        flex: 1,
      },
      rowSelection: null,
      sideBar: null,
      rowData: null,
    };
  },
  created() {
    this.rowSelection = 'multiple';
    this.sideBar = { toolPanels: ['columns', 'filters'], defaultToolPanel: '' };
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
