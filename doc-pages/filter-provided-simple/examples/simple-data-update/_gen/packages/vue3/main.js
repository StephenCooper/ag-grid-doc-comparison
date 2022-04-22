import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from 'ag-grid-vue3';
import { createApp } from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="jumbleData()">Jumble Ages</button>
                </div>
                
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'athlete' },
        { field: 'age', filter: 'agNumberColumnFilter', maxWidth: 100 },
        {
          field: 'date',
          filter: 'agDateColumnFilter',
          filterParams: filterParams,
        },
        { field: 'total', filter: false },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
      },
      rowData: null,
    };
  },
  created() {},
  methods: {
    jumbleData() {
      if (fetchedData) {
        const ages = fetchedData.map((d) => d.age);
        // Force reload by mutating fetched data - jumble the ages.
        const jumbledData = fetchedData.map((d) => {
          const randomAgeIndex = Math.round(Math.random() * (ages.length - 1));
          return { ...d, age: ages.splice(randomAgeIndex, 1)[0] };
        });
        this.gridApi.setRowData(jumbledData);
      }
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        fetchedData = data.slice(0, 9);
        params.api.setRowData(fetchedData);
      };

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

var filterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('/');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
};

var fetchedData;

createApp(VueExample).mount('#app');
