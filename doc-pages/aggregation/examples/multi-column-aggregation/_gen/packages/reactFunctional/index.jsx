
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const numberFormatter = (params) => {
    if (!params.value || params.value === 0)
        return '0';
    return '' + Math.round(params.value * 100) / 100;
}

const ratioValueGetter = (params) => {
    if (!(params.node && params.node.group)) {
        // no need to handle group levels - calculated in the 'ratioAggFunc'
        return createValueObject(params.data.gold, params.data.silver);
    }
}

const ratioAggFunc = (params) => {
    let goldSum = 0;
    let silverSum = 0;
    params.values.forEach(value => {
        if (value && value.gold) {
            goldSum += value.gold;
        }
        if (value && value.silver) {
            silverSum += value.silver;
        }
    });
    return createValueObject(goldSum, silverSum);
}

const createValueObject = (gold, silver) => {
    return {
        gold: gold,
        silver: silver,
        toString: () => `${(gold && silver ? gold / silver : 0)}`,
    };
}

const ratioFormatter = (params) => {
    if (!params.value || params.value === 0)
        return '';
    return '' + Math.round(params.value * 100) / 100;
}



const GridExample = () => {
    
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
    {
        field: 'country',
        rowGroup: true,
        hide: true,
        suppressColumnsToolPanel: true,
    },
    {
        field: 'sport',
        rowGroup: true,
        hide: true,
        suppressColumnsToolPanel: true,
    },
    {
        field: 'year',
        pivot: true,
        hide: true,
        suppressColumnsToolPanel: true,
    },
    { field: 'gold', aggFunc: 'sum', valueFormatter: numberFormatter },
    { field: 'silver', aggFunc: 'sum', valueFormatter: numberFormatter },
    {
        headerName: 'Ratio',
        colId: 'goldSilverRatio',
        aggFunc: ratioAggFunc,
        valueGetter: ratioValueGetter,
        valueFormatter: ratioFormatter,
    },
]);
    const defaultColDef = useMemo(() => { return {
    flex: 1,
    minWidth: 150,
    sortable: true,
    filter: true,
} }, []);
    const autoGroupColumnDef = useMemo(() => { return {
    minWidth: 220,
} }, []);


            const onGridReady = useCallback((params) => {
                
                fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => setRowData(data));
            }, []);




    return  (
            <div style={containerStyle}>
                
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
autoGroupColumnDef={autoGroupColumnDef}
suppressAggFuncInHeader={true}
onGridReady={onGridReady}
            >
            </AgGridReact>
        </div>
            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
