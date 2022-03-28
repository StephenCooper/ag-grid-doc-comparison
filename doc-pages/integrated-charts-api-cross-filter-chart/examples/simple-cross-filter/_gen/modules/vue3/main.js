
import { createApp } from 'vue';
import { AgGridVue } from '@ag-grid-community/vue3';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { GridChartsModule } from '@ag-grid-enterprise/charts';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule, GridChartsModule, SetFilterModule, MultiFilterModule, FiltersToolPanelModule, ColumnsToolPanelModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <div id="wrapper">
                <div id="pieChart" class="ag-theme-alpine-dark"></div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :enableCharts="true"
                :chartThemes="chartThemes"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"salesRep",
chartDataType:"category"},{field:"handset",
chartDataType:"category"},{field:"sale",
chartDataType:"series"},{field:"saleDate",
chartDataType:"category"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    sortable: true,
    filter: 'agSetColumnFilter',
    floatingFilter: true,
    resizable: true,
},
            rowData: null,
chartThemes: null
        }
    },
    created() {
        this.rowData = getData();
this.chartThemes = ['ag-default-dark']
    },
    methods: {
        onFirstDataRendered(params) {
    params.api.createCrossFilterChart({
        chartType: 'pie',
        cellRange: {
            columns: ['salesRep', 'sale'],
        },
        aggFunc: 'sum',
        chartThemeOverrides: {
            common: {
                title: {
                    enabled: true,
                    text: 'Sales by Representative ($)',
                },
            },
            pie: {
                series: {
                    title: {
                        enabled: false,
                    },
                    label: {
                        enabled: false,
                    },
                },
            },
        },
        chartContainer: document.querySelector('#pieChart'),
    });
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    },
    }
}



createApp(VueExample)
    .mount("#app")

