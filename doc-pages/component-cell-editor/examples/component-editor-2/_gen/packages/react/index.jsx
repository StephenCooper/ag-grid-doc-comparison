
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import GenderRenderer from './genderRenderer.jsx';
import MoodEditor from './moodEditor.jsx';
import MoodRenderer from './moodRenderer.jsx';
import NumericEditor from './numericEditor.jsx';

class CountryCellRenderer  {
    

    init(params) {
        this.eGui = document.createElement('div');
        this.eGui.innerHTML = `${params.value.name}`;
    }

    getGui() {
        return this.eGui;
    }

    refresh(params) {
        return false;
    }
}

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    { field: 'first_name', headerName: 'First Name', width: 120, editable: true },
    { field: 'last_name', headerName: 'Last Name', width: 120, editable: true },
    {
        field: 'gender',
        width: 100,
        editable: true,
        cellRenderer: GenderRenderer,
        cellEditor: 'agRichSelectCellEditor',
        cellEditorPopup: true,
        cellEditorParams: {
            cellRenderer: GenderRenderer,
            values: ['Male', 'Female'],
        },
    },
    {
        field: 'age',
        width: 80,
        editable: true,
        cellEditor: NumericEditor,
        cellEditorPopup: true
    },
    {
        field: 'mood',
        width: 100,
        cellRenderer: MoodRenderer,
        cellEditor: MoodEditor,
        cellEditorPopup: true,
        editable: true,
    },
    {
        field: 'country',
        width: 110,
        cellEditor: 'agRichSelectCellEditor',
        cellEditorPopup: true,
        cellRenderer: CountryCellRenderer,
        keyCreator: function (params) {
            return params.value.name;
        },
        cellEditorParams: {
            cellRenderer: CountryCellRenderer,
            values: [
                { name: 'Ireland', code: 'IE' },
                { name: 'UK', code: 'UK' },
                { name: 'France', code: 'FR' },
            ],
        },
        editable: true,
    },
    {
        field: 'address',
        editable: true,
        cellEditor: 'agLargeTextCellEditor',
        cellEditorPopup: true,
        cellEditorParams: {
            maxLength: '300',
            cols: '50',
            rows: '6',
        },
    },
],
    rowData: getData(),
    defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
}
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
    }



    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
rowData={this.state.rowData}
defaultColDef={this.state.defaultColDef}
onGridReady={this.onGridReady}
            />
            </div>



            </div>
        );
    }
}



render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
