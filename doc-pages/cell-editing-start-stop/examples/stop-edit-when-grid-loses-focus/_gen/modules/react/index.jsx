
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

class YearCellEditor  {
  
  

  getGui() {
    return this.eGui
  }

  getValue() {
    return this.value
  }

  isPopup() {
    return true
  }

  init(params) {
    this.value = params.value
    const tempElement = document.createElement('div');
    tempElement.innerHTML =
      '<div class="yearSelect">' +
      '<div>Clicking here does not close the popup!</div>' +
      '<button id="bt2006" class="yearButton">2006</button>' +
      '<button id="bt2008" class="yearButton">2008</button>' +
      '<button id="bt2010" class="yearButton">2010</button>' +
      '<button id="bt2012" class="yearButton">2012</button>' +
      '<div>' +
      '<input type="text" style="width: 100%;" placeholder="clicking on this text field does not close"/>' +
      '</div>' +
      '</div>';

    [2006, 2008, 2010, 2012].forEach(year => {
      tempElement
        .querySelector('#bt' + year)
        .addEventListener('click', () => {
          this.value = year
          params.stopEditing()
        })
    })

    this.eGui = tempElement.firstChild;
  }
}

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    { field: 'athlete', minWidth: 160 },
    { field: 'age' },
    { field: 'country', minWidth: 140 },
    { field: 'year', cellEditor: YearCellEditor, cellEditorPopup: true },
    { field: 'date', minWidth: 140 },
    { field: 'sport', minWidth: 160 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
],
    defaultColDef: {
    flex: 1,
    minWidth: 100,
    filter: true,
    editable: true,
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
                <div className="example-wrapper">
    <div className="example-header">
        Clicking outside the grid will stop the editing <button style={{"fontSize":"12px"}}>Dummy Save</button>
        <input placeholder="click here, editing stops" />
    </div>
    <div
                
                style={{
                    height: '100%',
                    width: '100%'}}
                    className="ag-theme-alpine">
            <AgGridReact
                columnDefs={this.state.columnDefs}
defaultColDef={this.state.defaultColDef}
stopEditingWhenCellsLoseFocus={true}
onGridReady={this.onGridReady}
rowData={this.state.rowData}
            />
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
