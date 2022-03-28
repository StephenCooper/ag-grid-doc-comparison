
import Vue from 'vue';
import { AgGridVue } from '@ag-grid-community/vue';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RangeSelectionModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :enableRangeSelection="true"
                :enableFillHandle="true"
                :fillOperation="fillOperation"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"athlete",
minWidth:150},{headerName:"Day of the Week",
field:"dayOfTheWeek",
minWidth:180},{field:"age",
maxWidth:90},{field:"country",
minWidth:150},{field:"year",
maxWidth:90},{field:"date",
minWidth:150},{field:"sport",
minWidth:150},{field:"gold"},{field:"silver"},{field:"bronze"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    minWidth: 100,
    editable: true,
},
            fillOperation: null,
rowData: null
        }
    },
    created() {
        this.fillOperation = (params) => {
    var hasNonDayValues = params.initialValues.some(function (val) {
        return daysList.indexOf(val) === -1;
    });
    if (hasNonDayValues) {
        return false;
    }
    var lastValue = params.values[params.values.length - 1];
    var idxOfLast = daysList.indexOf(lastValue);
    return daysList[(idxOfLast + 1) % daysList.length];
}
    },
    methods: {
        onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        

        
            const updateData = (data) => {
    params.api.setRowData(createRowData(data));
};
            
            fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => updateData(data));
    },
    }
}

window.createRowData = function createRowData(data) {
    var rowData = data.slice(0, 100);
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    for (var i = 0; i < 100; i++) {
        var dt = new Date(getRandom(currentYear - 10, currentYear + 10), getRandom(0, 12), getRandom(1, 25));
        rowData[i].dayOfTheWeek = daysList[dt.getDay()];
    }
    return rowData;
}

var daysList = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

var getRandom = function (start, finish) {
    return Math.floor(Math.random() * (finish - start) + start);
};

new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
