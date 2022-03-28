
import { createApp } from 'vue';
import { AgGridVue } from '@ag-grid-community/vue3';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import DetailCellRenderer from './detailCellRendererVue.js';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MasterDetailModule, MenuModule, ColumnsToolPanelModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :masterDetail="true"
                :detailCellRenderer="detailCellRenderer"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        DetailCellRenderer
    },
    data: function() {
        return {
            columnDefs: [{field:"name",
cellRenderer:"agGroupCellRenderer"},{field:"account"},{field:"calls"},{field:"minutes",
valueFormatter:"x.toLocaleString() + 'm'"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
},
            detailCellRenderer: null,
rowData: null
        }
    },
    created() {
        this.detailCellRenderer = 'DetailCellRenderer'
    },
    methods: {
        onFirstDataRendered(params) {
    params.api.forEachNode(function (node) {
        node.setExpanded(node.id === '1');
    });
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        

        
            const updateData = (data) => {
    this.rowData = data;
};
            
            fetch('https://www.ag-grid.com/example-assets/master-detail-data.json')
                .then(resp => resp.json())
                .then(data => updateData(data));
    },
    }
}



createApp(VueExample)
    .mount("#app")

