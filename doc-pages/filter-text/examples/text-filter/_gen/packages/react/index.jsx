
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    {
        field: 'athlete',
        filterParams: athleteFilterParams,
    },
    {
        field: 'country',
        filter: 'agTextColumnFilter',
        filterParams: countryFilterParams,
    },
    {
        field: 'sport',
        filter: 'agTextColumnFilter',
        filterParams: {
            caseSensitive: true,
            defaultOption: 'startsWith',
        },
    },
],
    defaultColDef: {
    flex: 1,
    sortable: true,
    filter: true,
},
    rowData: null
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
        const updateData = (data) => params.api.setRowData(data);
        
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then(resp => resp.json())
            .then(data => updateData(data));
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
rowData={this.state.rowData}
onGridReady={this.onGridReady}
            />
            </div>
            </div>
        );
    }
}

function contains(target, lookingFor) {
    return target && target.indexOf(lookingFor) >= 0;
}
var athleteFilterParams = {
    filterOptions: ['contains', 'notContains'],
    textFormatter: function (r) {
        if (r == null)
            return null;
        return r
            .toLowerCase()
            .replace(/[àáâãäå]/g, 'a')
            .replace(/æ/g, 'ae')
            .replace(/ç/g, 'c')
            .replace(/[èéêë]/g, 'e')
            .replace(/[ìíîï]/g, 'i')
            .replace(/ñ/g, 'n')
            .replace(/[òóôõö]/g, 'o')
            .replace(/œ/g, 'oe')
            .replace(/[ùúûü]/g, 'u')
            .replace(/[ýÿ]/g, 'y');
    },
    debounceMs: 200,
    suppressAndOrCondition: true,
};
var countryFilterParams = {
    filterOptions: ['contains'],
    textMatcher: function ({ value, filterText }) {
        var filterTextLowerCase = filterText ? filterText.toLowerCase() : '';
        var valueLowerCase = value.toString().toLowerCase();
        var aliases = {
            usa: 'united states',
            holland: 'netherlands',
            vodka: 'russia',
            niall: 'ireland',
            sean: 'south africa',
            alberto: 'mexico',
            john: 'australia',
            xi: 'china',
        };
        var literalMatch = contains(valueLowerCase, filterTextLowerCase);
        return (!!literalMatch || !!contains(valueLowerCase, aliases[filterTextLowerCase]));
    },
    trimInput: true,
    debounceMs: 1000,
};

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
