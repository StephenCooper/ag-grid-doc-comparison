
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule, SetFilterModule, FiltersToolPanelModule])

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    {
        headerName: 'Athlete',
        children: [
            {
                headerName: 'Name',
                field: 'athlete',
                minWidth: 200,
                filter: 'agTextColumnFilter',
            },
            { field: 'age' },
            { field: 'country', minWidth: 200 },
        ],
    },
    {
        headerName: 'Competition',
        children: [{ field: 'year' }, { field: 'date', minWidth: 180 }],
    },
    { colId: 'sport', field: 'sport', minWidth: 200 },
    {
        headerName: 'Medals',
        children: [
            { field: 'gold' },
            { field: 'silver' },
            { field: 'bronze' },
            { field: 'total' },
        ],
    },
],
    defaultColDef: {
    sortable: true,
    filter: true,
},
    sideBar: {
    toolPanels: [
        {
            id: 'filters',
            labelDefault: 'Filters',
            labelKey: 'filters',
            iconKey: 'filter',
            toolPanel: 'agFiltersToolPanel',
            toolPanelParams: {
                suppressExpandAll: false,
                suppressFilterSearch: false,
                // prevents custom layout changing when columns are reordered in the grid
                suppressSyncLayoutWithGrid: true,
            },
        },
    ],
    defaultToolPanel: 'filters',
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

setCustomSortLayout = () => {
    var filtersToolPanel = this.gridApi.getToolPanelInstance('filters');
    filtersToolPanel.setFilterLayout(sortedToolPanelColumnDefs);
}

   setCustomGroupLayout = () => {
    var filtersToolPanel = this.gridApi.getToolPanelInstance('filters');
    filtersToolPanel.setFilterLayout(customToolPanelColumnDefs);
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className="example-wrapper">
    <div>
        <span className="button-group">
            <button onClick={() => this.setCustomSortLayout()}>Custom Sort Layout</button>
            <button onClick={() => this.setCustomGroupLayout()}>Custom Group Layout</button>
        </span>
    </div>
    <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
sideBar={this.state.sideBar}
onGridReady={this.onGridReady}
rowData={this.state.rowData}
            />
            </div>
</div>

            </div>
        );
    }
}

var sortedToolPanelColumnDefs = [
    {
        headerName: 'Athlete',
        children: [
            { field: 'age' },
            { field: 'country' },
            { headerName: 'Name', field: 'athlete' },
        ],
    },
    {
        headerName: 'Competition',
        children: [{ field: 'date' }, { field: 'year' }],
    },
    {
        headerName: 'Medals',
        children: [
            { field: 'bronze' },
            { field: 'gold' },
            { field: 'silver' },
            { field: 'total' },
        ],
    },
    { colId: 'sport', field: 'sport', width: 110 },
];
var customToolPanelColumnDefs = [
    {
        headerName: 'Dummy Group 1',
        children: [
            { field: 'age' },
            { headerName: 'Name', field: 'athlete' },
            {
                headerName: 'Dummy Group 2',
                children: [{ colId: 'sport' }, { field: 'country' }],
            },
        ],
    },
    {
        headerName: 'Medals',
        children: [
            { field: 'total' },
            { field: 'bronze' },
            {
                headerName: 'Dummy Group 3',
                children: [{ field: 'silver' }, { field: 'gold' }],
            },
        ],
    },
];

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
