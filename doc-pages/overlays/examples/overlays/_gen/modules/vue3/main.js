
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
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="onBtShowLoading()">Show Loading Overlay</button>
                    <button v-on:click="onBtShowNoRows()">Show No Rows Overlay</button>
                    <button v-on:click="onBtHide()">Hide Overlay</button>
                </div> 
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :overlayLoadingTemplate="overlayLoadingTemplate"
                :overlayNoRowsTemplate="overlayNoRowsTemplate"
                :rowData="rowData"></ag-grid-vue>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"athlete",
minWidth:200},{field:"age"},{field:"country",
minWidth:200},{field:"year"},{field:"date",
minWidth:180},{field:"sport",
minWidth:200},{field:"gold"},{field:"silver"},{field:"bronze"},{field:"total"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    minWidth: 100,
    filter: true,
    sortable: true,
    resizable: true,
},
            overlayLoadingTemplate: null,
overlayNoRowsTemplate: null,
rowData: null
        }
    },
    created() {
        this.overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
this.overlayNoRowsTemplate = '<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">This is a custom \'no rows\' overlay</span>'
    },
    methods: {
        onBtShowLoading() {
    this.gridApi.showLoadingOverlay();
},
onBtShowNoRows() {
    this.gridApi.showNoRowsOverlay();
},
onBtHide() {
    this.gridApi.hideOverlay();
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        

        
            const updateData = (data) => params.api.setRowData(data);
            
            fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => updateData(data));
    },
    }
}



createApp(VueExample)
    .mount("#app")

