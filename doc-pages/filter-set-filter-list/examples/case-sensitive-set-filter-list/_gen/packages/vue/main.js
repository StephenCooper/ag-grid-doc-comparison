
import Vue from 'vue';
import { AgGridVue } from 'ag-grid-vue';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';



const VueExample = {
    template: `
        <div style="height: 100%">
            <div style="display: flex; flex-direction: column; height: 100%;">
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :sideBar="sideBar"
                :rowData="rowData"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{headerName:"Case Insensitive (default)",
field:"colour",
filter:"agSetColumnFilter",
filterParams:{"caseSensitive":false,"cellRenderer":colourCellRenderer}},{headerName:"Case Sensitive",
field:"colour",
filter:"agSetColumnFilter",
filterParams:{"caseSensitive":true,"cellRenderer":colourCellRenderer}}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    minWidth: 225,
    cellRenderer: colourCellRenderer,
    resizable: true,
    floatingFilter: true,
},
            sideBar: null,
rowData: null
        }
    },
    created() {
        this.sideBar = 'filters';
this.rowData = getData()
    },
    methods: {
        onFirstDataRendered(params) {
    ((params.api.getToolPanelInstance('filters'))).expandFilters();
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    },
    }
}

window.colourCellRenderer = function colourCellRenderer(params) {
    if (!params.value || params.value === '(Select All)') {
        return params.value;
    }
    return `<div style="background-color: ${params.value.toLowerCase()}; ${FIXED_STYLES}"></div>${params.value}`;
}

const FIXED_STYLES = 'vertical-align: middle; border: 1px solid black; margin: 3px; display: inline-block; width: 10px; height: 10px';

new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
