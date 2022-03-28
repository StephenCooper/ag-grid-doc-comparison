
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { GridChartsModule } from '@ag-grid-enterprise/charts';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule, GridChartsModule, SetFilterModule, MultiFilterModule, FiltersToolPanelModule, ColumnsToolPanelModule])

const createQuarterlySalesChart = (gridApi) => {
    gridApi.createCrossFilterChart({
        chartType: 'line',
        cellRange: {
            columns: ['quarter', 'sale'],
        },
        aggFunc: 'sum',
        chartThemeOverrides: {
            common: {
                title: {
                    enabled: true,
                    text: 'Quarterly Sales ($)',
                },
                legend: {
                    enabled: false,
                },
                axes: {
                    category: {
                        label: {
                            rotation: 0,
                        },
                    },
                    number: {
                        label: {
                            formatter: function (params) {
                                return params.value / 1000 + 'k';
                            },
                        },
                    },
                },
            },
        },
        chartContainer: document.querySelector('#lineChart'),
    });
}

const createSalesByRefChart = (gridApi) => {
    gridApi.createCrossFilterChart({
        chartType: 'doughnut',
        cellRange: {
            columns: ['salesRep', 'sale'],
        },
        aggFunc: 'sum',
        chartThemeOverrides: {
            common: {
                title: {
                    enabled: true,
                    text: 'Sales by Representative ($)',
                },
            },
            pie: {
                series: {
                    title: {
                        enabled: false,
                    },
                    label: {
                        enabled: false,
                    },
                },
            },
        },
        chartContainer: document.querySelector('#doughnutChart'),
    });
}

const createHandsetSalesChart = (gridApi) => {
    gridApi.createCrossFilterChart({
        chartType: 'area',
        cellRange: {
            columns: ['handset', 'sale'],
        },
        aggFunc: 'count',
        chartThemeOverrides: {
            common: {
                title: {
                    enabled: true,
                    text: 'Handsets Sold (Units)',
                },
                legend: {
                    enabled: false,
                },
                padding: {
                    top: 20,
                    right: 60,
                    bottom: 20,
                    left: 50,
                },
            }
        },
        chartContainer: document.querySelector('#areaChart'),
    });
}



const GridExample = () => {
    
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState(getData());
    const [columnDefs, setColumnDefs] = useState([
    { field: 'salesRep', chartDataType: 'category' },
    { field: 'handset', chartDataType: 'category' },
    {
        headerName: 'Sale Price',
        field: 'sale',
        maxWidth: 160,
        aggFunc: 'sum',
        filter: 'agNumberColumnFilter',
        chartDataType: 'series',
    },
    { field: 'saleDate', chartDataType: 'category' },
    {
        field: 'quarter',
        maxWidth: 160,
        filter: 'agSetColumnFilter',
        chartDataType: 'category',
    },
]);
    const defaultColDef = useMemo(() => { return {
    flex: 1,
    editable: true,
    sortable: true,
    filter: 'agMultiColumnFilter',
    floatingFilter: true,
    resizable: true,
} }, []);
    const chartThemes = useMemo(() => { return ['ag-default-dark'] }, []);
    const chartThemeOverrides = useMemo(() => { return {
    common: {
        padding: {
            top: 20,
            right: 40,
            bottom: 20,
            left: 30,
        },
    },
    cartesian: {
        axes: {
            category: {
                label: {
                    rotation: 0,
                },
            },
        },
    },
} }, []);



const onFirstDataRendered = useCallback((params) => {
    createQuarterlySalesChart(params.api);
    createSalesByRefChart(params.api);
    createHandsetSalesChart(params.api);
}, [])


    return  (
            <div style={containerStyle}>
                <div id="wrapper">
    <div id="top">
        <div id="lineChart" className="ag-theme-alpine-dark"></div>
        <div id="doughnutChart" className="ag-theme-alpine-dark"></div>
    </div>
    <div id="areaChart" className="ag-theme-alpine-dark"></div>
    
        <div  style={gridStyle} className="ag-theme-alpine-dark">             
            <AgGridReact
                
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
enableCharts={true}
chartThemes={chartThemes}
chartThemeOverrides={chartThemeOverrides}
onFirstDataRendered={onFirstDataRendered}
            >
            </AgGridReact>
        </div>
</div>
            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
