
import Vue from 'vue';
import { AgGridVue } from 'ag-grid-vue';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';



const VueExample = {
    template: `
        <div style="height: 100%">
            <div class="container">
                <div class="columns">
                    <label class="option" for="prependContent"><input type="checkbox" id="prependContent">Prepend Content</label>
                    <label class="option" for="appendContent"><input type="checkbox" id="appendContent"> Append Content</label>
                </div>
                <div>
                    <button v-on:click="onBtExport()" style="margin: 5px 0px; font-weight: bold;">Export to Excel</button>
                </div>
                <div class="grid-wrapper">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :popupParent="popupParent"
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
            columnDefs: [{field:"athlete",
minWidth:200},{field:"country",
minWidth:200},{field:"sport",
minWidth:150},{field:"gold"},{field:"silver"},{field:"bronze"},{field:"total"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
},
            popupParent: null,
rowData: null
        }
    },
    created() {
        this.popupParent = document.body
    },
    methods: {
        onBtExport() {
    this.gridApi.exportDataAsExcel(getParams());
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        

        
            const updateData = (data) => params.api.setRowData(data.filter((rec) => rec.country != null));
            
            fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
                .then(resp => resp.json())
                .then(data => updateData(data));
    },
    }
}

const getRows = () => [
    [],
    [
        {
            data: { value: 'Here is a comma, and a some "quotes".', type: 'String' },
        },
    ],
    [
        {
            data: {
                value: 'They are visible when the downloaded file is opened in Excel because custom content is properly escaped.',
                type: 'String',
            },
        },
    ],
    [
        { data: { value: 'this cell:', type: 'String' }, mergeAcross: 1 },
        {
            data: {
                value: 'is empty because the first cell has mergeAcross=1',
                type: 'String',
            },
        },
    ],
    [],
];

const getBoolean = (inputSelector) => !!(document.querySelector(inputSelector)).checked;

const getParams = () => ({
    prependContent: getBoolean('#prependContent') ? getRows() : undefined,
    appendContent: getBoolean('#appendContent') ? getRows() : undefined,
});

new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
