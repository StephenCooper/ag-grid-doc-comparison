
import { createApp } from 'vue';
import { AgGridVue } from '@ag-grid-community/vue3';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MasterDetailModule, MenuModule, ColumnsToolPanelModule, ClipboardModule, ExcelExportModule])



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
                :defaultCsvExportParams="defaultCsvExportParams"
                :defaultExcelExportParams="defaultExcelExportParams"
                :defaultColDef="defaultColDef"
                :masterDetail="true"
                :detailCellRendererParams="detailCellRendererParams"
                :excelStyles="excelStyles"
                :rowData="rowData"></ag-grid-vue>
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
            defaultCsvExportParams: null,
defaultExcelExportParams: null,
detailCellRendererParams: null,
excelStyles: null,
rowData: null
        }
    },
    created() {
        this.defaultCsvExportParams = {
    getCustomContentBelowRow: (params) => getCells(params),
};
this.defaultExcelExportParams = {
    getCustomContentBelowRow: (params) => getCells(params),
    columnWidth: 120,
};
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
};
this.excelStyles = [
    {
        id: 'header',
        interior: {
            color: '#aaaaaa',
            pattern: 'Solid',
        },
    },
    {
        id: 'body',
        interior: {
            color: '#dddddd',
            pattern: 'Solid',
        },
    },
]
    },
    methods: {
        onBtExport() {
    this.gridApi.exportDataAsExcel();
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

window.cell = function cell(text, styleId) {
    return {
        styleId: styleId,
        data: {
            type: /^\d+$/.test(text) ? 'Number' : 'String',
            value: String(text),
        },
    };
}

var getCells = (params) => {
    const cells = [
        [
            cell(''),
            cell('Call Id', 'header'),
            cell('Direction', 'header'),
            cell('Number', 'header'),
            cell('Duration', 'header'),
            cell('Switch Code', 'header'),
        ],
    ].concat(params.node.data.callRecords.map(function (record) {
        return [
            cell(''),
            cell(record.callId, 'body'),
            cell(record.direction, 'body'),
            cell(record.number, 'body'),
            cell(record.duration, 'body'),
            cell(record.switchCode, 'body'),
        ];
    }), [[]]);
    return cells;
};

createApp(VueExample)
    .mount("#app")

