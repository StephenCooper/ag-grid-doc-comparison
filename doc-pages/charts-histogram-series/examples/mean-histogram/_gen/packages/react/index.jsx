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
          text: "Race results",
        },
        data: getData(),
        series: [
          {
            type: "histogram",
            aggregation: "mean",
            xKey: "age",
            xName: "Participant Age",
            yKey: "time",
            yName: "Race time",
          },
        ],
        legend: {
          enabled: false,
        },
        axes: [
          {
            type: "number",
            position: "bottom",
            title: { text: "Age band (years)" },
          },
          {
            type: "number",
            position: "left",
            title: { text: "Mean race time (seconds)" },
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
