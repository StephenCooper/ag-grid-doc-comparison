
import { createApp } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';



const VueExample = {
    template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                @cell-value-changed="onCellValueChanged"></ag-grid-vue>
        </div>
    `,
    components: {
        'ag-grid-vue': AgGridVue,
        
    },
    data: function() {
        return {
            columnDefs: [{headerName:"Name",
valueGetter:(params) =>  {
    return params.data.firstName + ' ' + params.data.lastName;
},
valueSetter:(params) =>  {
    var fullName = params.newValue;
    var nameSplit = fullName.split(' ');
    var newFirstName = nameSplit[0];
    var newLastName = nameSplit[1];
    var data = params.data;
    if (data.firstName !== newFirstName || data.lastName !== newLastName) {
        data.firstName = newFirstName;
        data.lastName = newLastName;
        // return true to tell grid that the value has changed, so it knows
        // to update the cell
        return true;
    }
    else {
        // return false, the grid doesn't need to update
        return false;
    }
}},{headerName:"A",
field:"a"},{headerName:"B",
valueGetter:(params) =>  {
    return params.data.b;
},
valueSetter:(params) =>  {
    var newValInt = parseInt(params.newValue);
    var valueChanged = params.data.b !== newValInt;
    if (valueChanged) {
        params.data.b = newValInt;
    }
    return valueChanged;
}},{headerName:"C.X",
valueGetter:(params) =>  {
    if (params.data.c) {
        return params.data.c.x;
    }
    else {
        return undefined;
    }
},
valueSetter:(params) =>  {
    if (!params.data.c) {
        params.data.c = {};
    }
    params.data.c.x = params.newValue;
    return true;
}},{headerName:"C.Y",
valueGetter:(params) =>  {
    if (params.data.c) {
        return params.data.c.y;
    }
    else {
        return undefined;
    }
},
valueSetter:(params) =>  {
    if (!params.data.c) {
        params.data.c = {};
    }
    params.data.c.y = params.newValue;
    return true;
}}],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
    flex: 1,
    resizable: true,
    editable: true,
},
            rowData: null
        }
    },
    created() {
        this.rowData = getData()
    },
    methods: {
        onCellValueChanged(event) {
    console.log('Data after change is', event.data);
},
onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    },
    }
}



createApp(VueExample)
    .mount("#app")
