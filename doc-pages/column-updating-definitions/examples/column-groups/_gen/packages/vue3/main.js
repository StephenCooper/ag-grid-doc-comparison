
import { createApp } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';



const VueExample = {
    template: `
        <div style="height: 100%">
            <div class="test-container">
                <div class="test-header">
                    <button v-on:click="onBtSetA()">First Column Set</button>
                    <button v-on:click="onBtSetB()">Second Column Set</button>
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
            columnDefs: [{headerName:"Group A",
groupId:"groupA",
children: [{field:"athlete"},
{field:"age"},
{field:"country",
columnGroupShow:"open"}]},{headerName:"Group B",
children: [{field:"sport"},
{field:"year"},
{field:"date",
columnGroupShow:"open"}]},{headerName:"Group C",
groupId:"groupC",
children: [{field:"total"},
{field:"gold",
columnGroupShow:"open"},
{field:"silver",
columnGroupShow:"open"},
{field:"bronze",
columnGroupShow:"open"}]}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    initialWidth: 100,
    sortable: true,
    resizable: true,
},
            rowData: null
        }
    },
    created() {
        
    },
    methods: {
        onBtSetA() {
    this.gridApi.setColumnDefs(createColSetA());
},
onBtSetB() {
    this.gridApi.setColumnDefs(createColSetB());
},
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

window.createColSetA = function createColSetA() {
    return [
        {
            headerName: 'Group A',
            groupId: 'groupA',
            children: [
                { field: 'athlete' },
                { field: 'age' },
                { field: 'country', columnGroupShow: 'open' },
            ],
        },
        {
            headerName: 'Group B',
            children: [
                { field: 'sport' },
                { field: 'year' },
                { field: 'date', columnGroupShow: 'open' },
            ],
        },
        {
            headerName: 'Group C',
            groupId: 'groupC',
            children: [
                { field: 'total' },
                { field: 'gold', columnGroupShow: 'open' },
                { field: 'silver', columnGroupShow: 'open' },
                { field: 'bronze', columnGroupShow: 'open' },
            ],
        },
    ];
}

window.createColSetB = function createColSetB() {
    return [
        {
            headerName: 'GROUP A',
            groupId: 'groupA',
            children: [
                { field: 'athlete' },
                { field: 'age' },
                { field: 'country', columnGroupShow: 'open' },
            ],
        },
        {
            headerName: 'Group B',
            children: [
                { field: 'sport' },
                { field: 'year' },
                { field: 'date', columnGroupShow: 'open' },
            ],
        },
        {
            headerName: 'Group C',
            groupId: 'groupC',
            children: [
                { field: 'total' },
                { field: 'gold', columnGroupShow: 'open' },
                { field: 'silver', columnGroupShow: 'open' },
                { field: 'bronze', columnGroupShow: 'open' },
                { field: 'extraA' },
                { field: 'extraB', columnGroupShow: 'open' },
            ],
        },
    ];
}

createApp(VueExample)
    .mount("#app")

