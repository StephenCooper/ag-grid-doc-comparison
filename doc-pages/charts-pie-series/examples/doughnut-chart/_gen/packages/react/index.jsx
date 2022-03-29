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
        data: [
          { os: "Android", share: 56.9 },
          { os: "iOS", share: 22.5 },
          { os: "BlackBerry", share: 6.8 },
          { os: "Symbian", share: 8.5 },
          { os: "Bada", share: 2.6 },
          { os: "Windows", share: 1.9 },
        ],
        series: [
          {
            type: "pie",
            labelKey: "os",
            angleKey: "share",
            innerRadiusOffset: -70,
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
