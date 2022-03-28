
import Vue from 'vue';
import { AgGridVue } from 'ag-grid-vue';
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
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"athlete"},{field:"age",
maxWidth:90,
valueParser:numberParser,
cellClassRules:{"rag-green":"x < 20","rag-amber":"x >= 20 && x < 25","rag-red":"x >= 25"}},{field:"country"},{field:"year",
maxWidth:90,
valueParser:numberParser,
cellClassRules:ragCellClassRules,
cellRenderer:ragRenderer},{field:"date",
cellClass:"rag-amber"},{field:"sport",
cellClass:cellClass},{field:"gold",
valueParser:numberParser,
cellStyle:{"backgroundColor":"#aaffaa"}},{field:"silver",
valueParser:numberParser,
cellStyle:cellStyle},{field:"bronze",
valueParser:numberParser,
cellStyle:cellStyle}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    minWidth: 150,
    editable: true,
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

window.cellStyle = function cellStyle(params) {
    const color = numberToColor(params.value);
    return {
        backgroundColor: color,
    };
}

window.cellClass = function cellClass(params) {
    return params.value === 'Swimming' ? 'rag-green' : 'rag-amber';
}

window.numberToColor = function numberToColor(val) {
    if (val === 0) {
        return '#ffaaaa';
    }
    else if (val == 1) {
        return '#aaaaff';
    }
    else {
        return '#aaffaa';
    }
}

window.ragRenderer = function ragRenderer(params) {
    return '<span class="rag-element">' + params.value + '</span>';
}

window.numberParser = function numberParser(params) {
    const newValue = params.newValue;
    let valueAsNumber;
    if (newValue === null || newValue === undefined || newValue === '') {
        valueAsNumber = null;
    }
    else {
        valueAsNumber = parseFloat(params.newValue);
    }
    return valueAsNumber;
}

const ragCellClassRules = {
    'rag-green-outer': params => params.value === 2008,
    'rag-amber-outer': params => params.value === 2004,
    'rag-red-outer': params => params.value === 2000,
};

new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
