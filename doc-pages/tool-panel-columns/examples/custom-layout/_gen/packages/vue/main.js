
import Vue from 'vue';
import { AgGridVue } from 'ag-grid-vue';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';



const VueExample = {
    template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div>
                    <span class="button-group">
                        <button v-on:click="setCustomSortLayout()">Custom Sort Layout</button>
                        <button v-on:click="setCustomGroupLayout()">Custom Group Layout</button>
                    </span>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :sideBar="sideBar"
                :rowData="rowData"></ag-grid-vue>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{headerName:"Athlete",
children: [{headerName:"Name",
field:"athlete",
minWidth:200,
filter:"agTextColumnFilter"},
{field:"age"},
{field:"country",
minWidth:200}]},{headerName:"Competition",
children: [{field:"year"},
{field:"date",
minWidth:180}]},{colId:"sport",
field:"sport",
minWidth:200},{headerName:"Medals",
children: [{field:"gold"},
{field:"silver"},
{field:"bronze"},
{field:"total"}]}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    minWidth: 100,
    // allow every column to be aggregated
    enableValue: true,
    // allow every column to be grouped
    enableRowGroup: true,
    // allow every column to be pivoted
    enablePivot: true,
    filter: true,
    sortable: true,
    resizable: true,
},
            sideBar: null,
rowData: null
        }
    },
    created() {
        this.sideBar = {"toolPanels":[{"id":"columns","labelDefault":"Columns","labelKey":"columns","iconKey":"columns","toolPanel":"agColumnsToolPanel","toolPanelParams":{"suppressSyncLayoutWithGrid":true,"suppressColumnMove":true}}],"defaultToolPanel":"columns"}
    },
    methods: {
        setCustomSortLayout() {
    var columnToolPanel = (this.gridApi.getToolPanelInstance('columns'));
    columnToolPanel.setColumnLayout(sortedToolPanelColumnDefs);
},
setCustomGroupLayout() {
    var columnToolPanel = (this.gridApi.getToolPanelInstance('columns'));
    columnToolPanel.setColumnLayout(customToolPanelColumnDefs);
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        

        
            const updateData = (data) => params.api.setRowData(data);
            
            fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => updateData(data));
    },
    }
}

var sortedToolPanelColumnDefs = [
    {
        headerName: 'Athlete',
        children: [
            { field: 'age' },
            { field: 'country' },
            { headerName: 'Name', field: 'athlete' },
        ],
    },
    {
        headerName: 'Competition',
        children: [{ field: 'date' }, { field: 'year' }],
    },
    {
        headerName: 'Medals',
        children: [
            { field: 'bronze' },
            { field: 'gold' },
            { field: 'silver' },
            { field: 'total' },
        ],
    },
    { colId: 'sport', field: 'sport' },
];

var customToolPanelColumnDefs = [
    {
        headerName: 'Dummy Group 1',
        children: [
            { field: 'age' },
            { headerName: 'Name', field: 'athlete' },
            {
                headerName: 'Dummy Group 2',
                children: [{ colId: 'sport' }, { field: 'country' }],
            },
        ],
    },
    {
        headerName: 'Medals',
        children: [
            { field: 'total' },
            { field: 'bronze' },
            {
                headerName: 'Dummy Group 3',
                children: [{ field: 'silver' }, { field: 'gold' }],
            },
        ],
    },
];

new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
