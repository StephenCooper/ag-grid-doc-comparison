
import { createApp } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import SliderFloatingFilter from './sliderFloatingFilterVue.js';



const VueExample = {
    template: `
        <div style="height: 100%">
            <div style="height: 100%; box-sizing: border-box;">
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
        SliderFloatingFilter
    },
    data: function() {
        return {
            columnDefs: [{field:"country",
filter:false},{field:"language",
filter:false},{field:"name",
filter:false},{field:"gold",
floatingFilterComponent:'SliderFloatingFilter',
floatingFilterComponentParams:{"maxValue":7,"suppressFilterButton":true},
filter:"agNumberColumnFilter",
suppressMenu:false},{field:"silver",
filter:"agNumberColumnFilter",
floatingFilterComponent:'SliderFloatingFilter',
floatingFilterComponentParams:{"maxValue":5,"suppressFilterButton":true},
suppressMenu:false},{field:"bronze",
filter:"agNumberColumnFilter",
floatingFilterComponent:'SliderFloatingFilter',
floatingFilterComponentParams:{"maxValue":10,"suppressFilterButton":true},
suppressMenu:false}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    floatingFilter: true,
    resizable: true,
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
        

        params.api.sizeColumnsToFit();
    },
    }
}



createApp(VueExample)
    .mount("#app")

