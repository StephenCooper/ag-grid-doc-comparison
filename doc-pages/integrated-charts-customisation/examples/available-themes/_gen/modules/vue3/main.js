
import { createApp } from 'vue';
import { AgGridVue } from '@ag-grid-community/vue3';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { GridChartsModule } from '@ag-grid-enterprise/charts';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule, GridChartsModule, RowGroupingModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <div class="wrapper">
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :popupParent="popupParent"
                :enableRangeSelection="true"
                :enableCharts="true"
                :chartThemes="chartThemes"
                :chartThemeOverrides="chartThemeOverrides"
                :rowData="rowData"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
                <div id="myChart" class="my-chart"></div>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"country",
width:150},{field:"gold"},{field:"silver"},{field:"bronze"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
},
            popupParent: null,
chartThemes: null,
chartThemeOverrides: null,
rowData: null
        }
    },
    created() {
        this.popupParent = document.body;
this.chartThemes = ['ag-pastel', 'ag-material-dark', 'ag-vivid-dark', 'ag-solar'];
this.chartThemeOverrides = {
    cartesian: {
        axes: {
            category: {
                label: {
                    rotation: 335,
                },
            },
        },
    },
};
this.rowData = getData()
    },
    methods: {
        onFirstDataRendered(params) {
    var createRangeChartParams = {
        cellRange: {
            rowStartIndex: 0,
            rowEndIndex: 79,
            columns: ['country', 'gold', 'silver', 'bronze'],
        },
        chartType: 'groupedColumn',
        chartContainer: document.querySelector('#myChart'),
        aggFunc: 'sum',
    };
    params.api.createRangeChart(createRangeChartParams);
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    },
    }
}



createApp(VueExample)
    .mount("#app")

