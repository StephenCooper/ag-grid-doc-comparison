"use strict";

import React, { Component } from "react";
import { cloneDeep } from "lodash";
import { render } from "react-dom";
import * as agCharts from "ag-charts-community";
import { AgChartsReact } from "ag-charts-react";

class ChartExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        title: {
          text: "Apple's revenue by product category",
        },
        subtitle: {
          text: "in billion U.S. dollars",
        },
        data: getData(),
        series: [
          {
            type: "column",
            xKey: "quarter",
            yKey: "iphone",
            yName: "iPhone",
            normalizedTo: 100,
            stacked: true,
          },
          {
            type: "column",
            xKey: "quarter",
            yKey: "mac",
            yName: "Mac",
            normalizedTo: 100,
            stacked: true,
          },
          {
            type: "column",
            xKey: "quarter",
            yKey: "ipad",
            yName: "iPad",
            normalizedTo: 100,
            stacked: true,
          },
          {
            type: "column",
            xKey: "quarter",
            yKey: "wearables",
            yName: "Wearables",
            normalizedTo: 100,
            stacked: true,
          },
          {
            type: "column",
            xKey: "quarter",
            yKey: "services",
            yName: "Services",
            normalizedTo: 100,
            stacked: true,
          },
        ],
        axes: [
          {
            type: "number",
            position: "left",
            label: {
              formatter: (params) => Math.round(params.value) + "%",
            },
          },
          {
            type: "category",
            position: "bottom",
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
