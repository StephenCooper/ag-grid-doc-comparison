
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
                :detailRowHeight="detailRowHeight"
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
    flex: 1,
},
            detailRowHeight: null,
detailCellRendererParams: null,
rowData: null
        }
    },
    created() {
        this.detailRowHeight = 195;
this.detailCellRendererParams = (params) => {
    var res = {};
    // we use the same getDetailRowData for both options
    res.getDetailRowData = function (params) {
        params.successCallback(params.data.callRecords);
    };
    var nameMatch = params.data.name === 'Mila Smith' || params.data.name === 'Harper Johnson';
    if (nameMatch) {
        // grid options for columns {callId, number}
        res.detailGridOptions = {
            columnDefs: [{ field: 'callId' }, { field: 'number' }],
            defaultColDef: {
                flex: 1,
            },
        };
    }
    else {
        // grid options for columns {callId, direction, duration, switchCode}
        res.detailGridOptions = {
            columnDefs: [
                { field: 'callId' },
                { field: 'direction' },
                { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
                { field: 'switchCode' },
            ],
            defaultColDef: {
                flex: 1,
            },
        };
    }
    return res;
}
    },
    methods: {
        onFirstDataRendered(params) {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
        var node1 = params.api.getDisplayedRowAtIndex(1);
        var node2 = params.api.getDisplayedRowAtIndex(2);
        node1.setExpanded(true);
        node2.setExpanded(true);
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
