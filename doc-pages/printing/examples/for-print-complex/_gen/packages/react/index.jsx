"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { Component } from "react";
import { render } from "react-dom";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "group", rowGroup: true, hide: true },
        { field: "id", pinned: "left", width: 70 },
        { field: "model", width: 180 },
        { field: "color", width: 100 },
        {
          field: "price",
          valueFormatter: "'$' + value.toLocaleString()",
          width: 100,
        },
        { field: "year", width: 100 },
        { field: "country", width: 120 },
      ],
      defaultColDef: {
        sortable: true,
      },
      rowData: getData(),
      groupDisplayType: "groupRows",
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onFirstDataRendered = (params) => {
    params.api.expandAll();
  };

  onBtPrint = () => {
    const api = this.gridApi;
    setPrinterFriendly(api);
    setTimeout(function () {
      print();
      setNormal(api);
    }, 2000);
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <button onClick={() => this.onBtPrint()}>Print</button>

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
            height: "200px",
            width: "700px",
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
            animateRows={true}
            groupDisplayType={this.state.groupDisplayType}
            onGridReady={this.onGridReady}
            onFirstDataRendered={this.onFirstDataRendered.bind(this)}
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

function setPrinterFriendly(api) {
  const eGridDiv = document.querySelector("#myGrid");
  eGridDiv.style.height = "";
  api.setDomLayout("print");
}
function setNormal(api) {
  const eGridDiv = document.querySelector("#myGrid");
  eGridDiv.style.width = "700px";
  eGridDiv.style.height = "200px";
  api.setDomLayout();
}

render(<GridExample></GridExample>, document.querySelector("#root"));
