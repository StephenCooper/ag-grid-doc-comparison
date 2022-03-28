
import Vue from 'vue';
import { AgGridVue } from '@ag-grid-community/vue';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, SetFilterModule, MenuModule, ColumnsToolPanelModule, FiltersToolPanelModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :sideBar="sideBar"
                :defaultColDef="defaultColDef"
                :tooltipShowDelay="tooltipShowDelay"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"colA",
tooltipField:"colA",
filter:"agSetColumnFilter"},{field:"colB",
tooltipField:"colB",
filter:"agSetColumnFilter",
filterParams:{"showTooltips":true}},{field:"colC",
tooltipField:"colC",
tooltipComponent:CustomTooltip,
filter:"agSetColumnFilter",
filterParams:{"showTooltips":true}}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    resizable: true,
},
            sideBar: null,
tooltipShowDelay: null,
rowData: null
        }
    },
    created() {
        this.sideBar = 'filters';
this.tooltipShowDelay = 100;
this.rowData = getData()
    },
    methods: {
        onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    },
    }
}



new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
