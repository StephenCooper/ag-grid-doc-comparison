
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
                <div class="example-header" style="background: #ffdddd;">
                    Rows in this example do not move, only events are fired
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :animateRows="true"
                :rowData="rowData"
                @row-drag-enter="onRowDragEnter"
                @row-drag-end="onRowDragEnd"
                @row-drag-move="onRowDragMove"
                @row-drag-leave="onRowDragLeave"></ag-grid-vue>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"athlete",
rowDrag:true},{field:"country"},{field:"year",
width:100},{field:"date"},{field:"sport"},{field:"gold"},{field:"silver"},{field:"bronze"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    width: 170,
    sortable: true,
    filter: true,
},
            rowData: null
        }
    },
    created() {
        
    },
    methods: {
        onRowDragEnter(e) {
    console.log('onRowDragEnter', e);
},
onRowDragEnd(e) {
    console.log('onRowDragEnd', e);
},
onRowDragMove(e) {
    console.log('onRowDragMove', e);
},
onRowDragLeave(e) {
    console.log('onRowDragLeave', e);
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

