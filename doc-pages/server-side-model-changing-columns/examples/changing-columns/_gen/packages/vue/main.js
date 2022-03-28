
import Vue from 'vue';
import { AgGridVue } from 'ag-grid-vue';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';



const VueExample = {
    template: `
        <div style="height: 100%">
            <div class="test-container">
                <div class="test-header">
                    Select columns to show then hit 'Apply'
                </div>
                <div class="test-header">
                    <label><input type="checkbox" id="athlete">Athlete</label>
                    <label><input type="checkbox" id="age">Age</label>
                    <label><input type="checkbox" id="country">Country</label>
                    <label><input type="checkbox" id="year">Year</label>
                    <label><input type="checkbox" id="sport">Sport</label>
                    <label><input type="checkbox" id="gold">Gold</label>
                    <label><input type="checkbox" id="silver">Silver</label>
                    <label><input type="checkbox" id="bronze">Bronze</label>
                    <button v-on:click="onBtApply()">Apply</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"
                :animateRows="true"
                :suppressAggFuncInHeader="true"></ag-grid-vue>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [
    colDefAthlete,
    colDefAge,
    colDefCountry,
    colDefYear,
    colDefSport,
    colDefGold,
    colDefSilver,
    colDefBronze,
],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    minWidth: 120,
    resizable: true,
    sortable: true,
},
            autoGroupColumnDef: null,
rowModelType: null,
serverSideStoreType: null
        }
    },
    created() {
        this.autoGroupColumnDef = {
    minWidth: 200,
};
this.rowModelType = 'serverSide';
this.serverSideStoreType = 'partial'
    },
    methods: {
        onBtApply() {
    var cols = [];
    if (getBooleanValue('#athlete')) {
        cols.push(colDefAthlete);
    }
    if (getBooleanValue('#age')) {
        cols.push(colDefAge);
    }
    if (getBooleanValue('#country')) {
        cols.push(colDefCountry);
    }
    if (getBooleanValue('#year')) {
        cols.push(colDefYear);
    }
    if (getBooleanValue('#sport')) {
        cols.push(colDefSport);
    }
    if (getBooleanValue('#gold')) {
        cols.push(colDefGold);
    }
    if (getBooleanValue('#silver')) {
        cols.push(colDefSilver);
    }
    if (getBooleanValue('#bronze')) {
        cols.push(colDefBronze);
    }
    this.gridApi.setColumnDefs(cols);
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        

        
    (document.getElementById('athlete')).checked = true;
    (document.getElementById('age')).checked = true;
    (document.getElementById('country')).checked = true;
    (document.getElementById('year')).checked = true;
    (document.getElementById('sport')).checked = true;
    (document.getElementById('gold')).checked = true;
    (document.getElementById('silver')).checked = true;
    (document.getElementById('bronze')).checked = true;

        
            const updateData = (data) => {
    // setup the fake server with entire dataset
    fakeServer = new FakeServer(data);
    // create datasource with a reference to the fake server
    var datasource = getServerSideDatasource(fakeServer);
    // register the datasource with the grid
    params.api.setServerSideDatasource(datasource);
};
            
            fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => updateData(data));
    },
    }
}

window.getAthletesAsync = function getAthletesAsync(params) {
    var countries = fakeServer.getAthletes();
    // simulating real server call with a 500ms delay
    setTimeout(function () {
        params.success(countries);
    }, 500);
}

window.getBooleanValue = function getBooleanValue(cssSelector) {
    return (document.querySelector(cssSelector)).checked === true;
}

window.getServerSideDatasource = function getServerSideDatasource(server) {
    return {
        getRows: function (params) {
            console.log('[Datasource] - rows requested by grid: ', params.request);
            var response = server.getData(params.request);
            // adding delay to simulate real server call
            setTimeout(function () {
                if (response.success) {
                    // call the success callback
                    params.success({ rowData: response.rows, rowCount: response.lastRow });
                }
                else {
                    // inform the grid request failed
                    params.fail();
                }
            }, 200);
        },
    };
}

var colDefCountry = { field: 'country', rowGroup: true };

var colDefYear = { field: 'year', rowGroup: true };

var colDefAthlete = {
    field: 'athlete',
    filter: 'agSetColumnFilter',
    filterParams: {
        values: getAthletesAsync,
    },
    menuTabs: ['filterMenuTab'],
};

var colDefAge = { field: 'age' };

var colDefSport = { field: 'sport' };

var colDefGold = { field: 'gold', aggFunc: 'sum' };

var colDefSilver = { field: 'silver', aggFunc: 'sum' };

var colDefBronze = { field: 'bronze', aggFunc: 'sum' };

var fakeServer = undefined;

new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
