
import Vue from 'vue';
import { AgGridVue } from '@ag-grid-community/vue';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, SetFilterModule, MenuModule, ColumnsToolPanelModule, FiltersToolPanelModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="printFilterModel()">Print Filter Model</button>
                </div> 
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :sideBar="sideBar"
                :rowData="rowData"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{headerName:"Country (Complex Object)",
field:"country",
keyCreator:countryKeyCreator,
valueFormatter:countryValueFormatter,
filter:"agSetColumnFilter"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    floatingFilter: true,
},
            sideBar: null,
rowData: null
        }
    },
    created() {
        this.sideBar = 'filters'
    },
    methods: {
        onFirstDataRendered(params) {
    ((params.api.getToolPanelInstance('filters'))).expandFilters();
},
printFilterModel() {
    var filterModel = this.gridApi.getFilterModel();
    console.log(filterModel);
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        

        
            const updateData = (data) => {
    // hack the data, replace each country with an object of country name and code
    data.forEach(function (row) {
        var countryName = row.country;
        var countryCode = countryName.substring(0, 2).toUpperCase();
        row.country = {
            name: countryName,
            code: countryCode,
        };
    });
    this.rowData = data;
};
            
            fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => updateData(data));
    },
    }
}

window.countryKeyCreator = function countryKeyCreator(params) {
    var countryObject = params.value;
    return countryObject.name;
}

window.countryValueFormatter = function countryValueFormatter(params) {
    return params.value.name;
}

new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
