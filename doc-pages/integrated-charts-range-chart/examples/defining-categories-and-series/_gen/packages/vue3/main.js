
import { createApp } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';



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
                :chartThemeOverrides="chartThemeOverrides"
                :rowData="rowData"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
                <div id="myChart" class="ag-theme-alpine my-chart"></div>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"athlete",
width:150,
chartDataType:"category"},{field:"age",
chartDataType:"category",
sort:"asc"},{field:"sport"},{field:"year",
chartDataType:"excluded"},{field:"gold",
chartDataType:"series"},{field:"silver",
chartDataType:"series"},{field:"bronze"}],
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
chartThemeOverrides: null,
rowData: null
        }
    },
    created() {
        this.popupParent = document.body;
this.chartThemeOverrides = {
    common: {
        title: {
            enabled: true,
            text: 'Medals by Age',
        },
        legend: {
            position: 'bottom',
        },
    },
    column: {
        axes: {
            category: {
                label: {
                    rotation: 0,
                },
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
            rowEndIndex: 79,
            columns: ['age', 'gold', 'silver', 'bronze'],
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
        

        
            const updateData = (data) => {
    this.rowData = data;
};
            
            fetch('https://www.ag-grid.com/example-assets/wide-spread-of-sports.json')
                .then(resp => resp.json())
                .then(data => updateData(data));
    },
    }
}



createApp(VueExample)
    .mount("#app")

