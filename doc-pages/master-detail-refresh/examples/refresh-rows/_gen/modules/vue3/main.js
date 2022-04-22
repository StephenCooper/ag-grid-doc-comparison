import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from '@ag-grid-community/vue3';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { createApp } from 'vue';

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
                :defaultColDef="defaultColDef"
                :getRowId="getRowId"
                :masterDetail="true"
                :enableCellChangeFlash="true"
                :detailCellRendererParams="detailCellRendererParams"
                :rowData="rowData"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'name', cellRenderer: 'agGroupCellRenderer' },
        { field: 'account' },
        { field: 'calls' },
        { field: 'minutes', valueFormatter: "x.toLocaleString() + 'm'" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
      },
      getRowId: null,
      detailCellRendererParams: null,
      rowData: null,
    };
  },
  created() {
    this.getRowId = (params) => {
      return params.data.account;
    };
    this.detailCellRendererParams = {
      refreshStrategy: 'rows',
      template: (params) => {
        return `<div class="ag-details-row ag-details-row-fixed-height">
            <div style="padding: 4px; font-weight: bold;">${params.data.name} ${params.data.calls} calls</div>
            <div ref="eDetailGrid" class="ag-details-grid ag-details-grid-fixed-height"/>
         </div>`;
      },
      detailGridOptions: {
        rowSelection: 'multiple',
        enableCellChangeFlash: true,
        getRowId: (params) => {
          return params.data.callId;
        },
        columnDefs: [
          { field: 'callId', checkboxSelection: true },
          { field: 'direction' },
          { field: 'number', minWidth: 150 },
          { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
          { field: 'switchCode', minWidth: 150 },
        ],
        defaultColDef: {
          flex: 1,
          sortable: true,
        },
      },
      getDetailRowData: (params) => {
        // params.successCallback([]);
        params.successCallback(params.data.callRecords);
      },
    };
  },
  methods: {
    onFirstDataRendered(params) {
      // arbitrarily expand a row for presentational purposes
      setTimeout(function () {
        params.api.getDisplayedRowAtIndex(0).setExpanded(true);
      }, 0);
      setInterval(function () {
        if (!allRowData) {
          return;
        }
        const data = allRowData[0];
        const newCallRecords = [];
        data.callRecords.forEach(function (record, index) {
          newCallRecords.push({
            name: record.name,
            callId: record.callId,
            duration: record.duration + (index % 2),
            switchCode: record.switchCode,
            direction: record.direction,
            number: record.number,
          });
        });
        data.callRecords = newCallRecords;
        data.calls++;
        const tran = {
          update: [data],
        };
        params.api.applyTransaction(tran);
      }, 2000);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        allRowData = data;
        this.rowData = data;
      };

      fetch('https://www.ag-grid.com/example-assets/master-detail-data.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

let allRowData;

createApp(VueExample).mount('#app');
