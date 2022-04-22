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
                :sideBar="sideBar"
                :rowGroupPanelShow="rowGroupPanelShow"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          field: 'athlete',
          minWidth: 200,
          enableRowGroup: true,
          enablePivot: true,
        },
        { field: 'age', enableValue: true },
        {
          field: 'country',
          minWidth: 200,
          enableRowGroup: true,
          enablePivot: true,
          headerValueGetter: countryHeaderValueGetter,
        },
        { field: 'year', enableRowGroup: true, enablePivot: true },
        {
          field: 'date',
          minWidth: 180,
          enableRowGroup: true,
          enablePivot: true,
        },
        {
          field: 'sport',
          minWidth: 200,
          enableRowGroup: true,
          enablePivot: true,
        },
        {
          field: 'gold',
          hide: true,
          enableValue: true,
          toolPanelClass: 'tp-gold',
        },
        {
          field: 'silver',
          hide: true,
          enableValue: true,
          toolPanelClass: ['tp-silver'],
        },
        {
          field: 'bronze',
          hide: true,
          enableValue: true,
          toolPanelClass: (params) => {
            return 'tp-bronze';
          },
        },
        {
          headerName: 'Total',
          field: 'totalAgg',
          valueGetter:
            'node.group ? data.totalAgg : data.gold + data.silver + data.bronze',
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: true,
        filter: true,
      },
      sideBar: null,
      rowGroupPanelShow: null,
      rowData: null,
    };
  },
  created() {
    this.sideBar = 'columns';
    this.rowGroupPanelShow = 'always';
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => params.api.setRowData(data);

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

window.countryHeaderValueGetter = function countryHeaderValueGetter(params) {
  switch (params.location) {
    case 'csv':
      return 'CSV Country';
    case 'clipboard':
      return 'CLIP Country';
    case 'columnToolPanel':
      return 'TP Country';
    case 'columnDrop':
      return 'CD Country';
    case 'header':
      return 'H Country';
    default:
      return 'Should never happen!';
  }
};

createApp(VueExample).mount('#app');
