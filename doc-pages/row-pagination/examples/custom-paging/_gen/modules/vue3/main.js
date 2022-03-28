
import { createApp } from 'vue';
import { AgGridVue } from '@ag-grid-community/vue3';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div class="example-header">
                    Page Size:
                    <select v-on:change="onPageSizeChanged()" id="page-size">
                        <option value="10" selected="">10</option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                        <option value="1000">1000</option>
                    </select>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :autoGroupColumnDef="autoGroupColumnDef"
                :defaultColDef="defaultColDef"
                :suppressRowClickSelection="true"
                :groupSelectsChildren="true"
                :rowSelection="rowSelection"
                :rowGroupPanelShow="rowGroupPanelShow"
                :pivotPanelShow="pivotPanelShow"
                :enableRangeSelection="true"
                :pagination="true"
                :paginationPageSize="paginationPageSize"
                :paginationNumberFormatter="paginationNumberFormatter"
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
            columnDefs: [{headerName:"Athlete",
field:"athlete",
minWidth:170,
checkboxSelection:checkboxSelection,
headerCheckboxSelection:headerCheckboxSelection},{field:"age"},{field:"country"},{field:"year"},{field:"date"},{field:"sport"},{field:"gold"},{field:"silver"},{field:"bronze"},{field:"total"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    editable: true,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
},
            autoGroupColumnDef: null,
rowSelection: null,
rowGroupPanelShow: null,
pivotPanelShow: null,
paginationPageSize: null,
paginationNumberFormatter: null,
rowData: null
        }
    },
    created() {
        this.autoGroupColumnDef = {
    headerName: 'Group',
    minWidth: 170,
    field: 'athlete',
    valueGetter: (params) => {
        if (params.node.group) {
            return params.node.key;
        }
        else {
            return params.data[params.colDef.field];
        }
    },
    headerCheckboxSelection: true,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
        checkbox: true,
    },
};
this.rowSelection = 'multiple';
this.rowGroupPanelShow = 'always';
this.pivotPanelShow = 'always';
this.paginationPageSize = 10;
this.paginationNumberFormatter = (params) => {
    return '[' + params.value.toLocaleString() + ']';
}
    },
    methods: {
        onFirstDataRendered(params) {
    params.api.paginationGoToPage(4);
},
onPageSizeChanged() {
    var value = (document.getElementById('page-size')).value;
    this.gridApi.paginationSetPageSize(Number(value));
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        

        
            const updateData = (data) => {
    this.rowData = data;
};
            
            fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => updateData(data));
    },
    }
}

var checkboxSelection = function (params) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
};

var headerCheckboxSelection = function (params) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
};

createApp(VueExample)
    .mount("#app")

