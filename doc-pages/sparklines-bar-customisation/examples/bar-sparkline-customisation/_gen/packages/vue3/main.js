
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
cellRendererParams:{"sparklineOptions":{"type":"bar","fill":"#5470c6","stroke":"#91cc75","highlightStyle":{"fill":"#fac858"},"valueAxisDomain":[0,1],"paddingOuter":0,"padding":{"top":0,"bottom":0},"axis":{"strokeWidth":0}}}},{field:"volume",
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



createApp(VueExample)
    .mount("#app")

