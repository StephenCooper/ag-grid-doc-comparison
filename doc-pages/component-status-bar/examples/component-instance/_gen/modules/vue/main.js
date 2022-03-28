
import Vue from 'vue';
import { AgGridVue } from '@ag-grid-community/vue';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import ClickableStatusBarComponent from './clickableStatusBarComponentVue.js';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { StatusBarModule } from '@ag-grid-enterprise/status-bar';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, StatusBarModule, RangeSelectionModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <button v-on:click="toggleStatusBarComp()" style="margin-bottom: 10px">Toggle Status Bar Component</button>
            <ag-grid-vue
                
                style="width: 100%; height: 90%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :enableRangeSelection="true"
                :rowSelection="rowSelection"
                :statusBar="statusBar"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        ClickableStatusBarComponent
    },
    data: function() {
        return {
            columnDefs: [{field:"row"},{field:"name"}],
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
            rowData: null,
rowSelection: null,
statusBar: null
        }
    },
    created() {
        this.rowData = [
    { row: 'Row 1', name: 'Michael Phelps' },
    { row: 'Row 2', name: 'Natalie Coughlin' },
    { row: 'Row 3', name: 'Aleksey Nemov' },
    { row: 'Row 4', name: 'Alicia Coutts' },
    { row: 'Row 5', name: 'Missy Franklin' },
    { row: 'Row 6', name: 'Ryan Lochte' },
    { row: 'Row 7', name: 'Allison Schmitt' },
    { row: 'Row 8', name: 'Natalie Coughlin' },
    { row: 'Row 9', name: 'Ian Thorpe' },
    { row: 'Row 10', name: 'Bob Mill' },
    { row: 'Row 11', name: 'Willy Walsh' },
    { row: 'Row 12', name: 'Sarah McCoy' },
    { row: 'Row 13', name: 'Jane Jack' },
    { row: 'Row 14', name: 'Tina Wills' },
];
this.rowSelection = 'multiple';
this.statusBar = {"statusPanels":[{"statusPanel":"ClickableStatusBarComponent","key":"statusBarCompKey"},{"statusPanel":"agAggregationComponent","statusPanelParams":{"aggFuncs":["count","sum"]}}]}
    },
    methods: {
        toggleStatusBarComp() {
    const statusBarComponent = this.gridApi.getStatusPanel('statusBarCompKey');
    statusBarComponent.setVisible(!statusBarComponent.isVisible());
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        

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