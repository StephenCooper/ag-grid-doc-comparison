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
          text: "Prize money distribution",
        },
        subtitle: {
          text: "Total winnings by participant age",
        },
        data: getData(),
        series: [
          {
            type: "histogram",
            xKey: "age",
            xName: "Participant Age",
            yKey: "winnings",
            yName: "Winnings",
            aggregation: "sum",
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
            title: { text: "Total winnings (USD)" },
          },
        ],
        height: 550,
      },
    };
  }

  componentDidMount() {}

  render() {
    return <AgChartsReact options={this.state.options} />;
  }
}

render(<ChartExample />, document.querySelector("#root"));
