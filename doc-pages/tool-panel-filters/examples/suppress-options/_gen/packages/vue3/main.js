import { createApp } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

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
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          groupId: "athleteGroupId",
          headerName: "Athlete",
          children: [
            {
              headerName: "Name",
              field: "athlete",
              minWidth: 200,
              filter: "agTextColumnFilter",
            },
            { field: "age" },
            {
              groupId: "competitionGroupId",
              headerName: "Competition",
              children: [
                { field: "year" },
                {
                  field: "date",
                  minWidth: 180,
                  suppressFiltersToolPanel: true,
                },
              ],
            },
            { field: "country", minWidth: 200 },
          ],
        },
        { colId: "sport", field: "sport", minWidth: 200 },
        {
          headerName: "Medals",
          children: [
            { field: "gold" },
            { field: "silver" },
            { field: "bronze" },
            { field: "total" },
          ],
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        filter: true,
        sortable: true,
        resizable: true,
      },
      sideBar: null,
      rowData: null,
    };
  },
  created() {
    this.sideBar = {
      toolPanels: [
        {
          id: "filters",
          labelDefault: "Filters",
          labelKey: "filters",
          iconKey: "filter",
          toolPanel: "agFiltersToolPanel",
          toolPanelParams: {
            suppressExpandAll: true,
            suppressFilterSearch: true,
          },
        },
      ],
      defaultToolPanel: "filters",
    };
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => params.api.setRowData(data);

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

createApp(VueExample).mount("#app");
