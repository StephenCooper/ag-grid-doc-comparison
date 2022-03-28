
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
                :enableRangeSelection="true"
                :enableCharts="true"
                :rowData="rowData"
                @chart-created="onChartCreated"
                @chart-range-selection-changed="onChartRangeSelectionChanged"
                @chart-options-changed="onChartOptionsChanged"
                @chart-destroyed="onChartDestroyed"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"Month",
width:150,
chartDataType:"category"},{field:"Sunshine (hours)",
chartDataType:"series"},{field:"Rainfall (mm)",
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
rowData: null
        }
    },
    created() {
        this.popupParent = document.body
    },
    methods: {
        onChartCreated(event) {
    console.log('Created chart with ID ' + event.chartId, event);
},
onChartRangeSelectionChanged(event) {
    console.log('Changed range selection of chart with ID ' + event.chartId, event);
},
onChartOptionsChanged(event) {
    console.log('Changed options of chart with ID ' + event.chartId, event);
},
onChartDestroyed(event) {
    console.log('Destroyed chart with ID ' + event.chartId, event);
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        

        
            const updateData = (data) => {
    this.rowData = data;
};
            
            fetch('https://www.ag-grid.com/example-assets/weather-se-england.json')
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
