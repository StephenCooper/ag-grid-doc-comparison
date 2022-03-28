
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
            <div style="display: flex; flex-direction: column; height: 100%; width: 100%; overflow: hidden;">
                <ag-grid-vue
                
                style="width: 100%; height: 30%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :enableRangeSelection="true"
                :enableCharts="true"
                :popupParent="popupParent"
                :getChartToolbarItems="getChartToolbarItems"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
                <div id="chart1" style="flex: 1 1 auto; overflow: hidden; height: 30%;"></div>
                <div style="display: flex; flex: 1 1 auto; overflow: hidden; height: 30%;">
                    <div id="chart2" style="flex: 1 1 auto; overflow: hidden; width: 50%;"></div>
                    <div id="chart3" style="flex: 1 1 auto; overflow: hidden; width: 50%;"></div>
                </div>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"country",
width:150,
chartDataType:"category"},{field:"group",
chartDataType:"category"},{field:"gold",
chartDataType:"series",
editable:true,
valueParser:numberValueParser},{field:"silver",
chartDataType:"series",
editable:true,
valueParser:numberValueParser},{field:"bronze",
chartDataType:"series",
editable:true,
valueParser:numberValueParser},{field:"a",
chartDataType:"series",
editable:true,
valueParser:numberValueParser},{field:"b",
chartDataType:"series",
editable:true,
valueParser:numberValueParser},{field:"c",
chartDataType:"series",
editable:true,
valueParser:numberValueParser},{field:"d",
chartDataType:"series",
editable:true,
valueParser:numberValueParser}],
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
popupParent: null
        }
    },
    created() {
        this.rowData = getData();
this.popupParent = document.body
    },
    methods: {
        onFirstDataRendered(event) {
    var eContainer1 = document.querySelector('#chart1');
    var params1 = {
        cellRange: {
            rowStartIndex: 0,
            rowEndIndex: 4,
            columns: ['country', 'gold', 'silver'],
        },
        chartType: 'groupedBar',
        chartContainer: eContainer1,
    };
    event.api.createRangeChart(params1);
    var eContainer2 = document.querySelector('#chart2');
    var params2 = {
        cellRange: {
            columns: ['group', 'gold'],
        },
        chartType: 'pie',
        chartContainer: eContainer2,
        aggFunc: 'sum',
        chartThemeOverrides: {
            common: {
                padding: {
                    top: 20,
                    left: 10,
                    bottom: 30,
                    right: 10,
                },
                legend: {
                    enabled: true,
                    position: 'bottom',
                },
            },
        },
    };
    event.api.createRangeChart(params2);
    var eContainer3 = document.querySelector('#chart3');
    var params3 = {
        cellRange: {
            columns: ['group', 'silver'],
        },
        chartType: 'pie',
        chartContainer: eContainer3,
        aggFunc: 'sum',
        chartThemeOverrides: {
            common: {
                padding: {
                    top: 20,
                    left: 10,
                    bottom: 30,
                    right: 10,
                },
                legend: {
                    enabled: true,
                    position: 'bottom',
                },
            },
        },
    };
    event.api.createRangeChart(params3);
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    },
getChartToolbarItems(params) {
    return [];
},
    }
}

window.numberValueParser = function numberValueParser(params) {
    var res = Number.parseInt(params.newValue);
    if (isNaN(res)) {
        return undefined;
    }
    return res;
}

createApp(VueExample)
    .mount("#app")

