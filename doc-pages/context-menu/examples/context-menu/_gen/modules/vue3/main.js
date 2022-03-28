
import { createApp } from 'vue';
import { AgGridVue } from '@ag-grid-community/vue3';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { GridChartsModule } from '@ag-grid-enterprise/charts';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule, ExcelExportModule, RangeSelectionModule, ClipboardModule, GridChartsModule])



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
                :allowContextMenuWithControlKey="true"
                :getContextMenuItems="getContextMenuItems"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{field:"athlete",
minWidth:200},{field:"age"},{field:"country",
minWidth:200},{field:"year"},{field:"date",
minWidth:180},{field:"sport",
minWidth:200},{field:"gold"},{field:"silver"},{field:"bronze"},{field:"total"}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    minWidth: 100,
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
        

        
            const updateData = (data) => params.api.setRowData(data);
            
            fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => updateData(data));
    },
getContextMenuItems(params) {
    var result = [
        {
            // custom item
            name: 'Alert ' + params.value,
            action: function () {
                window.alert('Alerting about ' + params.value);
            },
            cssClasses: ['redFont', 'bold'],
        },
        {
            // custom item
            name: 'Always Disabled',
            disabled: true,
            tooltip: 'Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!',
        },
        {
            name: 'Country',
            subMenu: [
                {
                    name: 'Ireland',
                    action: function () {
                        console.log('Ireland was pressed');
                    },
                    icon: createFlagImg('ie'),
                },
                {
                    name: 'UK',
                    action: function () {
                        console.log('UK was pressed');
                    },
                    icon: createFlagImg('gb'),
                },
                {
                    name: 'France',
                    action: function () {
                        console.log('France was pressed');
                    },
                    icon: createFlagImg('fr'),
                },
            ],
        },
        {
            name: 'Person',
            subMenu: [
                {
                    name: 'Niall',
                    action: function () {
                        console.log('Niall was pressed');
                    },
                },
                {
                    name: 'Sean',
                    action: function () {
                        console.log('Sean was pressed');
                    },
                },
                {
                    name: 'John',
                    action: function () {
                        console.log('John was pressed');
                    },
                },
                {
                    name: 'Alberto',
                    action: function () {
                        console.log('Alberto was pressed');
                    },
                },
                {
                    name: 'Tony',
                    action: function () {
                        console.log('Tony was pressed');
                    },
                },
                {
                    name: 'Andrew',
                    action: function () {
                        console.log('Andrew was pressed');
                    },
                },
                {
                    name: 'Kev',
                    action: function () {
                        console.log('Kev was pressed');
                    },
                },
                {
                    name: 'Will',
                    action: function () {
                        console.log('Will was pressed');
                    },
                },
                {
                    name: 'Armaan',
                    action: function () {
                        console.log('Armaan was pressed');
                    },
                },
            ],
        },
        'separator',
        {
            // custom item
            name: 'Windows',
            shortcut: 'Alt + W',
            action: function () {
                console.log('Windows Item Selected');
            },
            icon: '<img src="https://www.ag-grid.com/example-assets/skills/windows.png" />',
        },
        {
            // custom item
            name: 'Mac',
            shortcut: 'Alt + M',
            action: function () {
                console.log('Mac Item Selected');
            },
            icon: '<img src="https://www.ag-grid.com/example-assets/skills/mac.png"/>',
        },
        'separator',
        {
            // custom item
            name: 'Checked',
            checked: true,
            action: function () {
                console.log('Checked Selected');
            },
            icon: '<img src="https://www.ag-grid.com/example-assets/skills/mac.png"/>',
        },
        'copy',
        'separator',
        'chartRange',
    ];
    return result;
},
    }
}

window.createFlagImg = function createFlagImg(flag) {
    return ('<img border="0" width="15" height="10" src="https://flags.fmcdn.net/data/flags/mini/' +
        flag +
        '.png"/>');
}

createApp(VueExample)
    .mount("#app")

