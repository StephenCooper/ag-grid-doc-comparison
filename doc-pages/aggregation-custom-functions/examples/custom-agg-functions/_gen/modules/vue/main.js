import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from '@ag-grid-community/vue';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import Vue from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  SetFilterModule,
]);

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
                :enableRangeSelection="true"
                :suppressAggFuncInHeader="true"
                :aggFuncs="aggFuncs"
                :sideBar="true"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'country', rowGroup: true, hide: true },
        { field: 'year', rowGroup: true, hide: true },
        {
          headerName: 'minMax(age)',
          field: 'age',
          aggFunc: minAndMaxAggFunction,
        },
        {
          headerName: 'avg(age)',
          field: 'age',
          aggFunc: avgAggFunction,
          enableValue: true,
          minWidth: 200,
        },
        {
          headerName: 'roundedAvg(age)',
          field: 'age',
          aggFunc: roundedAvgAggFunction,
          enableValue: true,
          minWidth: 200,
        },
        {
          headerName: 'sum(gold)',
          field: 'gold',
          aggFunc: 'sum',
          enableValue: true,
        },
        {
          headerName: 'abc(silver)',
          field: 'silver',
          aggFunc: '123',
          enableValue: true,
        },
        {
          headerName: 'xyz(bronze)',
          field: 'bronze',
          aggFunc: 'xyz',
          enableValue: true,
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
        sortable: true,
        resizable: true,
      },
      autoGroupColumnDef: null,
      aggFuncs: null,
      rowData: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      headerName: 'Athlete',
      field: 'athlete',
      minWidth: 250,
    };
    this.aggFuncs = {
      // this overrides the grids built in sum function
      sum: sumFunction,
      // this adds another function called 'abc'
      123: oneTwoThreeFunc,
      // and again xyz
      xyz: xyzFunc,
    };
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      // we could also register functions after the grid is created,
      // however because we are providing the columns in the grid options,
      // it will be to late (eg remove 'xyz' from aggFuncs, and you will
      // see the grid complains).
      params.api.addAggFunc('xyz', xyzFunc);

      const updateData = (data) => params.api.setRowData(data);

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

window.oneTwoThreeFunc = function oneTwoThreeFunc(params) {
  // this is just an example, rather than working out an aggregation,
  // we just return 123 each time, so you can see in the example 22 is the result
  return 123;
};

window.xyzFunc = function xyzFunc(params) {
  // this is just an example, rather than working out an aggregation,
  // we just return 22 each time, so you can see in the example 22 is the result
  return 'xyz';
};

window.sumFunction = // sum function has no advantage over the built in sum function.
  // it's shown here as it's the simplest form of aggregation and
  // showing it can be good as a starting point for understanding
  // hwo the aggregation functions work.
  function sumFunction(params) {
    let result = 0;
    params.values.forEach((value) => {
      if (typeof value === 'number') {
        result += value;
      }
    });
    return result;
  };

window.minAndMaxAggFunction = // min and max agg function. the leaf nodes are just numbers, like any other
  // value. however the function returns an object with min and max, thus the group
  // nodes all have these objects.
  function minAndMaxAggFunction(params) {
    // this is what we will return
    const result = {
      min: null,
      max: null,
      // because we are returning back an object, this would get rendered as [Object,Object]
      // in the browser. we could get around this by providing a valueFormatter, OR we could
      // get around it in a customer cellRenderer, however this is a trick that will also work
      // with clipboard.
      toString: function () {
        return '(' + this.min + '..' + this.max + ')';
      },
    };
    // update the result based on each value
    params.values.forEach((value) => {
      const groupNode =
        value !== null && value !== undefined && typeof value === 'object';
      const minValue = groupNode ? value.min : value;
      const maxValue = groupNode ? value.max : value;
      // value is a number, not a 'result' object,
      // so this must be the first group
      result.min = min(minValue, result.min);
      result.max = max(maxValue, result.max);
    });
    return result;
  };

window.avgAggFunction = // the average function is tricky as the multiple levels require weighted averages
  // for the non-leaf node aggregations.
  function avgAggFunction(params) {
    // the average will be the sum / count
    let sum = 0;
    let count = 0;
    params.values.forEach((value) => {
      const groupNode =
        value !== null && value !== undefined && typeof value === 'object';
      if (groupNode) {
        // we are aggregating groups, so we take the
        // aggregated values to calculated a weighted average
        sum += value.avg * value.count;
        count += value.count;
      } else {
        // skip values that are not numbers (ie skip empty values)
        if (typeof value === 'number') {
          sum += value;
          count++;
        }
      }
    });
    // avoid divide by zero error
    let avg = null;
    if (count !== 0) {
      avg = sum / count;
    }
    // the result will be an object. when this cell is rendered, only the avg is shown.
    // however when this cell is part of another aggregation, the count is also needed
    // to create a weighted average for the next level.
    const result = {
      count: count,
      avg: avg,
      // the grid by default uses toString to render values for an object, so this
      // is a trick to get the default cellRenderer to display the avg value
      toString: function () {
        return `${this.avg}`;
      },
    };
    return result;
  };

window.roundedAvgAggFunction = function roundedAvgAggFunction(params) {
  const result = avgAggFunction(params);
  if (result.avg) {
    result.avg = Math.round(result.avg * 100) / 100;
  }
  return result;
};

window.min = // similar to Math.min() except handles missing values, if any value is missing, then
  // it returns the other value, or 'null' if both are missing.
  function min(a, b) {
    const aMissing = typeof a !== 'number';
    const bMissing = typeof b !== 'number';
    if (aMissing && bMissing) {
      return null;
    } else if (aMissing) {
      return b;
    } else if (bMissing) {
      return a;
    } else if (a > b) {
      return b;
    } else {
      return a;
    }
  };

window.max = // similar to Math.max() except handles missing values, if any value is missing, then
  // it returns the other value, or 'null' if both are missing.
  function max(a, b) {
    const aMissing = typeof a !== 'number';
    const bMissing = typeof b !== 'number';
    if (aMissing && bMissing) {
      return null;
    } else if (aMissing) {
      return b;
    } else if (bMissing) {
      return a;
    } else if (a < b) {
      return b;
    } else {
      return a;
    }
  };

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
