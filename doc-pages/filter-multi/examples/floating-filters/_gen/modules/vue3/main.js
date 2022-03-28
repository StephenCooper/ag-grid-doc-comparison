
import { createApp } from 'vue';
import { AgGridVue } from '@ag-grid-community/vue3';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MultiFilterModule, SetFilterModule, MenuModule, ClipboardModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"athlete",
filter:"agMultiColumnFilter"},{field:"gold",
filter:"agMultiColumnFilter",
filterParams:{"filters":[{"filter":"agNumberColumnFilter"},{"filter":"agSetColumnFilter"}]}},{field:"date",
filter:"agMultiColumnFilter",
filterParams:dateFilterParams}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    minWidth: 200,
    resizable: true,
    floatingFilter: true,
    menuTabs: ['filterMenuTab'],
},
            rowData: null
        }
    },
    created() {
        
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

window.getDate = function getDate(value) {
    var dateParts = value.split('/');
    return new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
}

var dateFilterParams = {
    filters: [
        {
            filter: 'agDateColumnFilter',
            filterParams: {
                comparator: function (filterDate, cellValue) {
                    if (cellValue == null)
                        return -1;
                    return getDate(cellValue).getTime() - filterDate.getTime();
                },
            },
        },
        {
            filter: 'agSetColumnFilter',
            filterParams: {
                comparator: function (a, b) {
                    return getDate(a).getTime() - getDate(b).getTime();
                },
            },
        },
    ],
};

createApp(VueExample)
    .mount("#app")

