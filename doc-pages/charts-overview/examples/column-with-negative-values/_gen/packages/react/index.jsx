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
        theme: {
          palette: {
            fills: ["#19A0AA", "#F15F36"],
            strokes: ["#19A0AA", "#F15F36"],
          },
          overrides: {
            column: {
              series: {
                highlightStyle: {
                  series: {
                    dimOpacity: 0.3,
                  },
                },
              },
            },
          },
        },
        title: {
          text: "Changes in Prison Population (2019)",
          fontSize: 18,
        },
        subtitle: {
          text: "Source: Ministry of Justice, HM Prison Service, and Her Majesty’s Prison and Probation Service",
        },
        series: [
          {
            type: "column",
            xKey: "month",
            yKey: "menDelta",
            yName: "Male",
          },
          {
            type: "column",
            xKey: "month",
            yKey: "womenDelta",
            yName: "Female",
          },
        ],
        axes: [
          {
            type: "category",
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
