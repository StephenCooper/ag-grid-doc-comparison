
import { createApp } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';



const VueExample = {
    template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :getRowId="getRowId"
                :autoGroupColumnDef="autoGroupColumnDef"
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"
                :rowSelection="rowSelection"
                :isRowSelectable="isRowSelectable"
                :suppressRowClickSelection="true"
                :animateRows="true"
                :suppressAggFuncInHeader="true"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"year",
rowGroup:true,
hide:true},{field:"athlete",
hide:true},{field:"sport",
checkboxSelection:true},{field:"gold",
aggFunc:"sum"},{field:"silver",
aggFunc:"sum"},{field:"bronze",
aggFunc:"sum"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    minWidth: 120,
    resizable: true,
    sortable: true,
},
            getRowId: null,
autoGroupColumnDef: null,
rowModelType: null,
serverSideStoreType: null,
rowSelection: null,
isRowSelectable: null
        }
    },
    created() {
        this.getRowId = (params) => {
    var data = params.data;
    // use year for group level ids, or the id we assigned for leaf level
    return data.id || data.year;
};
this.autoGroupColumnDef = {
    field: 'athlete',
    flex: 1,
    minWidth: 240,
    // headerCheckboxSelection: true, // not supported for Enterprise Model
    cellRendererParams: {
        checkbox: true,
    },
};
this.rowModelType = 'serverSide';
this.serverSideStoreType = 'partial';
this.rowSelection = 'multiple';
this.isRowSelectable = (rowNode) => {
    return !rowNode.group;
}
    },
    methods: {
        onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        

        
            const updateData = (data) => {
    // assign a unique ID to each data item
    data.forEach(function (item, index) {
        item.id = index;
    });
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

