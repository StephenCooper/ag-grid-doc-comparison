
import Vue from 'vue';
import { AgGridVue } from 'ag-grid-vue';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';



const VueExample = {
    template: `
        <div style="height: 100%">
            <div class="parent-div">
                <div class="api-panel">
                    <div class="api-column">
                        Visibility
                        <button v-on:click="setSideBarVisible(true)">setSideBarVisible(true)</button>
                        <button v-on:click="setSideBarVisible(false)">setSideBarVisible(false)</button>
                        <button v-on:click="isSideBarVisible()">isSideBarVisible()</button>
                    </div>
                    <div class="api-column">
                        Open &amp; Close
                        <button v-on:click="openToolPanel('columns')">openToolPanel('columns')</button>
                        <button v-on:click="openToolPanel('filters')">openToolPanel('filters')</button>
                        <button v-on:click="closeToolPanel()">closeToolPanel()</button>
                        <button v-on:click="getOpenedToolPanel()">getOpenedToolPanel()</button>
                    </div>
                    <div class="api-column">
                        Reset
                        <button v-on:click="setSideBar(['filters','columns'])">setSideBar(['filters','columns'])</button>
                        <button v-on:click="setSideBar('columns')">setSideBar('columns')</button>
                        <button v-on:click="getSideBar()">getSideBar()</button>
                    </div>
                    <div class="api-column">
                        Position
                        <button v-on:click="setSideBarPosition('left')">setSideBarPosition('left')</button>
                        <button v-on:click="setSideBarPosition('right')">setSideBarPosition('right')</button>
                    </div>
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
            columnDefs: [{field:"athlete",
filter:"agTextColumnFilter",
minWidth:200},{field:"age"},{field:"country",
minWidth:200},{field:"year"},{field:"date",
minWidth:160},{field:"gold"},{field:"silver"},{field:"bronze"},{field:"total"}],
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
    sortable: true,
    filter: true,
},
            sideBar: null,
rowData: null
        }
    },
    created() {
        this.sideBar = {"toolPanels":[{"id":"columns","labelDefault":"Columns","labelKey":"columns","iconKey":"columns","toolPanel":"agColumnsToolPanel"},{"id":"filters","labelDefault":"Filters","labelKey":"filters","iconKey":"filter","toolPanel":"agFiltersToolPanel"}],"defaultToolPanel":"filters","hiddenByDefault":true}
    },
    methods: {
        setSideBarVisible(value) {
    this.gridApi.setSideBarVisible(value);
},
isSideBarVisible() {
    alert(this.gridApi.isSideBarVisible());
},
openToolPanel(key) {
    this.gridApi.openToolPanel(key);
},
closeToolPanel() {
    this.gridApi.closeToolPanel();
},
getOpenedToolPanel() {
    alert(this.gridApi.getOpenedToolPanel());
},
setSideBar(def) {
    this.gridApi.setSideBar(def);
},
getSideBar() {
    var sideBar = this.gridApi.getSideBar();
    alert(JSON.stringify(sideBar));
    console.log(sideBar);
},
setSideBarPosition(position) {
    this.gridApi.setSideBarPosition(position);
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



new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
