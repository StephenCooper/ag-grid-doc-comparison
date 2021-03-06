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
                :autoGroupColumnDef="autoGroupColumnDef"
                :suppressAggFuncInHeader="true"
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
          field: 'country',
          rowGroup: true,
          hide: true,
          suppressColumnsToolPanel: true,
        },
        {
          field: 'sport',
          rowGroup: true,
          hide: true,
          suppressColumnsToolPanel: true,
        },
        {
          field: 'year',
          pivot: true,
          hide: true,
          suppressColumnsToolPanel: true,
        },
        { field: 'gold', aggFunc: 'sum', valueFormatter: numberFormatter },
        { field: 'silver', aggFunc: 'sum', valueFormatter: numberFormatter },
        {
          headerName: 'Ratio',
          colId: 'goldSilverRatio',
          aggFunc: ratioAggFunc,
          valueGetter: ratioValueGetter,
          valueFormatter: ratioFormatter,
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        sortable: true,
        filter: true,
      },
      autoGroupColumnDef: null,
      rowData: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      minWidth: 220,
    };
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

window.numberFormatter = function numberFormatter(params) {
  if (!params.value || params.value === 0) return '0';
  return '' + Math.round(params.value * 100) / 100;
};

window.ratioValueGetter = function ratioValueGetter(params) {
  if (!(params.node && params.node.group)) {
    // no need to handle group levels - calculated in the 'ratioAggFunc'
    return createValueObject(params.data.gold, params.data.silver);
  }
};

window.ratioAggFunc = function ratioAggFunc(params) {
  let goldSum = 0;
  let silverSum = 0;
  params.values.forEach((value) => {
    if (value && value.gold) {
      goldSum += value.gold;
    }
    if (value && value.silver) {
      silverSum += value.silver;
    }
  });
  return createValueObject(goldSum, silverSum);
};

window.createValueObject = function createValueObject(gold, silver) {
  return {
    gold: gold,
    silver: silver,
    toString: () => `${gold && silver ? gold / silver : 0}`,
  };
};

window.ratioFormatter = function ratioFormatter(params) {
  if (!params.value || params.value === 0) return '';
  return '' + Math.round(params.value * 100) / 100;
};

createApp(VueExample).mount('#app');
