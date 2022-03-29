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
          text: "Total Visitors to Museums and Galleries",
          fontSize: 18,
        },
        subtitle: {
          text: "Source: Department for Digital, Culture, Media & Sport",
        },
        series: [
          {
            type: "column",
            xKey: "year",
            yKey: "visitors",
            fill: "#0084e7",
            strokeWidth: 0,
            shadow: {
              enabled: true,
              xOffset: 3,
            },
          },
        ],
        axes: [
          {
            type: "category",
            position: "bottom",
            title: {
              enabled: true,
              text: "Year",
            },
          },
          {
            type: "number",
            position: "left",
            title: {
              enabled: true,
              text: "Total visitors",
            },
            label: {
              formatter: function (params) {
                return params.value / 1000000 + "M";
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
    return <AgChartsReact options={this.state.options} />;
  }
}

render(<ChartExample />, document.querySelector("#root"));
