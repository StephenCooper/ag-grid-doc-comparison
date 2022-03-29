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
        data: generateSpiralData(),
        series: [
          {
            type: "line",
            xKey: "x",
            yKey: "y",
            marker: {
              enabled: false,
            },
          },
        ],
        axes: [
          {
            type: "number",
            position: "bottom",
            tick: {
              count: 10,
            },
          },
          {
            type: "number",
            position: "left",
            tick: {
              count: 10,
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

  setTickCountTo5 = () => {
    const options = cloneDeep(this.state.options);

    options.axes[0].tick.count = 5;
    options.axes[1].tick.count = 5;

    this.setState({ options });
  };

  setTickCountTo10 = () => {
    const options = cloneDeep(this.state.options);

    options.axes[0].tick.count = 10;
    options.axes[1].tick.count = 10;

    this.setState({ options });
  };

  render() {
    return (
      <div className="wrapper">
        <div id="toolPanel">
          <button onClick={() => this.setTickCountTo5()}>
            Set tick count to 5
          </button>
          <span className="spacer"></span>
          <button onClick={() => this.setTickCountTo10()}>
            Set tick count to 10 (default)
          </button>
        </div>
        <AgChartsReact options={this.state.options} />
      </div>
    );
  }
}

function generateSpiralData() {
  var a = 1;
  var b = 1;
  var data = [];
  var step = 0.1;
  for (var th = 1; th < 50; th += step) {
    var r = a + b * th;
    var datum = {
      x: r * Math.cos(th),
      y: r * Math.sin(th),
    };
    data.push(datum);
  }
  return data;
}

render(<ChartExample />, document.querySelector("#root"));
