
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class DatePicker  {
    

    // gets called once before the renderer is used
    init(params) {
        // create the cell
        this.eInput = document.createElement('input')
        this.eInput.value = params.value
        this.eInput.classList.add('ag-input')
        this.eInput.style.height = '100%'

        // https://jqueryui.com/datepicker/
        $(this.eInput).datepicker({
            dateFormat: 'dd/mm/yy',
            onSelect: () => { this.eInput.focus(); }
        })
    }

    // gets called once when grid ready to insert the element
    getGui() {
        return this.eInput
    }

    // focus and select can be done after the gui is attached
    afterGuiAttached() {
        this.eInput.focus()
        this.eInput.select()
    }

    // returns the new value after editing
    getValue() {
        return this.eInput.value
    }

    // any cleanup we need to be done here
    destroy() {
        // but this example is simple, no cleanup, we could
        // even leave this method out as it's optional
    }

    // if true, then this editor will appear in a popup
    isPopup() {
        // and we could leave this method out also, false is the default
        return false
    }
}

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    { field: 'athlete' },
    { field: 'date', editable: true, cellEditor: DatePicker, cellEditorPopup: true },
    { field: 'age', maxWidth: 110 },
    { field: 'country' },
    { field: 'year', maxWidth: 120 },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
],
    defaultColDef: {
    flex: 1,
    minWidth: 150,
},
    rowData: null
        };

        
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        
        const updateData = (data) => params.api.setRowData(data);
        
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then(resp => resp.json())
            .then(data => updateData(data));
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
defaultColDef={this.state.defaultColDef}
onGridReady={this.onGridReady}
rowData={this.state.rowData}
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
