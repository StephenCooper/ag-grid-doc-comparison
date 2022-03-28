
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
        headerName: 'Group A',
        groupId: 'GroupA',
        children: [
            {
                headerName: 'Athlete 1',
                field: 'athlete',
                width: 150,
                filter: 'agTextColumnFilter',
            },
            {
                headerName: 'Group B',
                groupId: 'GroupB',
                children: [
                    { headerName: 'Country 1', field: 'country', width: 120 },
                    {
                        headerName: 'Group C',
                        groupId: 'GroupC',
                        children: [
                            { headerName: 'Sport 1', field: 'sport', width: 110 },
                            {
                                headerName: 'Group D',
                                groupId: 'GroupD',
                                children: [
                                    {
                                        headerName: 'Total 1',
                                        field: 'total',
                                        width: 100,
                                        filter: 'agNumberColumnFilter',
                                    },
                                    {
                                        headerName: 'Group E',
                                        groupId: 'GroupE',
                                        openByDefault: true,
                                        children: [
                                            {
                                                headerName: 'Gold 1',
                                                field: 'gold',
                                                width: 100,
                                                filter: 'agNumberColumnFilter',
                                            },
                                            {
                                                headerName: 'Group F',
                                                groupId: 'GroupF',
                                                openByDefault: true,
                                                children: [
                                                    {
                                                        headerName: 'Silver 1',
                                                        field: 'silver',
                                                        width: 100,
                                                        filter: 'agNumberColumnFilter',
                                                    },
                                                    {
                                                        headerName: 'Group G',
                                                        groupId: 'GroupG',
                                                        children: [
                                                            {
                                                                headerName: 'Bronze',
                                                                field: 'bronze',
                                                                width: 100,
                                                                filter: 'agNumberColumnFilter',
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        headerName: 'Silver 2',
                                                        columnGroupShow: 'open',
                                                        field: 'silver',
                                                        width: 100,
                                                        filter: 'agNumberColumnFilter',
                                                    },
                                                ],
                                            },
                                            {
                                                headerName: 'Gold 2',
                                                columnGroupShow: 'open',
                                                field: 'gold',
                                                width: 100,
                                                filter: 'agNumberColumnFilter',
                                            },
                                        ],
                                    },
                                    {
                                        headerName: 'Total 2',
                                        columnGroupShow: 'open',
                                        field: 'total',
                                        width: 100,
                                        filter: 'agNumberColumnFilter',
                                    },
                                ],
                            },
                            {
                                headerName: 'Sport 2',
                                columnGroupShow: 'open',
                                field: 'sport',
                                width: 110,
                            },
                        ],
                    },
                    {
                        headerName: 'Country 2',
                        columnGroupShow: 'open',
                        field: 'country',
                        width: 120,
                    },
                ],
            },
            {
                headerName: 'Age 2',
                columnGroupShow: 'open',
                field: 'age',
                width: 90,
                filter: 'agNumberColumnFilter',
            },
        ],
    },
    {
        headerName: 'Athlete 2',
        columnGroupShow: 'open',
        field: 'athlete',
        width: 150,
        filter: 'agTextColumnFilter',
    },
],
    rowData: null,
    defaultColGroupDef: { headerClass: headerClassFunc },
    defaultColDef: {
    headerClass: headerClassFunc,
    sortable: true,
    resizable: true,
    filter: true,
},
    icons: {
    columnGroupOpened: '<i class="far fa-minus-square"/>',
    columnGroupClosed: '<i class="far fa-plus-square"/>',
}
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

expandAll = (expand) => {
    const groupNames = [
        'GroupA',
        'GroupB',
        'GroupC',
        'GroupD',
        'GroupE',
        'GroupF',
        'GroupG',
    ];
    groupNames.forEach(groupId => {
        this.gridColumnApi.setColumnGroupOpened(groupId, expand);
    });
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className="example-wrapper">
    <div className="button-bar">
        <button onClick={() => this.expandAll(true)}>Expand All</button>
        <button onClick={() => this.expandAll(false)}>Contract All</button>
    </div>
    <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
rowData={this.state.rowData}
defaultColGroupDef={this.state.defaultColGroupDef}
defaultColDef={this.state.defaultColDef}
icons={this.state.icons}
onGridReady={this.onGridReady}
            />
            </div>
</div>

            </div>
        );
    }
}

function headerClassFunc(params) {
    let foundC = false;
    let foundG = false;
    // for the bottom row of headers, column is present,
    // otherwise columnGroup is present. we are guaranteed
    // at least one is always present.
    let item = params.column ? params.column : params.columnGroup;
    // walk up the tree, see if we are in C or F groups
    while (item) {
        // if groupId is set then this must be a group.
        const colDef = item.getDefinition();
        if (colDef.groupId === 'GroupC') {
            foundC = true;
        }
        else if (colDef.groupId === 'GroupG') {
            foundG = true;
        }
        item = item.getParent();
    }
    if (foundG) {
        return 'column-group-g';
    }
    else if (foundC) {
        return 'column-group-c';
    }
}

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
