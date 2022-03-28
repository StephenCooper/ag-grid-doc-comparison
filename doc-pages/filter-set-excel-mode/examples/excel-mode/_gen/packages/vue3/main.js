
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
                :sideBar="sideBar"
                :rowData="rowData"
                :localeText="localeText"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{headerName:"Default",
field:"animal",
filter:"agSetColumnFilter"},{headerName:"Excel (Windows)",
field:"animal",
filter:"agSetColumnFilter",
filterParams:{"excelMode":"windows"}},{headerName:"Excel (Mac)",
field:"animal",
filter:"agSetColumnFilter",
filterParams:{"excelMode":"mac"}}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    minWidth: 200,
    resizable: true,
},
            sideBar: null,
rowData: null,
localeText: null
        }
    },
    created() {
        this.sideBar = 'filters';
this.rowData = getData();
this.localeText = {
    applyFilter: 'OK',
    cancelFilter: 'Cancel',
    resetFilter: 'Clear Filter',
}
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

