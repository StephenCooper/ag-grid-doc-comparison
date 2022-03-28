
import Vue from 'vue';
import { AgGridVue } from 'ag-grid-vue';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import DragSourceRenderer from './dragSourceRendererVue.js';



const VueExample = {
    template: `
        <div style="height: 100%">
            <div class="outer">
                <div class="grid-col">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :rowClassRules="rowClassRules"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :rowDragManaged="true"
                :animateRows="true"></ag-grid-vue>
                </div>
                <div class="drop-col" v-on:dragover="onDragOver($event)" v-on:drop="onDrop($event)">
                    <span id="eDropTarget" class="drop-target">
                        ==&gt; Drop to here
                    </span>
                    <div id="eJsonDisplay" class="json-display">
                    </div>
                </div>
            </div>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        DragSourceRenderer
    },
    data: function() {
        return {
            columnDefs: [{cellRenderer:'DragSourceRenderer',
minWidth:100},{field:"id"},{field:"color"},{field:"value1"},{field:"value2"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    width: 80,
    sortable: true,
    filter: true,
    resizable: true,
},
            rowClassRules: null,
rowData: null
        }
    },
    created() {
        this.rowClassRules = {
    'red-row': 'data.color == "Red"',
    'green-row': 'data.color == "Green"',
    'blue-row': 'data.color == "Blue"',
};
this.rowData = getData()
    },
    methods: {
        onDragOver(event) {
    var types = event.dataTransfer.types;
    var dragSupported = types.length;
    if (dragSupported) {
        event.dataTransfer.dropEffect = 'move';
    }
    event.preventDefault();
},
onDrop(event) {
    event.preventDefault();
    var textData = event.dataTransfer.getData('text/plain');
    var eJsonRow = document.createElement('div');
    eJsonRow.classList.add('json-row');
    eJsonRow.innerText = textData;
    var eJsonDisplay = document.querySelector('#eJsonDisplay');
    eJsonDisplay.appendChild(eJsonRow);
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    },
    }
}



new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
