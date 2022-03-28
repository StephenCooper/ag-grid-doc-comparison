
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
                :rowData="rowData"
                :enableRangeSelection="true"
                :defaultColDef="defaultColDef"
                :processDataFromClipboard="processDataFromClipboard"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"a"},{field:"b"},{field:"c"},{field:"d"},{field:"e"},{field:"f"},{field:"g"},{field:"h"},{field:"i"},{field:"j"},{field:"k"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    editable: true,
    minWidth: 120,
    resizable: true,
    flex: 1,
    cellClassRules: {
        'cell-green': 'value.startsWith("Green")',
        'cell-blue': 'value.startsWith("Blue")',
        'cell-red': 'value.startsWith("Red")',
        'cell-yellow': 'value.startsWith("Yellow")',
        'cell-orange': 'value.startsWith("Orange")',
        'cell-grey': 'value.startsWith("Grey")',
    },
},
            rowData: null
        }
    },
    created() {
        this.rowData = getData()
    },
    methods: {
        onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    },
processDataFromClipboard(params) {
    var containsRed;
    var containsYellow;
    var data = params.data;
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        for (var j = 0; j < row.length; j++) {
            var value = row[j];
            if (value) {
                if (value.startsWith('Red')) {
                    containsRed = true;
                }
                else if (value.startsWith('Yellow')) {
                    containsYellow = true;
                }
            }
        }
    }
    if (containsRed) {
        // replace the paste request with another
        return [
            ['Orange', 'Orange'],
            ['Grey', 'Grey'],
        ];
    }
    if (containsYellow) {
        // cancels the paste
        return null;
    }
    return data;
},
    }
}



createApp(VueExample)
    .mount("#app")

