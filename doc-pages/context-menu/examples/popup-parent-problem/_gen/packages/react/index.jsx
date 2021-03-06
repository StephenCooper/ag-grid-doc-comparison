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
      rowData: [
        { a: 1, b: 1, c: 1, d: 1, e: 1 },
        { a: 2, b: 2, c: 2, d: 2, e: 2 },
      ],
      columnDefs: [
        { field: 'a' },
        { field: 'b' },
        { field: 'c' },
        { field: 'd' },
        { field: 'e' },
      ],
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          style={{
            height: '100px',
            width: '100%',
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            rowData={this.state.rowData}
            columnDefs={this.state.columnDefs}
            onGridReady={this.onGridReady}
          />
        </div>

        <div style={{ padding: '10px' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc posuere
          lobortis est, sit amet molestie justo mattis et. Suspendisse congue
          condimentum tristique. Cras et purus vehicula, rhoncus ante sit amet,
          tempus nulla. Morbi vitae turpis id diam tincidunt luctus aliquet non
          ante. Ut elementum odio risus, eu condimentum lectus varius vitae.
          Praesent faucibus id ex commodo mattis. Duis egestas nibh ut libero
          accumsan blandit. Nunc mollis elit non sem tempor, sit amet posuere
          velit commodo. Cras convallis sem mattis, scelerisque turpis sed,
          scelerisque arcu. Mauris ac nunc purus. Aenean sit amet dapibus augue.
        </div>

        <div style={{ padding: '10px' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc posuere
          lobortis est, sit amet molestie justo mattis et. Suspendisse congue
          condimentum tristique. Cras et purus vehicula, rhoncus ante sit amet,
          tempus nulla. Morbi vitae turpis id diam tincidunt luctus aliquet non
          ante. Ut elementum odio risus, eu condimentum lectus varius vitae.
          Praesent faucibus id ex commodo mattis. Duis egestas nibh ut libero
          accumsan blandit. Nunc mollis elit non sem tempor, sit amet posuere
          velit commodo. Cras convallis sem mattis, scelerisque turpis sed,
          scelerisque arcu. Mauris ac nunc purus. Aenean sit amet dapibus augue.
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
