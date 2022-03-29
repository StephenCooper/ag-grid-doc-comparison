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
        theme: {
          palette: {
            fills: [
              "#5BC0EB",
              "#FDE74C",
              "#9BC53D",
              "#E55934",
              "#FA7921",
              "#fa3081",
            ],
            strokes: [
              "#5BC0EB",
              "#FDE74C",
              "#9BC53D",
              "#E55934",
              "#FA7921",
              "#fa3081",
            ],
          },
          overrides: {
            line: { series: { strokeWidth: 3, marker: { enabled: false } } },
          },
        },
        autoSize: true,
        title: {
          text: "Earthquake Magnitudes by Source (January 2020)",
          fontSize: 18,
        },
        subtitle: {
          text: "Source: US Geological Survey",
        },
        padding: {
          left: 40,
          right: 40,
        },
        series: [
          {
            data: data.ci,
            type: "line",
            title: "Southern California Seismic Network",
            xKey: "time",
            yKey: "magnitude",
          },
          {
            data: data.hv,
            type: "line",
            title: "Hawaiian Volcano Observatory Network",
            xKey: "time",
            yKey: "magnitude",
          },
          {
            data: data.nc,
            type: "line",
            title: "USGS Northern California Network",
            xKey: "time",
            yKey: "magnitude",
          },
          {
            data: data.ok,
            type: "line",
            title: "Oklahoma Seismic Network",
            xKey: "time",
            yKey: "magnitude",
          },
        ],
        axes: [
          {
            position: "bottom",
            type: "time",
            label: {
              format: "%d/%m",
              rotation: 30,
            },
          },
          {
            position: "left",
            type: "number",
            title: {
              enabled: true,
              text: "Magnitude",
            },
          },
        ],
        legend: {
          position: "bottom",
          item: {
            marker: {
              strokeWidth: 0,
            },
          },
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
