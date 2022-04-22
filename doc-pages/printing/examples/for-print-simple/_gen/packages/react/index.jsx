'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { headerName: 'ID', valueGetter: 'node.rowIndex + 1', width: 70 },
        { field: 'model', width: 150 },
        { field: 'color' },
        { field: 'price', valueFormatter: '"$" + value.toLocaleString()' },
        { field: 'year' },
        { field: 'country' },
      ],
      rowData: getData(),
      defaultColDef: {
        width: 100,
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onBtPrinterFriendly = () => {
    var eGridDiv = document.querySelector('#myGrid');
    eGridDiv.style.width = '';
    eGridDiv.style.height = '';
    this.gridApi.setDomLayout('print');
  };

  onBtNormal = () => {
    var eGridDiv = document.querySelector('#myGrid');
    eGridDiv.style.width = '400px';
    eGridDiv.style.height = '200px';
    // Same as setting to 'normal' as it is the default
    this.gridApi.setDomLayout();
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <button onClick={() => this.onBtPrinterFriendly()}>
          Printer Friendly Layout
        </button>
        <button onClick={() => this.onBtNormal()}>Normal Layout</button>

        <h3>Latin Text</h3>

        <p>
          Lorem ipsum dolor sit amet, ne cum repudiare abhorreant. Atqui
          molestiae neglegentur ad nam, mei amet eros ea, populo deleniti
          scaevola et pri. Pro no ubique explicari, his reque nulla consequuntur
          in. His soleat doctus constituam te, sed at alterum repudiandae. Suas
          ludus electram te ius.
        </p>

        <div
          id="myGrid"
          style={{
            height: '200px',
            width: '400px',
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            defaultColDef={this.state.defaultColDef}
            onGridReady={this.onGridReady}
          />
        </div>

        <h3>More Latin Text</h3>

        <p>
          Lorem ipsum dolor sit amet, ne cum repudiare abhorreant. Atqui
          molestiae neglegentur ad nam, mei amet eros ea, populo deleniti
          scaevola et pri. Pro no ubique explicari, his reque nulla consequuntur
          in. His soleat doctus constituam te, sed at alterum repudiandae. Suas
          ludus electram te ius.
        </p>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
