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
          { value: 56.9 },
          { value: 22.5 },
          { value: 6.8 },
          { value: 8.5 },
          { value: 2.6 },
          { value: 1.9 },
        ],
        series: [
          {
            type: "pie",
            angleKey: "value",
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
