
import { createApp } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
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
                :getRowId="getRowId"
                :groupDefaultExpanded="groupDefaultExpanded"
                :rowBuffer="rowBuffer"
                :masterDetail="true"
                :detailCellRendererParams="detailCellRendererParams"
                :rowData="rowData"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
                </div>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
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
            getRowId: null,
groupDefaultExpanded: null,
rowBuffer: null,
detailCellRendererParams: null,
rowData: null
        }
    },
    created() {
        this.getRowId = (params) => {
    return params.data.name;
};
this.groupDefaultExpanded = 1;
this.rowBuffer = 100;
this.detailCellRendererParams = {
    detailGridOptions: {
        columnDefs: [
            { field: 'callId' },
            { field: 'direction' },
            { field: 'number', minWidth: 150 },
            { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
            { field: 'switchCode', minWidth: 150 },
        ],
        defaultColDef: {
            flex: 1,
        },
    },
    getDetailRowData: (params) => {
        params.successCallback(params.data.callRecords);
    },
}
    },
    methods: {
        onFirstDataRendered(params) {
    params.api.forEachNode(function (node) {
        node.setExpanded(true);
    });
},
onBtExport() {
    var spreadsheets = [];
    const mainSheet = this.gridApi.getSheetDataForExcel();
    if (mainSheet) {
        spreadsheets.push(mainSheet);
    }
    this.gridApi.forEachDetailGridInfo(function (node) {
        const sheet = node.api.getSheetDataForExcel({
            sheetName: node.id.replace('detail_', ''),
        });
        if (sheet) {
            spreadsheets.push(sheet);
        }
    });
    this.gridApi.exportMultipleSheetsAsExcel({
        data: spreadsheets,
        fileName: 'ag-grid.xlsx',
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

