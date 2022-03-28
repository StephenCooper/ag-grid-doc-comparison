
import { createApp } from 'vue';
import { AgGridVue } from '@ag-grid-community/vue3';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import CountryCellRenderer from './countryCellRendererVue.js';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { MenuModule } from '@ag-grid-enterprise/menu';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, ExcelExportModule, MenuModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <div class="container">
                <div>
                    <button class="export" v-on:click="onBtExport()">Export to Excel</button>
                </div>
                <div class="grid-wrapper">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :defaultExcelExportParams="defaultExcelExportParams"
                :context="context"></ag-grid-vue>
                </div>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        CountryCellRenderer
    },
    data: function() {
        return {
            columnDefs: [{field:"country",
headerName:" ",
minWidth:70,
width:70,
maxWidth:70,
cellRenderer:'CountryCellRenderer',
cellRendererParams:{"base64flags":base64flags,"countryCodes":countryCodes}},{field:"athlete"},{field:"age"},{field:"year"},{field:"date"},{field:"sport"},{field:"gold"},{field:"silver"},{field:"bronze"},{field:"total"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    width: 150,
    resizable: true,
},
            defaultExcelExportParams: null,
context: null
        }
    },
    created() {
        this.defaultExcelExportParams = {
    addImageToCell: (rowIndex, col, value) => {
        if (col.getColId() !== 'country') {
            return;
        }
        const countryCode = countryCodes[value];
        return {
            image: {
                id: countryCode,
                base64: base64flags[countryCode],
                imageType: 'png',
                width: 20,
                height: 11,
                position: {
                    offsetX: 30,
                    offsetY: 5.5,
                },
            },
        };
    },
};
this.context = {
    base64flags: base64flags,
    countryCodes: countryCodes
}
    },
    methods: {
        onBtExport() {
    this.gridApi.exportDataAsExcel();
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        

        
    fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
        .then(data => createBase64FlagsFromResponse(data, countryCodes, base64flags))
        .then(data => params.api.setRowData(data));

    },
    }
}

const countryCodes = {};

const base64flags = {};

createApp(VueExample)
    .mount("#app")

