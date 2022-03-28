
import Vue from 'vue';
import { AgGridVue } from 'ag-grid-vue';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';



const VueExample = {
    template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="refreshCache([])">Refresh Everything</button>
                    <button v-on:click="refreshCache(['Kathryn Powers','Mabel Ward'])">Refresh ['Kathryn Powers','Mabel Ward']</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"
                :treeData="true"
                :animateRows="true"
                :cacheBlockSize="cacheBlockSize"
                :isServerSideGroupOpenByDefault="isServerSideGroupOpenByDefault"
                :isServerSideGroup="isServerSideGroup"
                :getServerSideGroupKey="getServerSideGroupKey"></ag-grid-vue>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"employeeId",
hide:true},{field:"employeeName",
hide:true},{field:"employmentType"},{field:"startDate"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    width: 235,
    resizable: true,
    flex: 1,
},
            autoGroupColumnDef: null,
rowModelType: null,
serverSideStoreType: null,
cacheBlockSize: null,
isServerSideGroupOpenByDefault: null,
isServerSideGroup: null,
getServerSideGroupKey: null
        }
    },
    created() {
        this.autoGroupColumnDef = {
    field: 'employeeName',
};
this.rowModelType = 'serverSide';
this.serverSideStoreType = 'partial';
this.cacheBlockSize = 10;
this.isServerSideGroupOpenByDefault = (params) => {
    var isKathrynPowers = params.rowNode.level == 0 && params.data.employeeName == 'Kathryn Powers';
    var isMabelWard = params.rowNode.level == 1 && params.data.employeeName == 'Mabel Ward';
    return isKathrynPowers || isMabelWard;
};
this.isServerSideGroup = (dataItem) => {
    // indicate if node is a group
    return dataItem.group;
};
this.getServerSideGroupKey = (dataItem) => {
    // specify which group key to use
    return dataItem.employeeName;
}
    },
    methods: {
        refreshCache(route) {
    this.gridApi.refreshServerSideStore({ route: route, purge: true });
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        

        
            const updateData = (data) => {
    var fakeServer = createFakeServer(data);
    var datasource = createServerSideDatasource(fakeServer);
    params.api.setServerSideDatasource(datasource);
};
            
            fetch('https://www.ag-grid.com/example-assets/tree-data.json')
                .then(resp => resp.json())
                .then(data => updateData(data));
    },
    }
}

window.createFakeServer = function createFakeServer(fakeServerData) {
    const fakeServer = {
        getData: function (request) {
            function extractRowsFromData(groupKeys, data) {
                if (groupKeys.length === 0) {
                    return data.map(function (d) {
                        return {
                            group: !!d.underlings,
                            employeeId: d.employeeId + '',
                            employeeName: d.employeeName,
                            employmentType: d.employmentType,
                            startDate: d.startDate,
                        };
                    });
                }
                var key = groupKeys[0];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].employeeName === key) {
                        return extractRowsFromData(groupKeys.slice(1), data[i].underlings.slice());
                    }
                }
            }
            return extractRowsFromData(request.groupKeys, fakeServerData);
        }
    };
    return fakeServer;
}

window.createServerSideDatasource = function createServerSideDatasource(fakeServer) {
    const dataSource = {
        getRows: function (params) {
            console.log('ServerSideDatasource.getRows: params = ', params);
            var request = params.request;
            var allRows = fakeServer.getData(request);
            var doingInfinite = request.startRow != null && request.endRow != null;
            var result = doingInfinite
                ? {
                    rowData: allRows.slice(request.startRow, request.endRow),
                    rowCount: allRows.length,
                }
                : { rowData: allRows };
            console.log('getRows: result = ', result);
            setTimeout(function () {
                params.success(result);
            }, 500);
        }
    };
    return dataSource;
}

new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
