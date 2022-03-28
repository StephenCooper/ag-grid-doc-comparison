
'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { MenuModule } from '@ag-grid-enterprise/menu';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, ExcelExportModule, MenuModule])





const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState([
    { company: 'Google', url: 'https://www.google.com' },
    { company: 'Adobe', url: 'https://www.adobe.com' },
    { company: 'The New York Times', url: 'https://www.nytimes.com' },
    { company: 'Twitter', url: 'https://www.twitter.com' },
    { company: 'StackOverflow', url: 'https://stackoverflow.com/' },
    { company: 'Reddit', url: 'https://www.reddit.com' },
    { company: 'Github', url: 'https://www.github.com' },
    { company: 'Microsoft', url: 'https://www.microsoft.com' },
    { company: 'Gizmodo', url: 'https://www.gizmodo.com' },
    { company: 'LinkedIN', url: 'https://www.linkedin.com' },
]);
    const [columnDefs, setColumnDefs] = useState([{ field: 'company' }, { field: 'url', cellClass: 'hyperlinks' }]);
    const defaultColDef = useMemo(() => { return {
    flex: 1,
    minWidth: 100,
    resizable: true,
} }, []);
    const defaultExcelExportParams = useMemo(() => { return {
    autoConvertFormulas: true,
    processCellCallback: params => {
        const field = params.column.getColDef().field;
        return field === 'url' ? `=HYPERLINK("${params.value}")` : params.value;
    },
} }, []);
    const excelStyles = useMemo(() => { return [
    {
        id: 'hyperlinks',
        font: {
            underline: 'Single',
            color: '#358ccb',
        },
    },
] }, []);



const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel();
}, [])


    return  (
            <div style={containerStyle}>
                <div className="container">
    <div>
        <button onClick={onBtExport} style={{"marginBottom":"5px","fontWeight":"bold"}}>Export to Excel</button>
    </div>
    <div className="grid-wrapper">
        
        <div  style={gridStyle} className="ag-theme-alpine">             
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
columnDefs={columnDefs}
defaultColDef={defaultColDef}
defaultExcelExportParams={defaultExcelExportParams}
excelStyles={excelStyles}
            >
            </AgGridReact>
        </div>
    </div>
</div>
            </div>
        );

}

render(<GridExample></GridExample>, document.querySelector('#root'))
