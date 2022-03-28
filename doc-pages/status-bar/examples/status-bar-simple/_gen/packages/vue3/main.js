
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
                :enableRangeSelection="true"
                :rowSelection="rowSelection"
                :statusBar="statusBar"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"athlete",
minWidth:200},{field:"age",
filter:"agNumberColumnFilter"},{field:"country",
minWidth:200},{field:"year"},{field:"date",
minWidth:180},{field:"sport",
minWidth:200},{field:"gold"},{field:"silver"},{field:"bronze"},{field:"total"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
},
            rowSelection: null,
statusBar: null,
rowData: null
        }
    },
    created() {
        this.rowSelection = 'multiple';
this.statusBar = {"statusPanels":[{"statusPanel":"agTotalAndFilteredRowCountComponent","align":"left"},{"statusPanel":"agTotalRowCountComponent","align":"center"},{"statusPanel":"agFilteredRowCountComponent"},{"statusPanel":"agSelectedRowCountComponent"},{"statusPanel":"agAggregationComponent"}]}
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



createApp(VueExample)
    .mount("#app")
