
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
                    <button v-on:click="onUpdateSomeValues()">Update Some D &amp; E Values</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"></ag-grid-vue>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{headerName:"Editable A",
field:"a",
editable:true,
valueParser:numberValueParser},{headerName:"Editable B",
field:"b",
editable:true,
valueParser:numberValueParser},{headerName:"Editable C",
field:"c",
editable:true,
valueParser:numberValueParser},{headerName:"API D",
field:"d",
minWidth:140,
valueParser:numberValueParser,
cellRenderer:"agAnimateShowChangeCellRenderer"},{headerName:"API E",
field:"e",
minWidth:140,
valueParser:numberValueParser,
cellRenderer:"agAnimateShowChangeCellRenderer"},{headerName:"Total",
minWidth:140,
valueGetter:"data.a + data.b + data.c + data.d + data.e",
cellRenderer:"agAnimateShowChangeCellRenderer"},{headerName:"Average",
minWidth:140,
valueGetter:"(data.a + data.b + data.c + data.d + data.e) / 5",
cellRenderer:"agAnimateSlideCellRenderer"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    minWidth: 120,
    resizable: true,
    cellClass: 'align-right',
    valueFormatter: function (params) {
        return formatNumber(params.value);
    },
},
            rowData: null
        }
    },
    created() {
        this.rowData = createRowData()
    },
    methods: {
        onUpdateSomeValues() {
    const rowCount = this.gridApi.getDisplayedRowCount();
    for (let i = 0; i < 10; i++) {
        const row = Math.floor(Math.random() * rowCount);
        const rowNode = this.gridApi.getDisplayedRowAtIndex(row);
        rowNode.setDataValue('d', Math.floor(Math.random() * 10000));
        rowNode.setDataValue('e', Math.floor(Math.random() * 10000));
    }
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    },
    }
}

window.numberValueParser = function numberValueParser(params) {
    return Number(params.newValue);
}

window.formatNumber = function formatNumber(number) {
    // this puts commas into the number eg 1000 goes to 1,000,
    // i pulled this from stack overflow, i have no idea how it works
    return Math.floor(number)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

window.createRowData = function createRowData() {
    const rowData = [];
    for (let i = 0; i < 20; i++) {
        rowData.push({
            a: Math.floor(((i + 323) * 25435) % 10000),
            b: Math.floor(((i + 323) * 23221) % 10000),
            c: Math.floor(((i + 323) * 468276) % 10000),
            d: 0,
            e: 0,
        });
    }
    return rowData;
}

createApp(VueExample)
    .mount("#app")

