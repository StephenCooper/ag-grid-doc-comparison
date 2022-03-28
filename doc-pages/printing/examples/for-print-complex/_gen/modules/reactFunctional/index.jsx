
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule])

const setPrinterFriendly = (api) => {
    const eGridDiv = document.querySelector('#myGrid');
    eGridDiv.style.height = '';
    api.setDomLayout('print');
}

const setNormal = (api) => {
    const eGridDiv = document.querySelector('#myGrid');
    eGridDiv.style.width = '700px';
    eGridDiv.style.height = '200px';
    api.setDomLayout();
}



const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '200px', width: '700px'}), []);
    const [rowData, setRowData] = useState(getData());
    const [columnDefs, setColumnDefs] = useState([
    { field: 'group', rowGroup: true, hide: true },
    { field: 'id', pinned: 'left', width: 70 },
    { field: 'model', width: 180 },
    { field: 'color', width: 100 },
    {
        field: 'price',
        valueFormatter: "'$' + value.toLocaleString()",
        width: 100,
    },
    { field: 'year', width: 100 },
    { field: 'country', width: 120 },
]);
    const defaultColDef = useMemo(() => { return {
    sortable: true,
} }, []);



const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.expandAll();
}, [])

   const onBtPrint = useCallback(() => {
    const api = gridRef.current.api;
    setPrinterFriendly(api);
    setTimeout(function () {
        print();
        setNormal(api);
    }, 2000);
}, [])


    return  (
            <div style={containerStyle}>
                

<button onClick={onBtPrint}>Print</button>

<h3>
    Latin Text
</h3>

<p>
    Lorem ipsum dolor sit amet, ne cum repudiare abhorreant. Atqui molestiae neglegentur ad nam, mei amet eros ea, populo deleniti scaevola et pri. Pro no ubique explicari, his reque nulla consequuntur in. His soleat doctus constituam te, sed at alterum repudiandae. Suas ludus electram te ius.
</p>


        <div id="myGrid" style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
animateRows={true}
groupDisplayType={'groupRows'}
onFirstDataRendered={onFirstDataRendered}
            >
            </AgGridReact>
        </div>

<h3>
    More Latin Text
</h3>

<p>
    Lorem ipsum dolor sit amet, ne cum repudiare abhorreant. Atqui molestiae neglegentur ad nam, mei amet eros ea, populo deleniti scaevola et pri. Pro no ubique explicari, his reque nulla consequuntur in. His soleat doctus constituam te, sed at alterum repudiandae. Suas ludus electram te ius.
</p>

            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
