
import { createApp } from 'vue';
import { AgGridVue } from '@ag-grid-community/vue3';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="setDataValue()">rowNode.setDataValue</button>
                    <button v-on:click="setData()">rowNode.setData</button>
                    <button v-on:click="applyTransaction()">api.applyTransaction</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :rowData="rowData"
                :rowClassRules="rowClassRules"></ag-grid-vue>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{headerName:"Employee",
field:"employee"},{headerName:"Number Sick Days",
field:"sickDays",
editable:true}],
            gridApi: null,
            columnApi: null,
            
            rowData: null,
rowClassRules: null
        }
    },
    created() {
        this.rowData = getData();
this.rowClassRules = {
    // row style function
    'sick-days-warning': (params) => {
        var numSickDays = params.data.sickDays;
        return numSickDays > 5 && numSickDays <= 7;
    },
    // row style expression
    'sick-days-breach': 'data.sickDays >= 8',
}
    },
    methods: {
        setDataValue() {
    this.gridApi.forEachNode(function (rowNode) {
        rowNode.setDataValue('sickDays', randomInt());
    });
},
setData() {
    this.gridApi.forEachNode(function (rowNode) {
        var newData = {
            employee: rowNode.data.employee,
            sickDays: randomInt(),
        };
        rowNode.setData(newData);
    });
},
applyTransaction() {
    var itemsToUpdate = [];
    this.gridApi.forEachNode(function (rowNode) {
        var data = rowNode.data;
        data.sickDays = randomInt();
        itemsToUpdate.push(data);
    });
    this.gridApi.applyTransaction({ update: itemsToUpdate });
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    },
    }
}

window.randomInt = function randomInt() {
    return Math.floor(Math.random() * 10);
}

createApp(VueExample)
    .mount("#app")

