import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.athleteVisible = true;
    this.ageVisible = true;
    this.countryVisible = true;
    this.rowData = null;

    this.state = this.createState();
  }

  createState = () => {
    const topOptions = {
      alignedGrids: [],
      defaultColDef: {
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
      },
    };
    const bottomOptions = {
      alignedGrids: [],
      defaultColDef: {
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
      },
    };

    topOptions.alignedGrids.push(bottomOptions);
    bottomOptions.alignedGrids.push(topOptions);

    return {
      gridReady: 0,
      topOptions,
      bottomOptions,
      columnDefs: [
        {
          headerName: 'Group 1',
          headerClass: 'blue',
          groupId: 'Group1',
          children: [
            { field: 'athlete', pinned: true, width: 100 },
            { field: 'age', pinned: true, columnGroupShow: 'open', width: 100 },
            { field: 'country', width: 100 },
            { field: 'year', columnGroupShow: 'open', width: 100 },
            { field: 'date', width: 100 },
            { field: 'sport', columnGroupShow: 'open', width: 100 },
            { field: 'date', width: 100 },
            { field: 'sport', columnGroupShow: 'open', width: 100 },
          ],
        },
        {
          headerName: 'Group 2',
          headerClass: 'green',
          groupId: 'Group2',
          children: [
            { field: 'athlete', pinned: true, width: 100 },
            { field: 'age', pinned: true, columnGroupShow: 'open', width: 100 },
            { field: 'country', width: 100 },
            { field: 'year', columnGroupShow: 'open', width: 100 },
            { field: 'date', width: 100 },
            { field: 'sport', columnGroupShow: 'open', width: 100 },
            { field: 'date', width: 100 },
            { field: 'sport', columnGroupShow: 'open', width: 100 },
          ],
        },
      ],
      rowData: this.rowData,
    };
  };

  onGridReady = (params) => {
    this.topGrid = params;
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => {
        this.rowData = data;
        this.setState(this.createState());
        window.setTimeout(() => {
          // mix up some columns
          this.topGrid.columnApi.moveColumnByIndex(11, 4);
          this.topGrid.columnApi.moveColumnByIndex(11, 4);
        }, 100);
      });
  };

  onFirstDataRendered = (params) => {
    this.setState({
      gridReady: this.state.gridReady + 1,
    });

    if (this.state.gridReady > 1) {
      params.api.sizeColumnsToFit();
    }
  };

  render() {
    return (
      <div className="container">
        <div className="grid ag-theme-alpine">
          <AgGridReact
            rowData={this.state.rowData}
            gridOptions={this.state.topOptions}
            columnDefs={this.state.columnDefs}
            defaultColDef={{ resizable: true }}
            onGridReady={this.onGridReady.bind(this)}
            onFirstDataRendered={this.onFirstDataRendered.bind(this)}
          />
        </div>

        <div className="divider"></div>

        <div className="grid ag-theme-alpine">
          <AgGridReact
            rowData={this.state.rowData}
            gridOptions={this.state.bottomOptions}
            columnDefs={this.state.columnDefs}
            onFirstDataRendered={this.onFirstDataRendered.bind(this)}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
