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
          text: "Fuel Spending (2019)",
        },
        data: [
          {
            quarter: "Q1",
            petrol: 200,
            diesel: 100,
          },
          {
            quarter: "Q2",
            petrol: 300,
            diesel: 130,
          },
          {
            quarter: "Q3",
            petrol: 350,
            diesel: 160,
          },
          {
            quarter: "Q4",
            petrol: 400,
            diesel: 200,
          },
        ],
        series: [
          {
            xKey: "quarter",
            yKey: "petrol",
            yName: "Petrol",
          },
          {
            xKey: "quarter",
            yKey: "diesel",
            yName: "Diesel",
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
