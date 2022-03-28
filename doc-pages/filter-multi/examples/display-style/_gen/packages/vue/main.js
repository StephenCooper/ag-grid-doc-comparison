
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
                :sideBar="sideBar"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"athlete",
filter:"agMultiColumnFilter",
filterParams:{"filters":[{"filter":"agTextColumnFilter","display":"subMenu"},{"filter":"agSetColumnFilter"}]}},{field:"country",
filter:"agMultiColumnFilter",
filterParams:{"filters":[{"filter":"agTextColumnFilter","display":"accordion","title":"Expand Me for Text Filters"},{"filter":"agSetColumnFilter","display":"accordion"}]}},{field:"sport",
filter:"agMultiColumnFilter"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    minWidth: 200,
    resizable: true,
    menuTabs: ['filterMenuTab'],
},
            sideBar: null,
rowData: null
        }
    },
    created() {
        this.sideBar = {"toolPanels":[{"id":"filters","labelDefault":"Filters","labelKey":"filters","iconKey":"filter","toolPanel":"agFiltersToolPanel"}]}
    },
    methods: {
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
