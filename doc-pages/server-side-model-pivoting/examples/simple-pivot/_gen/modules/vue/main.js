
import Vue from 'vue';
import { AgGridVue } from '@ag-grid-community/vue';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule, RowGroupingModule, MenuModule, ColumnsToolPanelModule])



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
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"
                :pivotMode="true"
                :animateRows="true"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"country",
rowGroup:true},{field:"year",
pivot:true},{field:"total",
aggFunc:"sum"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 4,
    minWidth: 100,
    resizable: true,
},
            autoGroupColumnDef: null,
rowModelType: null,
serverSideStoreType: null
        }
    },
    created() {
        this.autoGroupColumnDef = {
    flex: 5,
    minWidth: 200,
};
this.rowModelType = 'serverSide';
this.serverSideStoreType = 'partial'
    },
    methods: {
        onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        

        
            const updateData = (data) => {
    // setup the fake server with entire dataset
    var fakeServer = new FakeServer(data);
    // create datasource with a reference to the fake server
    var datasource = getServerSideDatasource(fakeServer);
    // register the datasource with the grid
    params.api.setServerSideDatasource(datasource);
};
            
            fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => updateData(data));
    },
    }
}

window.getServerSideDatasource = function getServerSideDatasource(server) {
    return {
        getRows: function (params) {
            console.log('[Datasource] - rows requested by grid: ', params.request);
            // get data for request from our fake server
            var response = server.getData(params.request);
            // add pivot colDefs in the grid based on the resulting data
            addPivotColDefs(response, params.columnApi);
            // simulating real server call with a 500ms delay
            setTimeout(function () {
                if (response.success) {
                    // supply data to grid
                    params.success({ rowData: response.rows, rowCount: response.lastRow });
                }
                else {
                    params.fail();
                }
            }, 500);
        },
    };
}

window.addPivotColDefs = function addPivotColDefs(response, columnApi) {
    // check if pivot colDefs already exist
    var existingPivotColDefs = columnApi.getSecondaryColumns();
    if (existingPivotColDefs && existingPivotColDefs.length > 0) {
        return;
    }
    // create colDefs
    var pivotColDefs = response.pivotFields.map(function (field) {
        var headerName = field.split('_')[0];
        return { headerName: headerName, field: field };
    });
    // supply secondary columns to the grid
    columnApi.setSecondaryColumns(pivotColDefs);
}

new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
