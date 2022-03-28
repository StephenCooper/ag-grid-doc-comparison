
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { GridChartsModule } from '@ag-grid-enterprise/charts';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule, GridChartsModule])

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    { field: 'country', width: 150, chartDataType: 'category' },
    { field: 'gold', chartDataType: 'series', sort: 'desc' },
    { field: 'silver', chartDataType: 'series', sort: 'desc' },
    { field: 'bronze', chartDataType: 'series' },
    {
        headerName: 'A',
        valueGetter: 'Math.floor(Math.random()*1000)',
        chartDataType: 'series',
    },
    {
        headerName: 'B',
        valueGetter: 'Math.floor(Math.random()*1000)',
        chartDataType: 'series',
    },
    {
        headerName: 'C',
        valueGetter: 'Math.floor(Math.random()*1000)',
        chartDataType: 'series',
    },
    {
        headerName: 'D',
        valueGetter: 'Math.floor(Math.random()*1000)',
        chartDataType: 'series',
    },
],
    defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
},
    rowData: getData(),
    popupParent: document.body
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    }

onChart1 = () => {
    var params = {
        cellRange: {
            rowStartIndex: 0,
            rowEndIndex: 4,
            columns: ['country', 'gold', 'silver'],
        },
        chartType: 'groupedColumn',
        chartThemeName: 'ag-vivid',
        chartThemeOverrides: {
            common: {
                title: {
                    enabled: true,
                    text: 'Top 5 Medal Winners',
                },
            },
        },
    };
    this.gridApi.createRangeChart(params);
}

   onChart2 = () => {
    var params = {
        cellRange: {
            columns: ['country', 'bronze'],
        },
        chartType: 'groupedBar',
        chartThemeName: 'ag-pastel',
        chartThemeOverrides: {
            common: {
                title: {
                    enabled: true,
                    text: 'Bronze Medal by Country',
                },
                legend: {
                    enabled: false,
                },
            },
        },
        unlinkChart: true,
    };
    this.gridApi.createRangeChart(params);
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className="outer-div">
    <div className="button-bar">
        <button onClick={() => this.onChart1()}>Top 5 Medal Winners</button>
        <button onClick={() => this.onChart2()}>Bronze Medals by Country</button>
    </div>
    <div className="grid-wrapper">
        <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
rowData={this.state.rowData}
enableRangeSelection={true}
enableCharts={true}
popupParent={this.state.popupParent}
onGridReady={this.onGridReady}
            />
            </div>
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
