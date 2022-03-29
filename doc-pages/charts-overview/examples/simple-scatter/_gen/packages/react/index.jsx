"use strict";

import { AgChartsReact } from "ag-charts-react";
import React, { Component } from "react";
import { render } from "react-dom";

class ChartExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        autoSize: true,
        data: getData(),
        title: {
          text: "Height vs Weight for Major League Baseball Players",
          fontSize: 18,
        },
        subtitle: {
          text: "Source: Statistics Online Computational Resource",
        },
        series: [
          {
            type: "scatter",
            xKey: "weight",
            yKey: "height",
            fillOpacity: 0.5,
            strokeOpacity: 0,
            marker: {
              size: 12,
              fill: "#002D72",
            },
          },
        ],
        axes: [
          {
            position: "bottom",
            type: "number",
            title: {
              enabled: true,
              text: "Weight (pounds)",
            },
          },
          {
            position: "left",
            type: "number",
            title: {
              enabled: true,
              text: "Height (inches)",
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
    return <AgChartsReact options={this.state.options} />;
  }
}

render(<ChartExample />, document.querySelector("#root"));
