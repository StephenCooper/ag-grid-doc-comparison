
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import CustomHeader from './customHeader.jsx';

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    { field: 'athlete', suppressMenu: true, minWidth: 120 },
    {
        field: 'age',
        sortable: false,
        headerComponentParams: { menuIcon: 'fa-external-link-alt' },
    },
    { field: 'country', suppressMenu: true, minWidth: 120 },
    { field: 'year', sortable: false },
    { field: 'date', suppressMenu: true },
    { field: 'sport', sortable: false },
    {
        field: 'gold',
        headerComponentParams: { menuIcon: 'fa-cog' },
        minWidth: 120,
    },
    { field: 'silver', sortable: false },
    { field: 'bronze', suppressMenu: true, minWidth: 120 },
    { field: 'total', sortable: false },
],
    rowData: null,
    components: {
    agColumnHeader: CustomHeader,
},
    defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
    headerComponentParams: {
        menuIcon: 'fa-bars'
    },
}
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
        const updateData = (data) => {
    this.setState({ rowData: data });
};
        
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
rowData={this.state.rowData}
suppressMenuHide={true}
components={this.state.components}
defaultColDef={this.state.defaultColDef}
onGridReady={this.onGridReady}
            />
            </div>



            </div>
        );
    }
}



render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
