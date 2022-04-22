import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue3';
import { createApp } from 'vue';
import MoodEditor from './moodEditorVue.js';
import NumericCellEditor from './numericCellEditorVue.js';

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                    style="width: 100%; height: 100%;"
                    class="ag-theme-alpine"
                    id="myGrid"
                    :columnDefs="columnDefs"
                    @grid-ready="onGridReady"
                    :defaultColDef="defaultColDef"
                    :rowData="rowData"
                    
                    @row-editing-started="onRowEditingStarted"
                    @row-editing-stopped="onRowEditingStopped"
                    @cell-editing-started="onCellEditingStarted"
                    @cell-editing-stopped="onCellEditingStopped"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
    MoodEditor,
    NumericCellEditor,
  },
  data: function () {
    return {
      columnDefs: [
        {
          field: 'type',
        },
        {
          field: 'value',
          editable: true,
          cellEditorSelector: function (params) {
            if (params.data.type === 'age') {
              return {
                component: 'NumericCellEditor',
              };
            }
            if (params.data.type === 'gender') {
              return {
                component: 'agRichSelectCellEditor',
                params: {
                  values: ['Male', 'Female'],
                },
                popup: true,
              };
            }
            if (params.data.type === 'mood') {
              return {
                component: 'MoodEditor',
                popup: true,
                popupPosition: 'under',
              };
            }
            return undefined;
          },
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
      },
      rowData: null,
    };
  },
  created() {
    this.rowData = getData();
  },
  methods: {
    onRowEditingStarted(event) {
      console.log('never called - not doing row editing');
    },
    onRowEditingStopped(event) {
      console.log('never called - not doing row editing');
    },
    onCellEditingStarted(event) {
      console.log('cellEditingStarted');
    },
    onCellEditingStopped(event) {
      console.log('cellEditingStopped');
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

createApp(VueExample).mount('#app');
