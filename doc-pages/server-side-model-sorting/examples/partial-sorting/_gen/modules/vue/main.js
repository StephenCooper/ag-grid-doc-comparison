
import Vue from 'vue';
import { AgGridVue } from '@ag-grid-community/vue';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"
                :animateRows="true"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"athlete",
minWidth:220},{field:"country",
minWidth:200},{field:"year"},{field:"sport",
minWidth:200},{field:"gold"},{field:"silver"},{field:"bronze"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    // all columns have sorting enabled
    sortable: true,
    flex: 1,
    minWidth: 100,
    resizable: true,
},
            rowModelType: null,
serverSideStoreType: null
        }
    },
    created() {
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
            // simulating real server call with a 500ms delay
            setTimeout(function () {
                if (response.success) {
                    // supply rows for requested block to grid
                    params.success({ rowData: response.rows, rowCount: response.lastRow });
                }
                else {
                    params.fail();
                }
            }, 500);
        },
    };
}

new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
