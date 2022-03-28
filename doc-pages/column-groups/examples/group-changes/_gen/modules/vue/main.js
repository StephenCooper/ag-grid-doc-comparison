
import Vue from 'vue';
import { AgGridVue } from '@ag-grid-community/vue';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])



const VueExample = {
    template: `
        <div style="height: 100%">
            <div class="test-container">
                <div class="test-header">
                    <label>
                        <button v-on:click="onBtNoGroups()">No Groups</button>
                    </label>
                    <label>
                        <div class="participant-group legend-box"></div>
                        <button v-on:click="onParticipantInGroupOnly()">Participant in Group</button>
                    </label>
                    <label>
                        <div class="medals-group legend-box"></div>
                        <button v-on:click="onMedalsInGroupOnly()">Medals in Group</button>
                    </label>
                    <label>
                        <div class="participant-group legend-box"></div>
                        <div class="medals-group legend-box"></div>
                        <button v-on:click="onParticipantAndMedalsInGroups()">Participant and Medals in Group</button>
                    </label>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :maintainColumnOrder="true"
                :rowData="rowData"></ag-grid-vue>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"athlete",
colId:"athlete"},{field:"age",
colId:"age"},{field:"country",
colId:"country"},{field:"year",
colId:"year"},{field:"date",
colId:"date"},{field:"total",
colId:"total"},{field:"gold",
colId:"gold"},{field:"silver",
colId:"silver"},{field:"bronze",
colId:"bronze"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    initialWidth: 150,
    sortable: true,
    resizable: true,
    filter: true,
},
            rowData: null
        }
    },
    created() {
        
    },
    methods: {
        onBtNoGroups() {
    const columnDefs = [
        { field: 'athlete', colId: 'athlete' },
        { field: 'age', colId: 'age' },
        { field: 'country', colId: 'country' },
        { field: 'year', colId: 'year' },
        { field: 'date', colId: 'date' },
        { field: 'total', colId: 'total' },
        { field: 'gold', colId: 'gold' },
        { field: 'silver', colId: 'silver' },
        { field: 'bronze', colId: 'bronze' },
    ];
    this.gridApi.setColumnDefs(columnDefs);
},
onMedalsInGroupOnly() {
    const columnDefs = [
        { field: 'athlete', colId: 'athlete' },
        { field: 'age', colId: 'age' },
        { field: 'country', colId: 'country' },
        { field: 'year', colId: 'year' },
        { field: 'date', colId: 'date' },
        {
            headerName: 'Medals',
            headerClass: 'medals-group',
            children: [
                { field: 'total', colId: 'total' },
                { field: 'gold', colId: 'gold' },
                { field: 'silver', colId: 'silver' },
                { field: 'bronze', colId: 'bronze' },
            ],
        },
    ];
    this.gridApi.setColumnDefs(columnDefs);
},
onParticipantInGroupOnly() {
    const columnDefs = [
        {
            headerName: 'Participant',
            headerClass: 'participant-group',
            children: [
                { field: 'athlete', colId: 'athlete' },
                { field: 'age', colId: 'age' },
                { field: 'country', colId: 'country' },
                { field: 'year', colId: 'year' },
                { field: 'date', colId: 'date' },
            ],
        },
        { field: 'total', colId: 'total' },
        { field: 'gold', colId: 'gold' },
        { field: 'silver', colId: 'silver' },
        { field: 'bronze', colId: 'bronze' },
    ];
    this.gridApi.setColumnDefs(columnDefs);
},
onParticipantAndMedalsInGroups() {
    const columnDefs = [
        {
            headerName: 'Participant',
            headerClass: 'participant-group',
            children: [
                { field: 'athlete', colId: 'athlete' },
                { field: 'age', colId: 'age' },
                { field: 'country', colId: 'country' },
                { field: 'year', colId: 'year' },
                { field: 'date', colId: 'date' },
            ],
        },
        {
            headerName: 'Medals',
            headerClass: 'medals-group',
            children: [
                { field: 'total', colId: 'total' },
                { field: 'gold', colId: 'gold' },
                { field: 'silver', colId: 'silver' },
                { field: 'bronze', colId: 'bronze' },
            ],
        },
    ];
    this.gridApi.setColumnDefs(columnDefs);
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



new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
