
import Vue from 'vue';
import { AgGridVue } from '@ag-grid-community/vue';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SparklinesModule } from '@ag-grid-enterprise/sparklines';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, SparklinesModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :rowHeight="rowHeight"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"symbol",
maxWidth:110},{field:"name",
minWidth:250},{headerName:"Rate of Change",
cellRenderer:"agSparklineCellRenderer",
cellRendererParams:{"sparklineOptions":{"type":"area"}},
valueGetter:(params) =>  {
    const formattedData = [];
    const rateOfChange = params.data.rateOfChange;
    const { x, y } = rateOfChange;
    x.map((xVal, i) => formattedData.push([xVal, y[i]]));
    return formattedData;
}},{field:"volume",
type:"numericColumn",
maxWidth:140}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    minWidth: 100,
    resizable: true,
},
            rowData: null,
rowHeight: null
        }
    },
    created() {
        this.rowData = getData();
this.rowHeight = 50
    },
    methods: {
        onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    },
    }
}



new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
