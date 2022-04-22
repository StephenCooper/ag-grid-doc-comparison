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
                :pivotMode="true"
                :suppressAggFuncInHeader="true"
                :processSecondaryColDef="processSecondaryColDef"
                :processSecondaryColGroupDef="processSecondaryColGroupDef"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'country', rowGroup: true, enableRowGroup: true },
        {
          field: 'year',
          pivot: true,
          enablePivot: true,
          pivotComparator: MyYearPivotComparator,
        },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold', aggFunc: 'sum' },
        { field: 'silver', aggFunc: 'sum' },
        { field: 'bronze', aggFunc: 'sum' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
        resizable: true,
      },
      autoGroupColumnDef: null,
      processSecondaryColDef: null,
      processSecondaryColGroupDef: null,
      rowData: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      minWidth: 250,
    };
    this.processSecondaryColDef = (colDef) => {
      if (
        _optionalChain([
          colDef,
          'access',
          (_) => _.pivotValueColumn,
          'optionalAccess',
          (_2) => _2.getId,
          'call',
          (_3) => _3(),
        ]) === 'gold'
      ) {
        colDef.headerName = _optionalChain([
          colDef,
          'access',
          (_4) => _4.headerName,
          'optionalAccess',
          (_5) => _5.toUpperCase,
          'call',
          (_6) => _6(),
        ]);
      }
    };
    this.processSecondaryColGroupDef = (colGroupDef) => {
      // for fun, add a css class for 2010
      if (
        _optionalChain([
          colGroupDef,
          'access',
          (_7) => _7.pivotKeys,
          'optionalAccess',
          (_8) => _8.length,
        ]) &&
        colGroupDef.pivotKeys[0] === '2010'
      ) {
        colGroupDef.headerClass = 'color-background';
      }
      // put 'year' in front of each group
      colGroupDef.headerName = 'Year ' + colGroupDef.headerName;
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

window._optionalChain = function _optionalChain(ops) {
  let lastAccessLHS = undefined;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) {
      return undefined;
    }
    if (op === 'access' || op === 'optionalAccess') {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === 'call' || op === 'optionalCall') {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = undefined;
    }
  }
  return value;
};

window.MyYearPivotComparator = function MyYearPivotComparator(a, b) {
  var requiredOrder = ['2012', '2010', '2008', '2006', '2004', '2002', '2000'];
  return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
};

createApp(VueExample).mount('#app');
