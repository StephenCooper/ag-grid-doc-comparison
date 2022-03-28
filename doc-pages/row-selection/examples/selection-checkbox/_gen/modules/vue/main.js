
import Vue from 'vue';
import { AgGridVue } from '@ag-grid-community/vue';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule, MenuModule, ColumnsToolPanelModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :rowSelection="rowSelection"
                :groupSelectsChildren="true"
                :suppressRowClickSelection="true"
                :suppressAggFuncInHeader="true"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"country",
rowGroup:true,
hide:true},{field:"sport",
rowGroup:true,
hide:true},{field:"gold",
aggFunc:"sum"},{field:"silver",
aggFunc:"sum"},{field:"bronze",
aggFunc:"sum"},{field:"age",
minWidth:120,
checkboxSelection:checkboxSelection,
aggFunc:"sum"},{field:"year",
maxWidth:120},{field:"date",
minWidth:150}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    minWidth: 100,
},
            autoGroupColumnDef: null,
rowSelection: null,
rowData: null
        }
    },
    created() {
        this.autoGroupColumnDef = {
    headerName: 'Athlete',
    field: 'athlete',
    minWidth: 250,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
        checkbox
    },
};
this.rowSelection = 'multiple'
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

window.checkboxSelection = function checkboxSelection(params) {
    return params.node.group === true;
}

window.checkbox = function checkbox(params) {
    return params.node.group === true;
}

new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
