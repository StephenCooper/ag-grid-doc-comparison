
import Vue from 'vue';
import { AgGridVue } from '@ag-grid-community/vue';
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
                :rowData="rowData"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        CustomTooltip
    },
    data: function() {
        return {
            columnDefs: [{headerName:"Athlete Col 1",
field:"athlete",
minWidth:150,
tooltipField:"athlete"},{headerName:"Athlete Col 2",
field:"athlete",
minWidth:150,
tooltipComponent:'CustomTooltip',
tooltipValueGetter:toolTipValueGetter},{field:"sport",
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
            rowData: null
        }
    },
    created() {
        
    },
    methods: {
        onFirstDataRendered(params) {
    params.api.getDisplayedRowAtIndex(0).data.athlete = undefined;
    params.api.getDisplayedRowAtIndex(1).data.athlete = null;
    params.api.getDisplayedRowAtIndex(2).data.athlete = '';
    params.api.refreshCells();
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

const toolTipValueGetter = (params) => ({ value: params.value });

new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
