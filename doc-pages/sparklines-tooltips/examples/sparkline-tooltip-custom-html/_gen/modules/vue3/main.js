
import { createApp } from 'vue';
import { AgGridVue } from '@ag-grid-community/vue3';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SparklinesModule } from '@ag-grid-enterprise/sparklines';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, SparklinesModule])



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
cellRendererParams:{"sparklineOptions":{"line":{"stroke":"rgb(94,94,224)"},"tooltip":{"container":body,"xOffset":20,"yOffset":-20,"renderer":tooltipRenderer},"highlightStyle":{"fill":"rgb(94,94,224)","strokeWidth":0}}}},{field:"volume",
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
    const { yValue, context } = params;
    return `<div class='my-custom-tooltip my-custom-tooltip-arrow'>
              <div class='tooltip-title'>${context.data.symbol}</div>
              <div class='tooltip-content'>
                <div>Change: ${yValue}</div>
                <div>Volume: ${context.data.volume}</div>
              </div>
          </div>`;
}

const body = document.body;

createApp(VueExample)
    .mount("#app")

