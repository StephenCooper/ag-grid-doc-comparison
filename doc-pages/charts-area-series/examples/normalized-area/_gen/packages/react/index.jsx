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
          text: "Browser Wars",
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
            normalizedTo: 100,
            stacked: true,
          },
          {
            type: "area",
            xKey: "year",
            yKey: "firefox",
            yName: "Firefox",
            normalizedTo: 100,
            stacked: true,
          },
          {
            type: "area",
            xKey: "year",
            yKey: "safari",
            yName: "Safari",
            normalizedTo: 100,
            stacked: true,
          },
          {
            type: "area",
            xKey: "year",
            yKey: "chrome",
            yName: "Chrome",
            normalizedTo: 100,
            stacked: true,
          },
        ],
      },
    };
  }

  componentDidMount() {}

  render() {
    return <AgChartsReact options={this.state.options} />;
  }
}

render(<ChartExample />, document.querySelector("#root"));
