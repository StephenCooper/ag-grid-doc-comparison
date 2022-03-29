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
        autoSize: true,
        data: getData(),
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
              "#4086a4",
              "#b1a235",
              "#6c8a2b",
              "#a03e24",
              "#af5517",
              "#af225a",
            ],
          },
          overrides: {
            area: {
              series: {
                marker: { enabled: true },
                highlightStyle: {
                  series: {
                    dimOpacity: 0.2,
                  },
                },
              },
            },
          },
        },
        title: {
          text: "Total Visitors to Science Museums (2019)",
          fontSize: 18,
        },
        subtitle: {
          text: "Source: Department for Digital, Culture, Media & Sport",
        },
        series: [
          { type: "area", xKey: "date", stacked: true, yKey: "Science Museum" },
          {
            type: "area",
            xKey: "date",
            stacked: true,
            yKey: "National Media Museum",
          },
          {
            type: "area",
            xKey: "date",
            stacked: true,
            yKey: "National Railway Museum",
          },
          { type: "area", xKey: "date", stacked: true, yKey: "Locomotion" },
          {
            type: "area",
            xKey: "date",
            yKey: "Museum of Science and Industry, Manchester",
            stacked: true,
          },
          {
            type: "area",
            xKey: "date",
            yKey: "National Coal Mining Museum for England",
            stacked: true,
          },
        ],
        axes: [
          {
            type: "time",
            position: "bottom",
            label: {
              format: "%b",
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
                return params.value / 1000 + "k";
              },
            },
          },
        ],
        legend: {
          position: "bottom",
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
