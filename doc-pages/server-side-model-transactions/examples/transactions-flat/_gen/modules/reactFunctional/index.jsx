
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule])

const products = ['Palm Oil', 'Rubber', 'Wool', 'Amber', 'Copper'];

const all_products = [
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

let newProductSequence = 0;

let valueCounter = 0;

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
                
                fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => {
    const dataSource = {
        getRows: function (params) {
            // To make the demo look real, wait for 500ms before returning
            setTimeout(function () {
                const rows = [];
                products.forEach(function (product, index) {
                    rows.push({
                        product: product,
                        value: getNextValue(),
                    });
                });
                // call the success callback
                params.success({ rowData: rows, rowCount: rows.length });
            }, 500);
        },
    };
    params.api.setServerSideDatasource(dataSource);
});
            }, []);

const onRemoveSelected = useCallback(() => {
    const rowsToRemove = gridRef.current.api.getSelectedRows();
    const tx = {
        remove: rowsToRemove,
    };
    gridRef.current.api.applyServerSideTransaction(tx);
}, [])

   const onRemoveRandom = useCallback(() => {
    const rowsToRemove = [];
    let firstRow;
    gridRef.current.api.forEachNode(function (node) {
        if (firstRow == null) {
            firstRow = node.data;
        }
        // skip half the nodes at random
        if (Math.random() < 0.75) {
            return;
        }
        rowsToRemove.push(node.data);
    });
    if (rowsToRemove.length == 0 && firstRow != null) {
        rowsToRemove.push(firstRow);
    }
    const tx = {
        remove: rowsToRemove,
    };
    gridRef.current.api.applyServerSideTransaction(tx);
}, [])

   const onUpdateSelected = useCallback(() => {
    const rowsToUpdate = gridRef.current.api.getSelectedRows();
    rowsToUpdate.forEach(function (data) {
        data.value = getNextValue();
    });
    const tx = {
        update: rowsToUpdate,
    };
    gridRef.current.api.applyServerSideTransaction(tx);
}, [])

   const onUpdateRandom = useCallback(() => {
    const rowsToUpdate = [];
    gridRef.current.api.forEachNode(function (node) {
        // skip half the nodes at random
        if (Math.random() > 0.5) {
            return;
        }
        const data = node.data;
        data.value = getNextValue();
        rowsToUpdate.push(data);
    });
    const tx = {
        update: rowsToUpdate,
    };
    gridRef.current.api.applyServerSideTransaction(tx);
}, [])

   const onAdd = useCallback((index) => {
    const newProductName = all_products[Math.floor(all_products.length * Math.random())];
    const itemsToAdd = [];
    for (let i = 0; i < 5; i++) {
        itemsToAdd.push({
            product: newProductName + ' ' + newProductSequence++,
            value: getNextValue(),
        });
    }
    const tx = {
        addIndex: index,
        add: itemsToAdd,
    };
    gridRef.current.api.applyServerSideTransaction(tx);
}, [all_products])


    return  (
            <div style={containerStyle}>
                <div className="example-wrapper">
    <div style={{"marginBottom":"5px"}}>
        <button onClick={onAdd}>Add at End</button>
        <button onClick={() => onAdd(0)}>Add at Start</button>
        <button onClick={onUpdateSelected}>Update Selected</button>
        <button onClick={onUpdateRandom}>Update Random</button>
        <button onClick={onRemoveSelected}>Remove Selected</button>
        <button onClick={onRemoveRandom}>Remove Random</button>
    </div>
    
        <div  style={gridStyle} className="ag-theme-alpine-dark">             
            <AgGridReact
                ref={gridRef}
                
columnDefs={columnDefs}
defaultColDef={defaultColDef}
getRowId={getRowId}
rowSelection={'multiple'}
serverSideStoreType={'full'}
enableCellChangeFlash={true}
rowModelType={'serverSide'}
animateRows={true}
onGridReady={onGridReady}
            >
            </AgGridReact>
        </div>
</div>

            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
