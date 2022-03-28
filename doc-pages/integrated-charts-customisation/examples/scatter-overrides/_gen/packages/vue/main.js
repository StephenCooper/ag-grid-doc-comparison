
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
                :popupParent="popupParent"
                :rowData="rowData"
                :enableRangeSelection="true"
                :enableCharts="true"
                :chartThemeOverrides="chartThemeOverrides"
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
chartDataType:"category"},{field:"total",
chartDataType:"series"},{field:"gold",
chartDataType:"series"},{field:"silver",
chartDataType:"series"},{field:"bronze",
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
            popupParent: null,
rowData: null,
chartThemeOverrides: null
        }
    },
    created() {
        this.popupParent = document.body;
this.rowData = getData();
this.chartThemeOverrides = {
    scatter: {
        series: {
            fillOpacity: 0.7,
            strokeOpacity: 0.6,
            strokeWidth: 2,
            highlightStyle: {
                item: {
                    fill: 'red',
                    stroke: 'yellow',
                },
            },
            marker: {
                enabled: true,
                shape: 'square',
                size: 5,
                maxSize: 12,
                strokeWidth: 4,
            },
            tooltip: {
                renderer: (params) => {
                    var label = params.datum[params.labelKey];
                    var size = params.datum[params.sizeKey];
                    return {
                        content: (label != null
                            ? '<b>' +
                                params.labelName.toUpperCase() +
                                ':</b> ' +
                                label +
                                '<br/>'
                            : '') +
                            '<b>' +
                            params.xName.toUpperCase() +
                            ':</b> ' +
                            params.xValue +
                            '<br/>' +
                            '<b>' +
                            params.yName.toUpperCase() +
                            ':</b> ' +
                            params.yValue +
                            (size != null
                                ? '<br/><b>' + params.sizeName.toUpperCase() + ':</b> ' + size
                                : ''),
                    };
                },
            },
        },
    },
}
    },
    methods: {
        onFirstDataRendered(params) {
    var cellRange = {
        rowStartIndex: 0,
        rowEndIndex: 4,
        columns: ['country', 'total', 'gold', 'silver', 'bronze'],
    };
    var createRangeChartParams = {
        cellRange: cellRange,
        chartType: 'scatter',
    };
    params.api.createRangeChart(createRangeChartParams);
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    },
    }
}



new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
