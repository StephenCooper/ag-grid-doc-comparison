
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
    defaultColDef: {
    flex: 1,
    minWidth: 150,
    filter: true,
},
    rowData: null
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
        const updateData = (data) => {
    fetchedData = data.slice(0, 9);
    params.api.setRowData(fetchedData);
};
        
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then(resp => resp.json())
            .then(data => updateData(data));
    }

jumbleData = () => {
    if (fetchedData) {
        const ages = fetchedData.map(d => d.age);
        // Force reload by mutating fetched data - jumble the ages.
        const jumbledData = fetchedData.map(d => {
            const randomAgeIndex = Math.round(Math.random() * (ages.length - 1));
            return { ...d, age: ages.splice(randomAgeIndex, 1)[0] };
        });
        this.gridApi.setRowData(jumbledData);
    }
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className="example-wrapper">
    <div style={{"marginBottom":"5px"}}>
        <button onClick={() => this.jumbleData()}>Jumble Ages</button>
    </div>
    
    <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
onGridReady={this.onGridReady}
rowData={this.state.rowData}
            />
            </div>
</div>

            </div>
        );
    }
}

var filterParams = {
    comparator: function (filterLocalDateAtMidnight, cellValue) {
        var dateAsString = cellValue;
        if (dateAsString == null)
            return -1;
        var dateParts = dateAsString.split('/');
        var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
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

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
