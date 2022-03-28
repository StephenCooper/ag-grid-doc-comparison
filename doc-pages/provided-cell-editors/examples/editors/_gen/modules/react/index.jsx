
'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import ColourCellRenderer from './colourCellRenderer.jsx';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RichSelectModule])

class GridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
    {
        headerName: 'Text Editor',
        field: 'color1',
        cellRenderer: ColourCellRenderer,
        cellEditor: 'agTextCellEditor'
    },
    {
        headerName: 'Select Editor',
        field: 'color2',
        cellRenderer: ColourCellRenderer,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
            values: colors
        }
    },
    {
        headerName: 'Rich Select Editor',
        field: 'color3',
        cellRenderer: ColourCellRenderer,
        cellEditor: 'agRichSelectCellEditor',
        cellEditorPopup: true,
        cellEditorParams: {
            values: colors,
            cellRenderer: ColourCellRenderer
        }
    },
    {
        headerName: 'Large Text Editor',
        field: 'description',
        cellEditorPopup: true,
        cellEditor: 'agLargeTextCellEditor',
        flex: 2
    }
],
    defaultColDef: {
    flex: 1,
    resizable: true,
    editable: true
},
    rowData: data
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
defaultColDef={this.state.defaultColDef}
rowData={this.state.rowData}
onGridReady={this.onGridReady}
            />
            </div>

            </div>
        );
    }
}

const colors = ['Red', 'Green', 'Blue'];
const data = Array.from(Array(20).keys()).map((val, index) => ({
    color1: colors[index % 3],
    color2: colors[index % 3],
    color3: colors[index % 3],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
}));

render(
    <GridExample></GridExample>,
    document.querySelector('#root')
)
