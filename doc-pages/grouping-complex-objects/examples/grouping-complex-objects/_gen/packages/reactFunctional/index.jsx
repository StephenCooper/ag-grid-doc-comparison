
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const countryKeyCreator = (params) => {
    var countryObject = params.value;
    return countryObject.name;
}

const countryValueGetter = (params) => {
    // hack the data  - replace the country with an object of country name and code
    var countryName = params.data.country;
    var countryCode = countryName.substring(0, 2).toUpperCase();
    return {
        name: countryName,
        code: countryCode,
    };
}



const GridExample = () => {
    
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', minWidth: 200 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
    { field: 'age' },
    {
        field: 'country',
        rowGroup: true,
        hide: true,
        valueGetter: countryValueGetter,
        keyCreator: countryKeyCreator,
    },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport', minWidth: 200 },
]);
    const defaultColDef = useMemo(() => { return {
    flex: 1,
    minWidth: 150,
    resizable: true,
} }, []);
    const autoGroupColumnDef = useMemo(() => { return {
    minWidth: 200,
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
onGridReady={onGridReady}
            >
            </AgGridReact>
        </div>
            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
