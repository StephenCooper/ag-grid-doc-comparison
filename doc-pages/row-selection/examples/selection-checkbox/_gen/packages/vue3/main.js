
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

createApp(VueExample)
    .mount("#app")

