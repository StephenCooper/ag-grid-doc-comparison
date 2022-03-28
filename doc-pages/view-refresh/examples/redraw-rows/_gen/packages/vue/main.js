
import Vue from 'vue';
import { AgGridVue } from 'ag-grid-vue';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';



const VueExample = {
    template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="redrawAllRows()">Redraw All Rows</button>
                    <button v-on:click="redrawTopRows()">Redraw Top Rows</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :getRowStyle="getRowStyle"></ag-grid-vue>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{headerName:"A",
field:"a"},{headerName:"B",
field:"b"},{headerName:"C",
field:"c"},{headerName:"D",
field:"d"},{headerName:"E",
field:"e"},{headerName:"F",
field:"f"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
},
            rowData: null,
getRowStyle: null
        }
    },
    created() {
        this.rowData = createData(12);
this.getRowStyle = function () {
    return {
        backgroundColor: colors[colorIndex],
    };
}
    },
    methods: {
        redrawAllRows() {
    progressColor();
    this.gridApi.redrawRows();
},
redrawTopRows() {
    progressColor();
    var rows = [];
    for (var i = 0; i < 6; i++) {
        var row = this.gridApi.getDisplayedRowAtIndex(i);
        rows.push(row);
    }
    this.gridApi.redrawRows({ rowNodes: rows });
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    },
    }
}

window.createData = function createData(count) {
    var result = [];
    for (var i = 1; i <= count; i++) {
        result.push({
            a: (i * 863) % 100,
            b: (i * 811) % 100,
            c: (i * 743) % 100,
            d: (i * 677) % 100,
            e: (i * 619) % 100,
            f: (i * 571) % 100,
        });
    }
    return result;
}

window.progressColor = function progressColor() {
    colorIndex++;
    if (colorIndex === colors.length) {
        colorIndex = 0;
    }
}

var colorIndex = 0;

var colors = ['#000000', '#000066', '#006600', '#660000'];

new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
