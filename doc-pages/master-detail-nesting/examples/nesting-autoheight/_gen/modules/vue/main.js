import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from '@ag-grid-community/vue';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { MenuModule } from '@ag-grid-enterprise/menu';
import Vue from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MasterDetailModule,
  MenuModule,
  ColumnsToolPanelModule,
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
                :defaultColDef="defaultColDef"
                :groupDefaultExpanded="groupDefaultExpanded"
                :masterDetail="true"
                :detailRowAutoHeight="true"
                :detailCellRendererParams="detailCellRendererParams"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'a1', cellRenderer: 'agGroupCellRenderer' },
        { field: 'b1' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
      },
      rowData: null,
      groupDefaultExpanded: null,
      detailCellRendererParams: null,
    };
  },
  created() {
    this.rowData = [
      {
        a1: 'level 1 - 111',
        b1: 'level 1 - 222',
        children: [
          {
            a2: 'level 2 - 333',
            b2: 'level 2 - 444',
            children: [
              { a3: 'level 3 - 5551', b3: 'level 3 - 6661' },
              { a3: 'level 3 - 5552', b3: 'level 3 - 6662' },
              { a3: 'level 3 - 5553', b3: 'level 3 - 6663' },
              { a3: 'level 3 - 5554', b3: 'level 3 - 6664' },
              { a3: 'level 3 - 5555', b3: 'level 3 - 6665' },
              { a3: 'level 3 - 5556', b3: 'level 3 - 6666' },
            ],
          },
        ],
      },
      {
        a1: 'level 1 - 111',
        b1: 'level 1 - 222',
        children: [
          {
            a2: 'level 2 - 333',
            b2: 'level 2 - 444',
            children: [
              { a3: 'level 3 - 5551', b3: 'level 3 - 6661' },
              { a3: 'level 3 - 5552', b3: 'level 3 - 6662' },
              { a3: 'level 3 - 5553', b3: 'level 3 - 6663' },
              { a3: 'level 3 - 5554', b3: 'level 3 - 6664' },
              { a3: 'level 3 - 5555', b3: 'level 3 - 6665' },
              { a3: 'level 3 - 5556', b3: 'level 3 - 6666' },
            ],
          },
        ],
      },
    ];
    this.groupDefaultExpanded = 1;
    this.detailCellRendererParams = {
      // level 2 grid options
      detailGridOptions: {
        columnDefs: [
          { field: 'a2', cellRenderer: 'agGroupCellRenderer' },
          { field: 'b2' },
        ],
        defaultColDef: {
          flex: 1,
        },
        groupDefaultExpanded: 1,
        masterDetail: true,
        detailRowHeight: 240,
        detailRowAutoHeight: true,
        detailCellRendererParams: {
          // level 3 grid options
          detailGridOptions: {
            columnDefs: [
              { field: 'a3', cellRenderer: 'agGroupCellRenderer' },
              { field: 'b3' },
            ],
            defaultColDef: {
              flex: 1,
            },
          },
          getDetailRowData: (params) => {
            params.successCallback(params.data.children);
          },
        },
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.children);
      },
    };
  },
  methods: {
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
