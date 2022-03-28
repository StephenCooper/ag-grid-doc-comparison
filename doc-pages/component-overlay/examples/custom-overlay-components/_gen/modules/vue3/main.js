
import { createApp } from 'vue';
import { AgGridVue } from '@ag-grid-community/vue3';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import CustomLoadingOverlay from './customLoadingOverlayVue.js';
import CustomNoRowsOverlay from './customNoRowsOverlayVue.js';
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
                :rowData="rowData"
                :loadingOverlayComponent="loadingOverlayComponent"
                :loadingOverlayComponentParams="loadingOverlayComponentParams"
                :noRowsOverlayComponent="noRowsOverlayComponent"
                :noRowsOverlayComponentParams="noRowsOverlayComponentParams"></ag-grid-vue>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        CustomLoadingOverlay,
CustomNoRowsOverlay
    },
    data: function() {
        return {
            columnDefs: [{field:"athlete",
width:150},{field:"age",
width:90},{field:"country",
width:120},{field:"year",
width:90},{field:"date",
width:110},{field:"sport",
width:110},{field:"gold",
width:100},{field:"silver",
width:100},{field:"bronze",
width:100},{field:"total",
width:100}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
},
            loadingOverlayComponent: null,
loadingOverlayComponentParams: null,
noRowsOverlayComponent: null,
noRowsOverlayComponentParams: null,
rowData: null
        }
    },
    created() {
        this.loadingOverlayComponent = 'CustomLoadingOverlay';
this.loadingOverlayComponentParams = {
    loadingMessage: 'One moment please...',
};
this.noRowsOverlayComponent = 'CustomNoRowsOverlay';
this.noRowsOverlayComponentParams = {
    noRowsMessageFunc: () => 'Sorry - no rows! at: ' + new Date(),
}
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
        

        
            const updateData = (data) => {
    this.rowData = data;
};
            
            fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => updateData(data));
    },
    }
}



createApp(VueExample)
    .mount("#app")

