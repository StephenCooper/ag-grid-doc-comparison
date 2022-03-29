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
          {
            month: "Jun",
            sweaters: 50,
          },
          {
            month: "Jul",
            sweaters: 70,
          },
          {
            month: "Aug",
            sweaters: 60,
          },
        ],
        series: [
          {
            type: "column",
            xKey: "month",
            yKey: "sweaters",
            yName: "Sweaters Made",
          },
        ],
        tooltip: {
          class: "my-tooltip",
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
