
import { createApp } from 'vue';
import { AgGridVue } from '@ag-grid-community/vue3';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { CsvExportModule } from '@ag-grid-community/csv-export';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule, MenuModule, SetFilterModule, ColumnsToolPanelModule, FiltersToolPanelModule, CsvExportModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <div style="margin-bottom: 5px;">
                <div>
                    <button v-on:click="turnOnPivotMode()">Pivot Mode On</button>
                    <button v-on:click="turnOffPivotMode()">Pivot Mode Off</button>
                    <button v-on:click="addPivotColumn()" style="margin-left: 15px;">Pivot Country</button>
                    <button v-on:click="addPivotColumns()">Pivot Year &amp; Country</button>
                    <button v-on:click="removePivotColumn()">Un-Pivot Country</button>
                </div>
                <div style="margin-top: 5px;">
                    <button v-on:click="emptyPivotColumns()">Remove All Pivots</button>
                    <button v-on:click="exportToCsv()" style="margin-left: 15px;">CSV Export</button>
                </div>
            </div>
            <div style="height: calc(100% - 60px);">
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :sideBar="true"
                :rowData="rowData"></ag-grid-vue>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"athlete",
enableRowGroup:true,
enablePivot:true,
minWidth:200},{field:"age",
enableValue:true},{field:"country",
enableRowGroup:true,
enablePivot:true},{field:"year",
enableRowGroup:true,
enablePivot:true},{field:"date",
enableRowGroup:true,
enablePivot:true},{field:"sport",
enableRowGroup:true,
enablePivot:true,
minWidth:200},{field:"gold",
enableValue:true,
aggFunc:"sum"},{field:"silver",
enableValue:true},{field:"bronze",
enableValue:true},{field:"total",
enableValue:true}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    minWidth: 150,
    filter: true,
    resizable: true,
},
            autoGroupColumnDef: null,
rowData: null
        }
    },
    created() {
        this.autoGroupColumnDef = {
    minWidth: 250,
}
    },
    methods: {
        turnOffPivotMode() {
    this.gridColumnApi.setPivotMode(false);
},
turnOnPivotMode() {
    this.gridColumnApi.setPivotMode(true);
},
addPivotColumn() {
    this.gridColumnApi.applyColumnState({
        state: [{ colId: 'country', pivot: true }],
        defaultState: { pivot: false },
    });
},
addPivotColumns() {
    this.gridColumnApi.applyColumnState({
        state: [
            { colId: 'year', pivot: true },
            { colId: 'country', pivot: true },
        ],
        defaultState: { pivot: false },
    });
},
removePivotColumn() {
    this.gridColumnApi.applyColumnState({
        state: [{ colId: 'country', pivot: false }],
    });
},
emptyPivotColumns() {
    this.gridColumnApi.applyColumnState({
        defaultState: { pivot: false },
    });
},
exportToCsv() {
    this.gridApi.exportDataAsCsv();
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

