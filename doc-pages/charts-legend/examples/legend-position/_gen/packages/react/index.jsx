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
            strokeWidth: 3,
          },
        ],
        legend: {
          position: "right",
        },
      },
    };
  }

  componentDidMount() {}

  updateLegendPosition = (value) => {
    const options = cloneDeep(this.state.options);

    options.legend.position = value;

    this.setState({ options });
  };

  setLegendEnabled = (enabled) => {
    const options = cloneDeep(this.state.options);

    options.legend.enabled = enabled;

    this.setState({ options });
  };

  render() {
    return (
      <div className="wrapper">
        <div className="toolPanel">
          <button onClick={() => this.setLegendEnabled(true)}>
            Show Legend
          </button>
          <span className="spacer"></span>
          <button onClick={() => this.setLegendEnabled(false)}>
            Hide Legend
          </button>
          <span className="spacer"></span>
          <div className="button-group">
            Legend Position:
            <span className="spacer"></span>
            <button
              className="button--code"
              onClick={() => this.updateLegendPosition("right")}
            >
              'right'
            </button>
            <span className="spacer"></span>
            <button
              className="button--code"
              onClick={() => this.updateLegendPosition("bottom")}
            >
              'bottom'
            </button>
            <span className="spacer"></span>
            <button
              className="button--code"
              onClick={() => this.updateLegendPosition("left")}
            >
              'left'
            </button>
            <span className="spacer"></span>
            <button
              className="button--code"
              onClick={() => this.updateLegendPosition("top")}
            >
              'top'
            </button>
          </div>
        </div>
        <AgChartsReact options={this.state.options} />
      </div>
    );
  }
}

render(<ChartExample />, document.querySelector("#root"));
