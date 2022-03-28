
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
            <div class="example-wrapper">
                <div class="example-header">
                    Selection:
                    <span id="selectedRows"></span>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowSelection="rowSelection"
                :rowData="rowData"
                @selection-changed="onSelectionChanged"></ag-grid-vue>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"athlete",
minWidth:150},{field:"age",
maxWidth:90},{field:"country",
minWidth:150},{field:"year",
maxWidth:90},{field:"date",
minWidth:150},{field:"sport",
minWidth:150},{field:"gold"},{field:"silver"},{field:"bronze"},{field:"total"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    minWidth: 100,
},
            rowSelection: null,
rowData: null
        }
    },
    created() {
        this.rowSelection = 'single'
    },
    methods: {
        onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    (document.querySelector('#selectedRows')).innerHTML =
        selectedRows.length === 1 ? selectedRows[0].athlete : '';
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
