
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
    { field: 'country', width: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
],
    defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
},
    popupParent: document.body,
    chartThemes: ['ag-pastel', 'ag-material-dark', 'ag-vivid-dark', 'ag-solar'],
    chartThemeOverrides: {
    cartesian: {
        axes: {
            category: {
                label: {
                    rotation: 335,
                },
            },
        },
    },
},
    rowData: getData()
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    }

onFirstDataRendered = (params) => {
    var createRangeChartParams = {
        cellRange: {
            rowStartIndex: 0,
            rowEndIndex: 79,
            columns: ['country', 'gold', 'silver', 'bronze'],
        },
        chartType: 'groupedColumn',
        chartContainer: document.querySelector('#myChart'),
        aggFunc: 'sum',
    };
    params.api.createRangeChart(createRangeChartParams);
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className="wrapper">
    <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
popupParent={this.state.popupParent}
enableRangeSelection={true}
enableCharts={true}
chartThemes={this.state.chartThemes}
chartThemeOverrides={this.state.chartThemeOverrides}
rowData={this.state.rowData}
onGridReady={this.onGridReady}
onFirstDataRendered={this.onFirstDataRendered.bind(this)}
            />
            </div>
    <div id="myChart" className="my-chart"></div>
</div>
            </div>
        );
    }
}



render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
