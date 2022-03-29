"use strict";

import React, { Component } from "react";
import { cloneDeep } from "lodash";
import { render } from "react-dom";
import * as agCharts from "ag-charts-community";
import { AgChartsReact } from "ag-charts-react";

class ChartExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        theme: {
          palette: {
            fills: ["#f44336", "#8bc34a"],
            strokes: ["#ab2f26", "#618834"],
          },
        },
        title: {
          text: "Microsoft Internet Explorer vs Google Chrome",
        },
        subtitle: {
          text: "2009-2019",
        },
        data: getData(),
        series: [
          {
            type: "area",
            xKey: "year",
            yKey: "ie",
            yName: "IE",
            fillOpacity: 0.7,
            marker: {
              enabled: true,
            },
          },
          {
            type: "area",
            xKey: "year",
            yKey: "chrome",
            yName: "Chrome",
            fillOpacity: 0.7,
            marker: {
              enabled: true,
            },
          },
        ],
        legend: {
          position: "top",
        },
      },
    };
  }

  componentDidMount() {}

  render() {
    return <AgChartsReact options={this.state.options} />;
  }
}

render(<ChartExample />, document.querySelector("#root"));
