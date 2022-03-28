
import { createApp } from 'vue';
import { AgGridVue } from '@ag-grid-community/vue3';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import CustomTooltip from './customTooltipVue.js';
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
                :defaultColDef="defaultColDef"
                :tooltipShowDelay="tooltipShowDelay"
                :tooltipMouseTrack="true"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        CustomTooltip
    },
    data: function() {
        return {
            columnDefs: [{field:"athlete",
minWidth:150,
tooltipField:"athlete",
tooltipComponentParams:{"type":"success"}},{field:"age"},{field:"country",
minWidth:130,
tooltipField:"country"},{field:"year"},{field:"date"},{field:"sport"},{field:"gold"},{field:"silver"},{field:"bronze"},{field:"total"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
    tooltipComponent: 'CustomTooltip',
},
            tooltipShowDelay: null,
rowData: null
        }
    },
    created() {
        this.tooltipShowDelay = 1000
    },
    methods: {
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

