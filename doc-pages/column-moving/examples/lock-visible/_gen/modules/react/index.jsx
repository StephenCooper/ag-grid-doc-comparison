
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
    {
        headerName: 'Athlete',
        children: [
            { field: 'athlete', width: 150 },
            { field: 'age', lockVisible: true, cellClass: 'locked-visible' },
            { field: 'country', width: 150 },
            { field: 'year' },
            { field: 'date' },
            { field: 'sport' },
        ],
    },
    {
        headerName: 'Medals',
        children: [
            { field: 'gold', lockVisible: true, cellClass: 'locked-visible' },
            { field: 'silver', lockVisible: true, cellClass: 'locked-visible' },
            { field: 'bronze', lockVisible: true, cellClass: 'locked-visible' },
            {
                field: 'total',
                lockVisible: true,
                cellClass: 'locked-visible',
                hide: true,
            },
        ],
    },
],
    sideBar: {
    toolPanels: [
        {
            id: 'columns',
            labelDefault: 'Columns',
            labelKey: 'columns',
            iconKey: 'columns',
            toolPanel: 'agColumnsToolPanel',
            toolPanelParams: {
                suppressRowGroups: true,
                suppressValues: true,
                suppressPivots: true,
                suppressPivotMode: true,
            },
        },
    ],
},
    defaultColDef: {
    width: 100,
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
                <div className="example-wrapper">
    <div className="legend-bar">
        <span className="legend-box locked-visible"></span> Locked Visible Column
    </div>
    <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
sideBar={this.state.sideBar}
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



render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
