
import { createApp } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';



const VueExample = {
    template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="getDisplayedRowAtIndex()">Get Displayed Row 0</button>
                    <button v-on:click="getDisplayedRowCount()">Get Displayed Row Count</button>
                    <button v-on:click="printAllDisplayedRows()">Print All Displayed Rows</button>
                    <button v-on:click="printPageDisplayedRows()">Print Page Displayed Rows</button>
                </div>
                
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :pagination="true"
                :paginationAutoPageSize="true"
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
minWidth:180},{field:"age"},{field:"country",
minWidth:150},{headerName:"Group",
valueGetter:"data.country.charAt(0)"},{field:"year"},{field:"date",
minWidth:150},{field:"sport",
minWidth:180},{field:"gold"},{field:"silver"},{field:"bronze"},{field:"total"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
},
            rowData: null
        }
    },
    created() {
        
    },
    methods: {
        getDisplayedRowAtIndex() {
    var rowNode = this.gridApi.getDisplayedRowAtIndex(0);
    console.log('getDisplayedRowAtIndex(0) => ' + rowNode.data.athlete + ' ' + rowNode.data.year);
},
getDisplayedRowCount() {
    var count = this.gridApi.getDisplayedRowCount();
    console.log('getDisplayedRowCount() => ' + count);
},
printAllDisplayedRows() {
    var count = this.gridApi.getDisplayedRowCount();
    console.log('## printAllDisplayedRows');
    for (var i = 0; i < count; i++) {
        var rowNode = this.gridApi.getDisplayedRowAtIndex(i);
        console.log('row ' + i + ' is ' + rowNode.data.athlete);
    }
},
printPageDisplayedRows() {
    var rowCount = this.gridApi.getDisplayedRowCount();
    var lastGridIndex = rowCount - 1;
    var currentPage = this.gridApi.paginationGetCurrentPage();
    var pageSize = this.gridApi.paginationGetPageSize();
    var startPageIndex = currentPage * pageSize;
    var endPageIndex = (currentPage + 1) * pageSize - 1;
    if (endPageIndex > lastGridIndex) {
        endPageIndex = lastGridIndex;
    }
    console.log('## printPageDisplayedRows');
    for (var i = startPageIndex; i <= endPageIndex; i++) {
        var rowNode = this.gridApi.getDisplayedRowAtIndex(i);
        console.log('row ' + i + ' is ' + rowNode.data.athlete);
    }
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        

        
            const updateData = (data) => {
    params.api.setRowData(data.slice(0, 100));
};
            
            fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => updateData(data));
    },
    }
}



createApp(VueExample)
    .mount("#app")

