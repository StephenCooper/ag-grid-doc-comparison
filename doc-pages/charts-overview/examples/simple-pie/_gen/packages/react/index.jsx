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
          text: "Religions of London Population (2016)",
          fontSize: 18,
        },
        subtitle: {
          text: "Source: Office for National Statistics",
        },
        series: [
          {
            data: getData(),
            type: "pie",
            labelKey: "religion",
            angleKey: "population",
            label: {
              minAngle: 0,
            },
            callout: {
              strokeWidth: 2,
            },
            fills: [
              "#febe76",
              "#ff7979",
              "#badc58",
              "#f9ca23",
              "#f0932b",
              "#eb4c4b",
              "#6ab04c",
              "#7ed6df",
            ],
            strokes: [
              "#b28553",
              "#b35555",
              "#829a3e",
              "#ae8d19",
              "#a8671e",
              "#a43535",
              "#4a7b35",
              "#58969c",
            ],
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
