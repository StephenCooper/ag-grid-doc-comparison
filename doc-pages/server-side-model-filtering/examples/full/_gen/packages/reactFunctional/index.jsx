
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const createServerSideDatasource = (server) => {
    return {
        getRows: function (params) {
            console.log('[Datasource] - rows requested by grid: startRow = ' +
                params.request.startRow +
                ', endRow = ' +
                params.request.endRow);
            // get data for request from our fake server
            var response = server.getData();
            // simulating real server call with a 500ms delay
            setTimeout(function () {
                if (response.success) {
                    // supply rows for requested block to grid
                    params.success({ rowData: response.rows });
                }
                else {
                    params.fail();
                }
            }, 1000);
        },
    };
}

const createFakeServer = (allData) => {
    return {
        getData: function () {
            return {
                success: true,
                rows: allData,
            };
        },
    };
}



const GridExample = () => {
    
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    
    const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', minWidth: 220, filter: 'agTextColumnFilter' },
    {
        field: 'country',
        minWidth: 200,
        filter: 'agSetColumnFilter',
        filterParams: {
            values: [
                'United States',
                'Ireland',
                'United Kingdom',
                'Russia',
                'Australia',
                'Canada',
                'Norway',
            ],
        },
    },
    { field: 'year', filter: 'agNumberColumnFilter' },
    { field: 'sport', minWidth: 200 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
]);
    const defaultColDef = useMemo(() => { return {
    flex: 1,
    minWidth: 100,
} }, []);


            const onGridReady = useCallback((params) => {
                
                fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => {
    // setup the fake server with entire dataset
    var fakeServer = createFakeServer(data);
    // create datasource with a reference to the fake server
    var datasource = createServerSideDatasource(fakeServer);
    // register the datasource with the grid
    params.api.setServerSideDatasource(datasource);
});
            }, []);




    return  (
            <div style={containerStyle}>
                
        <div  style={gridStyle} className="ag-theme-alpine-dark">             
            <AgGridReact
                
                
columnDefs={columnDefs}
defaultColDef={defaultColDef}
animateRows={true}
rowModelType={'serverSide'}
serverSideStoreType={'full'}
onGridReady={onGridReady}
            >
            </AgGridReact>
        </div>
            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
