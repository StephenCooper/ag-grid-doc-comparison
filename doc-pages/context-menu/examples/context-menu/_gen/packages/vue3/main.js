import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue3';
import { createApp } from 'vue';

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
  data: function () {
    return {
      columnDefs: [
        { field: 'athlete', minWidth: 200 },
        { field: 'age' },
        { field: 'country', minWidth: 200 },
        { field: 'year' },
        { field: 'date', minWidth: 180 },
        { field: 'sport', minWidth: 200 },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true,
      },
      rowData: null,
    };
  },
  created() {},
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => params.api.setRowData(data);

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
    getContextMenuItems(params) {
      var result = [
        {
          // custom item
          name: 'Alert ' + params.value,
          action: () => {
            window.alert('Alerting about ' + params.value);
          },
          cssClasses: ['redFont', 'bold'],
        },
        {
          // custom item
          name: 'Always Disabled',
          disabled: true,
          tooltip:
            'Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!',
        },
        {
          name: 'Country',
          subMenu: [
            {
              name: 'Ireland',
              action: () => {
                console.log('Ireland was pressed');
              },
              icon: createFlagImg('ie'),
            },
            {
              name: 'UK',
              action: () => {
                console.log('UK was pressed');
              },
              icon: createFlagImg('gb'),
            },
            {
              name: 'France',
              action: () => {
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
              action: () => {
                console.log('Niall was pressed');
              },
            },
            {
              name: 'Sean',
              action: () => {
                console.log('Sean was pressed');
              },
            },
            {
              name: 'John',
              action: () => {
                console.log('John was pressed');
              },
            },
            {
              name: 'Alberto',
              action: () => {
                console.log('Alberto was pressed');
              },
            },
            {
              name: 'Tony',
              action: () => {
                console.log('Tony was pressed');
              },
            },
            {
              name: 'Andrew',
              action: () => {
                console.log('Andrew was pressed');
              },
            },
            {
              name: 'Kev',
              action: () => {
                console.log('Kev was pressed');
              },
            },
            {
              name: 'Will',
              action: () => {
                console.log('Will was pressed');
              },
            },
            {
              name: 'Armaan',
              action: () => {
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
          action: () => {
            console.log('Windows Item Selected');
          },
          icon:
            '<img src="https://www.ag-grid.com/example-assets/skills/windows.png" />',
        },
        {
          // custom item
          name: 'Mac',
          shortcut: 'Alt + M',
          action: () => {
            console.log('Mac Item Selected');
          },
          icon:
            '<img src="https://www.ag-grid.com/example-assets/skills/mac.png"/>',
        },
        'separator',
        {
          // custom item
          name: 'Checked',
          checked: true,
          action: () => {
            console.log('Checked Selected');
          },
          icon:
            '<img src="https://www.ag-grid.com/example-assets/skills/mac.png"/>',
        },
        'copy',
        'separator',
        'chartRange',
      ];
      return result;
    },
  },
};

window.createFlagImg = function createFlagImg(flag) {
  return (
    '<img border="0" width="15" height="10" src="https://flags.fmcdn.net/data/flags/mini/' +
    flag +
    '.png"/>'
  );
};

createApp(VueExample).mount('#app');
