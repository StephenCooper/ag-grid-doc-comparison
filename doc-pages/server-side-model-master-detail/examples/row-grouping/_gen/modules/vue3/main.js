
import { createApp } from 'vue';
import { AgGridVue } from '@ag-grid-community/vue3';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule, ClientSideRowModelModule, MasterDetailModule, RowGroupingModule, MenuModule, ColumnsToolPanelModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :animateRows="true"
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"
                :masterDetail="true"
                :detailCellRendererParams="detailCellRendererParams"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"country",
rowGroup:true,
hide:true},{field:"accountId",
hide:true},{field:"name"},{field:"calls"},{field:"totalDuration"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
},
            autoGroupColumnDef: null,
rowModelType: null,
serverSideStoreType: null,
detailCellRendererParams: null
        }
    },
    created() {
        this.autoGroupColumnDef = {
    field: 'accountId',
};
this.rowModelType = 'serverSide';
this.serverSideStoreType = 'partial';
this.detailCellRendererParams = {
    detailGridOptions: {
        columnDefs: [
            { field: 'callId' },
            { field: 'direction' },
            { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
            { field: 'switchCode' },
            { field: 'number' },
        ],
        defaultColDef: {
            flex: 1,
        },
    },
    getDetailRowData: (params) => {
        // supply details records to detail cell renderer (i.e. detail grid)
        params.successCallback(params.data.callRecords);
    },
}
    },
    methods: {
        onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        

        
    setTimeout(function () {
        // expand some master row
        var someRow = params.api.getRowNode('1');
        if (someRow) {
            someRow.setExpanded(true);
        }
    }, 1000);

        
            const updateData = (data) => {
    // setup the fake server with entire dataset
    var fakeServer = new FakeServer(data);
    // create datasource with a reference to the fake server
    var datasource = getServerSideDatasource(fakeServer);
    // register the datasource with the grid
    params.api.setServerSideDatasource(datasource);
};
            
            fetch('https://www.ag-grid.com/example-assets/call-data.json')
                .then(resp => resp.json())
                .then(data => updateData(data));
    },
    }
}

window.getServerSideDatasource = function getServerSideDatasource(server) {
    return {
        getRows: function (params) {
            console.log('[Datasource] - rows requested by grid: ', params.request);
            var response = server.getData(params.request);
            // adding delay to simulate real server call
            setTimeout(function () {
                if (response.success) {
                    // call the success callback
                    params.success({ rowData: response.rows, rowCount: response.lastRow });
                }
                else {
                    // inform the grid request failed
                    params.fail();
                }
            }, 200);
        },
    };
}

createApp(VueExample)
    .mount("#app")

