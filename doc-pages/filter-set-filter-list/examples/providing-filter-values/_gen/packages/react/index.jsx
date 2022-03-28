
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    {
        headerName: 'Days (Values Not Provided)',
        field: 'days',
        filter: 'agSetColumnFilter',
        filterParams: daysValuesNotProvidedFilterParams,
    },
    {
        headerName: 'Days (Values Provided)',
        field: 'days',
        filter: 'agSetColumnFilter',
        filterParams: daysValuesProvidedFilterParams,
    },
],
    defaultColDef: {
    flex: 1,
    filter: true,
    resizable: true,
},
    sideBar: 'filters',
    rowData: getRowData()
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    }

onFirstDataRendered = (params) => {
    ((params.api.getToolPanelInstance('filters'))).expandFilters();
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
sideBar={this.state.sideBar}
rowData={this.state.rowData}
onGridReady={this.onGridReady}
onFirstDataRendered={this.onFirstDataRendered.bind(this)}
            />
            </div>

            </div>
        );
    }
}

var listOfDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];
var daysValuesNotProvidedFilterParams = {
    comparator: function (a, b) {
        var aIndex = listOfDays.indexOf(a);
        var bIndex = listOfDays.indexOf(b);
        if (aIndex === bIndex)
            return 0;
        return aIndex > bIndex ? 1 : -1;
    },
};
var daysValuesProvidedFilterParams = {
    values: listOfDays,
    suppressSorting: true, // use provided order
};
function getRowData() {
    var weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    var rows = [];
    for (var i = 0; i < 200; i++) {
        var index = Math.floor(Math.random() * 5);
        rows.push({ days: weekdays[index] });
    }
    return rows;
}

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
