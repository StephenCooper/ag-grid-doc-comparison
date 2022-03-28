
import Vue from 'vue';
import { AgGridVue } from '@ag-grid-community/vue';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule, MenuModule, ColumnsToolPanelModule, SetFilterModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div class="example-header">
                    <span class="legend-item ag-row-level-0"></span>
                    <span class="legend-label">Top Level Group</span>
                    <span class="legend-item ag-row-level-1"></span>
                    <span class="legend-label">Second Level Group</span>
                    <span class="legend-item ag-row-level-2"></span>
                    <span class="legend-label">Bottom Rows</span>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :enableRangeSelection="true"
                :groupHideOpenParents="true"
                :animateRows="true"
                :rowData="rowData"></ag-grid-vue>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"country",
rowGroup:true,
hide:true},{headerName:"Year",
valueGetter:"data.year",
rowGroup:true,
hide:true},{field:"athlete",
minWidth:200},{field:"gold",
aggFunc:"sum"},{field:"silver",
aggFunc:"sum"},{field:"bronze",
aggFunc:"sum"},{field:"total",
aggFunc:"sum"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    minWidth: 150,
    filter: true,
    sortable: true,
    resizable: true,
},
            autoGroupColumnDef: null,
rowData: null
        }
    },
    created() {
        this.autoGroupColumnDef = {
    minWidth: 200,
    filterValueGetter: (params) => {
        if (params.node) {
            var colGettingGrouped = params.colDef.showRowGroup + '';
            return params.api.getValue(colGettingGrouped, params.node);
        }
    },
}
    },
    methods: {
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
