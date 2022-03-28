
import Vue from 'vue';
import { AgGridVue } from '@ag-grid-community/vue';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([InfiniteRowModelModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowBuffer="rowBuffer"
                :rowSelection="rowSelection"
                :isRowSelectable="isRowSelectable"
                :rowModelType="rowModelType"
                :cacheBlockSize="cacheBlockSize"
                :cacheOverflowSize="cacheOverflowSize"
                :maxConcurrentDatasourceRequests="maxConcurrentDatasourceRequests"
                :infiniteInitialRowCount="infiniteInitialRowCount"
                :maxBlocksInCache="maxBlocksInCache"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{headerName:"ID",
maxWidth:100,
valueGetter:"node.id",
cellRenderer:(params) =>  {
    if (params.value !== undefined) {
        return params.value;
    }
    else {
        return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
    }
}},{field:"athlete",
minWidth:200},{field:"age"},{field:"country",
minWidth:200,
checkboxSelection:true},{field:"year"},{field:"date",
minWidth:150},{field:"sport",
minWidth:150},{field:"gold"},{field:"silver"},{field:"bronze"},{field:"total"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    minWidth: 100,
    resizable: true,
},
            rowBuffer: null,
rowSelection: null,
isRowSelectable: null,
rowModelType: null,
cacheBlockSize: null,
cacheOverflowSize: null,
maxConcurrentDatasourceRequests: null,
infiniteInitialRowCount: null,
maxBlocksInCache: null
        }
    },
    created() {
        this.rowBuffer = 0;
this.rowSelection = 'multiple';
this.isRowSelectable = (rowNode) => {
    return rowNode.data ? rowNode.data.country === 'United States' : false;
};
this.rowModelType = 'infinite';
this.cacheBlockSize = 100;
this.cacheOverflowSize = 2;
this.maxConcurrentDatasourceRequests = 2;
this.infiniteInitialRowCount = 1;
this.maxBlocksInCache = 2
    },
    methods: {
        onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        

        
            const updateData = (data) => {
    const dataSource = {
        rowCount: undefined,
        getRows: function (params) {
            // console.log('asking for ' + params.startRow + ' to ' + params.endRow);
            // At this point in your code, you would call the server.
            // To make the demo look real, wait for 500ms before returning
            setTimeout(function () {
                // take a slice of the total rows
                const rowsThisPage = data.slice(params.startRow, params.endRow);
                // if on or after the last page, work out the last row.
                let lastRow = -1;
                if (data.length <= params.endRow) {
                    lastRow = data.length;
                }
                // call the success callback
                params.successCallback(rowsThisPage, lastRow);
            }, 500);
        },
    };
    params.api.setDatasource(dataSource);
};
            
            fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => updateData(data));
    },
    }
}



new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
