
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

var products = ['Palm Oil', 'Rubber', 'Wool', 'Amber', 'Copper'];

var newProductSequence = 0;

var all_products = [
    'Palm Oil',
    'Rubber',
    'Wool',
    'Amber',
    'Copper',
    'Lead',
    'Zinc',
    'Tin',
    'Aluminium',
    'Aluminium Alloy',
    'Nickel',
    'Cobalt',
    'Molybdenum',
    'Recycled Steel',
    'Corn',
    'Oats',
    'Rough Rice',
    'Soybeans',
    'Rapeseed',
    'Soybean Meal',
    'Soybean Oil',
    'Wheat',
    'Milk',
    'Coca',
    'Coffee C',
    'Cotton No.2',
    'Sugar No.11',
    'Sugar No.14',
];

var allServerSideData = [];

const setupData = () => {
    products.forEach(function (product, index) {
        allServerSideData.push({
            product: product,
            value: Math.floor(Math.random() * 10000),
        });
    });
}

var valueCounter = 0;

const getNextValue = () => {
    valueCounter++;
    return Math.floor((valueCounter * 987654321) / 7) % 10000;
}



const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    
    const [columnDefs, setColumnDefs] = useState([{ field: 'product' }, { field: 'value' }]);
    const defaultColDef = useMemo(() => { return {
    width: 250,
    resizable: true,
} }, []);
    const getRowId = useCallback(function (params) {
    return params.data.product;
}, []);


            const onGridReady = useCallback((params) => {
                
    setupData();
    var dataSource = {
        getRows: function (params2) {
            var rowData = allServerSideData.slice();
            setTimeout(function () {
                params2.success({ rowData: rowData });
            }, 200);
        },
    };
    params.api.setServerSideDatasource(dataSource);

            }, []);

const onAsyncTransactionsFlushed = useCallback((e) => {
    var summary = {};
    (e.results).forEach((result) => {
        var status = result.status;
        if (summary[status] == null) {
            summary[status] = 0;
        }
        summary[status]++;
    });
    console.log('onAsyncTransactionsFlushed: ' + JSON.stringify(summary));
}, [])

   const onBtAdd = useCallback(() => {
    var newProductName = all_products[Math.floor(all_products.length * Math.random())];
    var newItem = {
        product: newProductName + ' ' + newProductSequence++,
        value: Math.floor(Math.random() * 10000),
    };
    allServerSideData.push(newItem);
    var tx = {
        add: [newItem],
    };
    gridRef.current.api.applyServerSideTransactionAsync(tx);
}, [all_products,newProductSequence,allServerSideData])

   const onBtFlush = useCallback(() => {
    gridRef.current.api.flushServerSideAsyncTransactions();
}, [])


    return  (
            <div style={containerStyle}>
                <div className="example-wrapper">
    <div style={{"marginBottom":"5px"}}>
        <button onClick={onBtAdd}>Add</button>
        <button onClick={onBtFlush}>Flush</button>
    </div>
    
        <div  style={gridStyle} className="ag-theme-alpine-dark">             
            <AgGridReact
                ref={gridRef}
                
columnDefs={columnDefs}
defaultColDef={defaultColDef}
getRowId={getRowId}
rowSelection={'multiple'}
serverSideStoreType={'full'}
rowModelType={'serverSide'}
animateRows={true}
asyncTransactionWaitMillis={4000}
onGridReady={onGridReady}
onAsyncTransactionsFlushed={onAsyncTransactionsFlushed}
            >
            </AgGridReact>
        </div>
</div>
            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
