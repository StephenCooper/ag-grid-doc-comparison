
import Vue from 'vue';
import { AgGridVue } from '@ag-grid-community/vue';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule, RangeSelectionModule, ClipboardModule])



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
                :rowSelection="rowSelection"
                :processCellForClipboard="processCellForClipboard"
                :processHeaderForClipboard="processHeaderForClipboard"
                :processGroupHeaderForClipboard="processGroupHeaderForClipboard"
                :processCellFromClipboard="processCellFromClipboard"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{headerName:"Participants",
children: [{field:"athlete",
headerName:"Athlete Name",
minWidth:200},
{field:"age"},
{field:"country",
minWidth:150}]},{headerName:"Olympic Games",
children: [{field:"year"},
{field:"date",
minWidth:150},
{field:"sport",
minWidth:150},
{field:"gold"},
{field:"silver",
suppressPaste:true},
{field:"bronze"},
{field:"total"}]}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    editable: true,
    flex: 1,
    minWidth: 100,
    resizable: true,
},
            rowSelection: null,
rowData: null
        }
    },
    created() {
        this.rowSelection = 'multiple'
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
processCellForClipboard(params) {
    return 'C-' + params.value;
},
processHeaderForClipboard(params) {
    const colDef = params.column.getColDef();
    let headerName = colDef.headerName || colDef.field || '';
    if (colDef.headerName !== '') {
        headerName = headerName.charAt(0).toUpperCase() + headerName.slice(1);
    }
    return 'H-' + headerName;
},
processGroupHeaderForClipboard(params) {
    const colGroupDef = params.columnGroup.getColGroupDef() || {};
    const headerName = colGroupDef.headerName || '';
    if (headerName === '') {
        return '';
    }
    return 'GH-' + headerName;
},
processCellFromClipboard(params) {
    return 'Z-' + params.value;
},
    }
}



new Vue({
    el: '#app',
    components: {
        'my-component': VueExample
    }
});
