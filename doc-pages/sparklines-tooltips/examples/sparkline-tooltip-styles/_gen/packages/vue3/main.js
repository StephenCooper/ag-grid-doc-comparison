
import { createApp } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';



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
                :rowHeight="rowHeight"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"symbol",
maxWidth:120},{field:"name",
minWidth:250},{field:"change",
cellRenderer:"agSparklineCellRenderer",
cellRendererParams:{"sparklineOptions":{"tooltip":{"renderer":tooltipRenderer},"line":{"stroke":"rgb(103,103,255)","strokeWidth":1},"highlightStyle":{"fill":"white","strokeWidth":0}}}},{field:"volume",
type:"numericColumn",
maxWidth:140}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    minWidth: 100,
    resizable: true,
},
            rowData: null,
rowHeight: null
        }
    },
    created() {
        this.rowData = getData();
this.rowHeight = 50
    },
    methods: {
        onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    },
    }
}

window.tooltipRenderer = function tooltipRenderer(params) {
    return {
        title: params.context.data.symbol,
        // sets styles for tooltip
        color: 'white',
        backgroundColor: 'rgb(78,78,255)',
        opacity: 0.7,
    };
}

createApp(VueExample)
    .mount("#app")
