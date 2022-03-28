
import Vue from 'vue';
import { AgGridVue } from '@ag-grid-community/vue';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <div class="test-container">
                <div class="test-header">
                    <div class="example-section">
                        <button v-on:click="saveState()">Save State</button>
                        <button v-on:click="restoreState()">Restore State</button>
                        <button v-on:click="resetState()">Reset State</button>
                    </div>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :sideBar="sideBar"
                :rowGroupPanelShow="rowGroupPanelShow"
                :pivotPanelShow="pivotPanelShow"
                :rowData="rowData"></ag-grid-vue>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"athlete"},{field:"age"},{field:"country"},{field:"sport"},{field:"year"},{field:"date"},{field:"gold"},{field:"silver"},{field:"bronze"},{field:"total"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    sortable: true,
    resizable: true,
    width: 100,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
},
            sideBar: null,
rowGroupPanelShow: null,
pivotPanelShow: null,
rowData: null
        }
    },
    created() {
        this.sideBar = {"toolPanels":["columns"]};
this.rowGroupPanelShow = 'always';
this.pivotPanelShow = 'always'
    },
    methods: {
        saveState() {
    window.colState = this.gridColumnApi.getColumnState();
    console.log('column state saved');
},
restoreState() {
    if (!window.colState) {
        console.log('no columns state to restore by, you must save state first');
        return;
    }
    this.gridColumnApi.applyColumnState({
        state: window.colState,
        applyOrder: true,
    });
    console.log('column state restored');
},
resetState() {
    this.gridColumnApi.resetColumnState();
    console.log('column state reset');
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



new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
