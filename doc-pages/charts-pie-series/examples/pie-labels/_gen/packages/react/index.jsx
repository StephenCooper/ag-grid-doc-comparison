"use strict";

import { AgChartsReact } from "ag-charts-react";
import React, { Component } from "react";
import { render } from "react-dom";

class ChartExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        data: [
          { label: "Android", value: 56.9 },
          { label: "iOS", value: 22.5 },
          { label: "BlackBerry", value: 6.8 },
          { label: "Symbian", value: 8.5 },
          { label: "Bada", value: 2.6 },
          { label: "Windows", value: 1.9 },
        ],
        series: [
          {
            type: "pie",
            angleKey: "value",
            labelKey: "label",
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
