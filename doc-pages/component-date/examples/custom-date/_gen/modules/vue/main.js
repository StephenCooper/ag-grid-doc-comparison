
import Vue from 'vue';
import { AgGridVue } from '@ag-grid-community/vue';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import CustomDateComponent from './customDateComponentVue.js';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])



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
        agDateInput:CustomDateComponent
    },
    data: function() {
        return {
            columnDefs: [{field:"athlete"},{field:"age",
filter:"agNumberColumnFilter"},{field:"country"},{field:"year"},{field:"date",
minWidth:190,
filter:"agDateColumnFilter",
filterParams:filterParams},{field:"sport"},{field:"gold",
filter:"agNumberColumnFilter"},{field:"silver",
filter:"agNumberColumnFilter"},{field:"bronze",
filter:"agNumberColumnFilter"},{field:"total",
filter:false}],
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
        
    },
    methods: {
        onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        

        
            const updateData = (data) => {
    this.rowData = data;
};
            
            fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => updateData(data));
    },
    }
}

const filterParams = {
    comparator: (filterLocalDateAtMidnight, cellValue) => {
        const dateAsString = cellValue;
        const dateParts = dateAsString.split('/');
        const cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
        }
        if (cellDate < filterLocalDateAtMidnight) {
            return -1;
        }
        if (cellDate > filterLocalDateAtMidnight) {
            return 1;
        }
    },
};

new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
