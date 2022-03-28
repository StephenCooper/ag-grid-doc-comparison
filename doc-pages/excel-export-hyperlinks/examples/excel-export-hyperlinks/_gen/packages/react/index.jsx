
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [{ field: 'company' }, { field: 'url', cellClass: 'hyperlinks' }],
    defaultColDef: {
    flex: 1,
    minWidth: 100,
    resizable: true,
},
    defaultExcelExportParams: {
    autoConvertFormulas: true,
    processCellCallback: params => {
        const field = params.column.getColDef().field;
        return field === 'url' ? `=HYPERLINK("${params.value}")` : params.value;
    },
},
    excelStyles: [
    {
        id: 'hyperlinks',
        font: {
            underline: 'Single',
            color: '#358ccb',
        },
    },
],
    rowData: [
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
]
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    }

onBtExport = () => {
    this.gridApi.exportDataAsExcel();
}

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div className="container">
    <div>
        <button onClick={() => this.onBtExport()} style={{"marginBottom":"5px","fontWeight":"bold"}}>Export to Excel</button>
    </div>
    <div className="grid-wrapper">
        <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
defaultExcelExportParams={this.state.defaultExcelExportParams}
excelStyles={this.state.excelStyles}
rowData={this.state.rowData}
onGridReady={this.onGridReady}
            />
            </div>
    </div>
</div>
            </div>
        );
    }
}



render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
