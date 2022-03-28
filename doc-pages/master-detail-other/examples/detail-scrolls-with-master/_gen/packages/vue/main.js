
import Vue from 'vue';
import { AgGridVue } from 'ag-grid-vue';
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
                :masterDetail="true"
                :embedFullWidthRows="true"
                :detailCellRendererParams="detailCellRendererParams"
                :rowData="rowData"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
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
    width: 300,
},
            detailCellRendererParams: null,
rowData: null
        }
    },
    created() {
        this.detailCellRendererParams = {
    detailGridOptions: {
        columnDefs: [
            { field: 'callId' },
            { field: 'direction' },
            { field: 'number' },
            { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
            { field: 'switchCode' },
        ],
    },
    getDetailRowData: (params) => {
        params.successCallback(params.data.callRecords);
    },
}
    },
    methods: {
        onFirstDataRendered(params) {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
        params.api.getDisplayedRowAtIndex(1).setExpanded(true);
    }, 0);
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



new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
