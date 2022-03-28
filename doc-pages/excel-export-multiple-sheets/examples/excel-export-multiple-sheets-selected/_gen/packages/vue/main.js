
import Vue from 'vue';
import { AgGridVue } from 'ag-grid-vue';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';



const VueExample = {
    template: `
        <div style="height: 100%">
            <div class="container">
                <div>
                    <button v-on:click="onBtExport()" style="margin-bottom: 5px; font-weight: bold;">Export to Excel</button>
                </div>
                <div class="grid-wrapper">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowSelection="rowSelection"
                :rowData="rowData"></ag-grid-vue>
                </div>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"athlete",
minWidth:200},{field:"age"},{field:"country",
minWidth:200},{field:"year"},{field:"date",
minWidth:150},{field:"sport",
minWidth:150},{field:"gold"},{field:"silver"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
},
            rowSelection: null,
rowData: null
        }
    },
    created() {
        this.rowSelection = 'multiple'
    },
    methods: {
        onBtExport() {
    var spreadsheets = [];
    this.gridApi.forEachNode((node, index) => {
        if (index % 100 === 0) {
            this.gridApi.deselectAll();
        }
        node.setSelected(true);
        if (index % 100 === 99) {
            spreadsheets.push(this.gridApi.getSheetDataForExcel({
                onlySelected: true,
            }));
        }
    });
    // check if the last page was exported
    if (this.gridApi.getSelectedNodes().length) {
        spreadsheets.push(this.gridApi.getSheetDataForExcel({
            onlySelected: true,
        }));
        this.gridApi.deselectAll();
    }
    this.gridApi.exportMultipleSheetsAsExcel({
        data: spreadsheets,
    });
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



new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
