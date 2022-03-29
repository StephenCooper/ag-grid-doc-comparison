"use strict";

import { AgChartsReact } from "ag-charts-react";
import React, { Component } from "react";
import { render } from "react-dom";

class ChartExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        title: {
          text: "Number of Cars Sold",
        },
        subtitle: {
          text: "(click a column for details)",
        },
        data: [
          { month: "March", units: 25, brands: { BMW: 10, Toyota: 15 } },
          { month: "April", units: 27, brands: { Ford: 17, BMW: 10 } },
          { month: "May", units: 42, brands: { Nissan: 20, Toyota: 22 } },
        ],
        series: [
          {
            type: "column",
            xKey: "month",
            yKey: "units",
            listeners: {
              nodeClick: function (event) {
                var datum = event.datum;
                window.alert(
                  "Cars sold in " +
                    datum[event.xKey] +
                    ": " +
                    String(datum[event.yKey]) +
                    "\n" +
                    listUnitsSoldByBrand(datum["brands"])
                );
              },
            },
          },
        ],
        axes: [
          {
            type: "category",
            position: "bottom",
          },
          {
            type: "number",
            position: "left",
          },
        ],
        legend: {
          enabled: false,
        },
      },
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="wrapper">
        <AgChartsReact options={this.state.options} />
      </div>
    );
  }
}

function listUnitsSoldByBrand(brands) {
  var result = "";
  for (var key in brands) {
    result += key + ": " + brands[key] + "\n";
  }
  return result;
}

render(<ChartExample />, document.querySelector("#root"));
