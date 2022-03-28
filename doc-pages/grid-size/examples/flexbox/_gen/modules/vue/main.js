
import Vue from 'vue';
import { AgGridVue } from '@ag-grid-community/vue';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <div style="display: flex; flex-direction: row; height: 100%;">
                <div style=" overflow: hidden; flex-grow: 1">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :rowData="rowData"></ag-grid-vue>
                </div>
                <div style="background-color:#ccc; padding: 2rem">right side column</div>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"make"},{field:"model"},{field:"price"}],
            gridApi: null,
            columnApi: null,
            
            rowData: null
        }
    },
    created() {
        this.rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
]
    },
    methods: {
        onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        

        
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', function () {
        setTimeout(function () {
            params.api.sizeColumnsToFit();
        });
    });

        params.api.sizeColumnsToFit();
    },
    }
}



new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
