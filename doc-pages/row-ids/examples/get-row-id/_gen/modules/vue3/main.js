
import { createApp } from 'vue';
import { AgGridVue } from '@ag-grid-community/vue3';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :rowData="rowData"
                :getRowId="getRowId"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{headerName:"Row ID",
valueGetter:"node.id"},{field:"make"},{field:"model"},{field:"price"}],
            gridApi: null,
            columnApi: null,
            
            rowData: null,
getRowId: null
        }
    },
    created() {
        this.rowData = [
    { id: 'c1', make: "Toyota", model: "Celica", price: 35000 },
    { id: 'c2', make: "Ford", model: "Mondeo", price: 32000 },
    { id: 'c8', make: "Porsche", model: "Boxter", price: 72000 },
    { id: 'c4', make: "BMW", model: "M50", price: 60000 },
    { id: 'c14', make: "Aston Martin", model: "DBX", price: 190000 }
];
this.getRowId = params => params.data.id
    },
    methods: {
        onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    },
    }
}



createApp(VueExample)
    .mount("#app")

