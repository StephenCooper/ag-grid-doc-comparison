
import { createApp } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';



const VueExample = {
    template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div class="example-header">
                    <div style="padding: 4px;">
                        <button v-on:click="clearPinned()">Clear Pinned</button>
                        <button v-on:click="resetPinned()">Left = #, Athlete, Age; Right = Total</button>
                        <button v-on:click="pinCountry()">Left = Country</button>
                    </div>
                
                    <div style="padding: 4px;">
                        Jump to:
                        <input placeholder="row" type="text" style="width: 40px" id="row" v-on:input="jumpToRow()">
                        <input placeholder="col" type="text" style="width: 40px" id="col" v-on:input="jumpToCol()">
                    </div>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"></ag-grid-vue>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{headerName:"#",
colId:"rowNum",
valueGetter:"node.id",
width:80,
pinned:"left"},{field:"athlete",
width:150,
pinned:"left"},{field:"age",
width:90,
pinned:"left"},{field:"country",
width:150},{field:"year",
width:90},{field:"date",
width:110},{field:"sport",
width:150},{field:"gold",
width:100},{field:"silver",
width:100},{field:"bronze",
width:100},{field:"total",
width:100,
pinned:"right"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    resizable: true,
},
            rowData: null
        }
    },
    created() {
        
    },
    methods: {
        clearPinned() {
    this.gridColumnApi.applyColumnState({ defaultState: { pinned: null } });
},
resetPinned() {
    this.gridColumnApi.applyColumnState({
        state: [
            { colId: 'rowNum', pinned: 'left' },
            { colId: 'athlete', pinned: 'left' },
            { colId: 'age', pinned: 'left' },
            { colId: 'total', pinned: 'right' },
        ],
        defaultState: { pinned: null },
    });
},
pinCountry() {
    this.gridColumnApi.applyColumnState({
        state: [{ colId: 'country', pinned: 'left' }],
        defaultState: { pinned: null },
    });
},
jumpToCol() {
    const value = (document.getElementById('col')).value;
    if (typeof value !== 'string' || value === '') {
        return;
    }
    const index = Number(value);
    if (typeof index !== 'number' || isNaN(index)) {
        return;
    }
    // it's actually a column the api needs, so look the column up
    const allColumns = this.gridColumnApi.getAllColumns();
    if (allColumns) {
        const column = allColumns[index];
        if (column) {
            this.gridApi.ensureColumnVisible(column);
        }
    }
},
jumpToRow() {
    var value = (document.getElementById('row')).value;
    const index = Number(value);
    if (typeof index === 'number' && !isNaN(index)) {
        this.gridApi.ensureIndexVisible(index);
    }
},
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



createApp(VueExample)
    .mount("#app")

