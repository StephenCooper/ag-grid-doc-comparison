
import { createApp } from 'vue';
import { AgGridVue } from '@ag-grid-community/vue3';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { GridChartsModule } from '@ag-grid-enterprise/charts';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule, GridChartsModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :popupParent="popupParent"
                :enableRangeSelection="true"
                :enableCharts="true"
                :chartThemeOverrides="chartThemeOverrides"
                :getChartToolbarItems="getChartToolbarItems"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"country",
width:150,
chartDataType:"category"},{field:"gold",
chartDataType:"series"},{field:"silver",
chartDataType:"series"},{field:"bronze",
chartDataType:"series"},{headerName:"A",
valueGetter:"Math.floor(Math.random()*1000)",
chartDataType:"series"},{headerName:"B",
valueGetter:"Math.floor(Math.random()*1000)",
chartDataType:"series"},{headerName:"C",
valueGetter:"Math.floor(Math.random()*1000)",
chartDataType:"series"},{headerName:"D",
valueGetter:"Math.floor(Math.random()*1000)",
chartDataType:"series"}],
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
            rowData: null,
popupParent: null,
chartThemeOverrides: null
        }
    },
    created() {
        this.rowData = getData();
this.popupParent = document.body;
this.chartThemeOverrides = {
    pie: {
        title: {
            enabled: true,
            text: 'Precious Metals Production',
            fontWeight: 'bold',
            fontSize: 20,
            color: 'rgb(100, 100, 100)',
        },
        subtitle: {
            enabled: true,
            text: 'by country',
            fontStyle: 'italic',
            fontWeight: 'bold',
            fontSize: 14,
            color: 'rgb(100, 100, 100)',
        },
        padding: {
            top: 25,
            right: 20,
            bottom: 55,
            left: 20,
        },
        legend: {
            enabled: false,
        },
        series: {
            label: {
                enabled: true,
            },
            callout: {
                length: 20,
            },
        },
    },
}
    },
    methods: {
        onFirstDataRendered(params) {
    var createRangeChartParams = {
        cellRange: {
            rowStartIndex: 0,
            rowEndIndex: 5,
            columns: ['country', 'gold'],
        },
        chartType: 'pie',
    };
    params.api.createRangeChart(createRangeChartParams);
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    },
getChartToolbarItems() {
    return ['chartDownload', 'chartData', 'chartSettings'];
},
    }
}



createApp(VueExample)
    .mount("#app")

