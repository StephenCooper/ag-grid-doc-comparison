"use strict";

import { AgChartsReact } from "ag-charts-react";
import React, { Component } from "react";
import { render } from "react-dom";

class ChartExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        type: "hierarchy",

        data,
        series: [
          {
            type: "treemap",
            labelKey: "orgHierarchy",
            colorParents: true,
            gradient: false,
            nodePadding: 5,
            sizeKey: undefined,
            colorKey: undefined,
            colorDomain: [0, 2, 4],
            colorRange: ["#d73027", "#fee08b", "#1a9850"],
          },
        ],
        title: {
          text: "Organizational Chart",
        },
        subtitle: {
          text: "of a top secret startup",
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
