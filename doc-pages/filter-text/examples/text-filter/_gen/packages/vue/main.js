
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
            columnDefs: [{field:"athlete",
filterParams:athleteFilterParams},{field:"country",
filter:"agTextColumnFilter",
filterParams:countryFilterParams},{field:"sport",
filter:"agTextColumnFilter",
filterParams:{"caseSensitive":true,"defaultOption":"startsWith"}}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    sortable: true,
    filter: true,
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

window.contains = function contains(target, lookingFor) {
    return target && target.indexOf(lookingFor) >= 0;
}

var athleteFilterParams = {
    filterOptions: ['contains', 'notContains'],
    textFormatter: function (r) {
        if (r == null)
            return null;
        return r
            .toLowerCase()
            .replace(/[àáâãäå]/g, 'a')
            .replace(/æ/g, 'ae')
            .replace(/ç/g, 'c')
            .replace(/[èéêë]/g, 'e')
            .replace(/[ìíîï]/g, 'i')
            .replace(/ñ/g, 'n')
            .replace(/[òóôõö]/g, 'o')
            .replace(/œ/g, 'oe')
            .replace(/[ùúûü]/g, 'u')
            .replace(/[ýÿ]/g, 'y');
    },
    debounceMs: 200,
    suppressAndOrCondition: true,
};

var countryFilterParams = {
    filterOptions: ['contains'],
    textMatcher: function ({ value, filterText }) {
        var filterTextLowerCase = filterText ? filterText.toLowerCase() : '';
        var valueLowerCase = value.toString().toLowerCase();
        var aliases = {
            usa: 'united states',
            holland: 'netherlands',
            vodka: 'russia',
            niall: 'ireland',
            sean: 'south africa',
            alberto: 'mexico',
            john: 'australia',
            xi: 'china',
        };
        var literalMatch = contains(valueLowerCase, filterTextLowerCase);
        return (!!literalMatch || !!contains(valueLowerCase, aliases[filterTextLowerCase]));
    },
    trimInput: true,
    debounceMs: 1000,
};

new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
