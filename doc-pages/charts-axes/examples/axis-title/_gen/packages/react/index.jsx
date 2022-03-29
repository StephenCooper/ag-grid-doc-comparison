"use strict";

import { AgChartsReact } from "ag-charts-react";
import { cloneDeep } from "lodash";
import React, { Component } from "react";
import { render } from "react-dom";

class ChartExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        data: [
          { os: "Windows", share: 88.07 },
          { os: "macOS", share: 9.44 },
          { os: "Linux", share: 1.87 },
        ],
        series: [
          {
            type: "column",
            xKey: "os",
            yKey: "share",
          },
        ],
        axes: [
          {
            type: "category",
            position: "bottom",
            title: {
              text: "Desktop Operating Systems",
              enabled: false,
            },
          },
          {
            type: "number",
            position: "left",
            title: {
              text: "Market Share (%)",
              enabled: false,
            },
          },
        ],
        legend: {
          enabled: false,
        },
      },
    };
  }

  componentDidMount() {}

  showAxisTitles = () => {
    const options = cloneDeep(this.state.options);

    options.axes[0].title.enabled = true;
    options.axes[1].title.enabled = true;

    this.setState({ options });
  };

  hideAxisTitles = () => {
    const options = cloneDeep(this.state.options);

    options.axes[0].title.enabled = false;
    options.axes[1].title.enabled = false;

    this.setState({ options });
  };

  render() {
    return (
      <div className="wrapper">
        <div id="toolPanel">
          <button onClick={() => this.showAxisTitles()}>
            Show axis titles
          </button>
          <span className="spacer"></span>
          <button onClick={() => this.hideAxisTitles()}>
            Hide axis titles
          </button>
        </div>
        <AgChartsReact options={this.state.options} />
      </div>
    );
  }
}

render(<ChartExample />, document.querySelector("#root"));
