"use strict";

import { AgChartsReact } from "ag-charts-react";
import React, { Component } from "react";
import { render } from "react-dom";

class ChartExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        data: [
          { os: "Windows", share: 88.07 },
          { os: "macOS", share: 9.44 },
          { os: "Linux", share: 1.87 },
        ],
        series: [
          {
            type: "column",
            xKey: "os",
            yKey: "share",
          },
        ],
        axes: [
          {
            type: "category",
            position: "bottom",
            title: {
              text: "Desktop Operating Systems",
              enabled: false,
            },
          },
          {
            type: "number",
            position: "left",
            title: {
              text: "Market Share (%)",
              enabled: false,
            },
            label: {
              formatter: function (params) {
                return params.value + "%";
              },
            },
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

render(<ChartExample />, document.querySelector("#root"));
