
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
    { field: 'athlete', headerTooltip: "The athlete's name" },
    { field: 'age', headerTooltip: 'The athlete`s age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date', headerTooltip: 'The date of the Olympics' },
    { field: 'sport', headerTooltip: 'The sport the medal was for' },
    { field: 'gold', headerTooltip: 'How many gold medals' },
    { field: 'silver', headerTooltip: 'How many silver medals' },
    { field: 'bronze', headerTooltip: 'How many bronze medals' },
    { field: 'total', headerTooltip: 'The total number of medals' },
],
    defaultColDef: {
    width: 150,
},
    tooltipShowDelay: 500,
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
tooltipShowDelay={this.state.tooltipShowDelay}
onGridReady={this.onGridReady}
rowData={this.state.rowData}
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
