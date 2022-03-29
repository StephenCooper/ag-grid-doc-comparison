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
          text: "Internet Explorer Market Share",
        },
        subtitle: {
          text: '2009-2019 (aka "good times")',
        },
        data: getData(),
        series: [
          {
            type: "area",
            xKey: "year",
            yKey: "ie",
            yName: "IE",
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
