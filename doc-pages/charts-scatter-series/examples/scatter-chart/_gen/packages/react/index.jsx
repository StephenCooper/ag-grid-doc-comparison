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
        title: {
          text: "Mean Sea Level (mm)",
        },

        data: getData(),
        series: [
          {
            type: "scatter",
            xKey: "time",
            yKey: "mm",
            showInLegend: false,
          },
        ],
        axes: [
          {
            type: "number",
            position: "bottom",
          },
          {
            type: "number",
            position: "left",
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
