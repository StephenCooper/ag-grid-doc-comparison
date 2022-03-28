
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])





const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState([
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
]);
    const [columnDefs, setColumnDefs] = useState([{ field: 'make' }, { field: 'model' }, { field: 'price' }]);


            const onGridReady = useCallback((params) => {
                
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', function () {
        setTimeout(function () {
            params.api.sizeColumnsToFit();
        });
    });

gridRef.current.api.sizeColumnsToFit();
            }, []);




    return  (
            <div style={containerStyle}>
                <div style={{"display":"flex","flexDirection":"row","height":"100%"}}>
    <div style={{"overflow":"hidden","flexGrow":"1"}}>
        
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
columnDefs={columnDefs}
onGridReady={onGridReady}
            >
            </AgGridReact>
        </div>
    </div>

    <div style={{"backgroundColor":"#ccc","padding":"2rem"}}>right side column</div>
</div>

            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
