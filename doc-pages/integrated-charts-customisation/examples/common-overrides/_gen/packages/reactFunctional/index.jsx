
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';





const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState(getData());
    const [columnDefs, setColumnDefs] = useState([
    { field: 'country', width: 150, chartDataType: 'category' },
    { field: 'gold', chartDataType: 'series' },
    { field: 'silver', chartDataType: 'series' },
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
]);
    const defaultColDef = useMemo(() => { return {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
} }, []);
    const popupParent = useMemo(() => { return document.body }, []);
    const chartThemeOverrides = useMemo(() => { return {
    common: {
        padding: {
            top: 20,
            right: 30,
            bottom: 10,
            left: 2,
        },
        background: {
            fill: '#e5e5e5',
        },
        title: {
            enabled: true,
            text: 'Precious Metals Production',
            fontStyle: 'italic',
            fontWeight: '600',
            fontSize: 18,
            fontFamily: 'Impact, sans-serif',
            color: '#414182',
        },
        subtitle: {
            enabled: true,
            text: 'by country',
            fontSize: 14,
            fontFamily: 'Monaco, monospace',
            color: 'rgb(100, 100, 100)',
        },
        legend: {
            enabled: true,
            position: 'left',
            spacing: 20,
            item: {
                label: {
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    fontSize: 18,
                    fontFamily: 'Palatino, serif',
                    color: '#555',
                },
                marker: {
                    shape: 'diamond',
                    size: 10,
                    padding: 10,
                    strokeWidth: 2,
                },
                paddingX: 120,
                paddingY: 20,
            },
        },
        tooltip: {
            class: 'my-tooltip-class',
        },
    },
} }, []);



const onFirstDataRendered = useCallback((params) => {
    var cellRange = {
        rowStartIndex: 0,
        rowEndIndex: 4,
        columns: ['country', 'gold', 'silver', 'bronze'],
    };
    var createRangeChartParams = {
        cellRange: cellRange,
        chartType: 'groupedBar',
    };
    gridRef.current.api.createRangeChart(createRangeChartParams);
}, [])


    return  (
            <div style={containerStyle}>
                
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
popupParent={popupParent}
enableRangeSelection={true}
enableCharts={true}
chartThemeOverrides={chartThemeOverrides}
onFirstDataRendered={onFirstDataRendered}
            >
            </AgGridReact>
        </div>

            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
