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
          text: "Fuel Spending (2019)",
        },
        data: getData(),
        series: [
          {
            xKey: "quarter",
            yKey: "petrol",
            title: "Petrol",
            marker: {
              shape: "square",
              size: 10,
            },
          },
          {
            xKey: "quarter",
            yKey: "diesel",
            title: "Diesel",
            stroke: "black",
            marker: {
              size: 15,
              fill: "gray",
              stroke: "black",
            },
          },
          {
            xKey: "quarter",
            yKey: "electric",
            title: "Electric",
            stroke: "#8bc24a",
            marker: {
              shape: "cross",
              size: 20,
              fill: "#8bc24a",
              stroke: "#658d36",
            },
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
