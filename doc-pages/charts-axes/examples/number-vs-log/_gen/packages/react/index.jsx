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
          { os: "A", share: 10 },
          { os: "B", share: 100 },
          { os: "C", share: 1000 },
        ],
        series: [
          {
            type: "line",
            xKey: "os",
            yKey: "share",
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
            label: {
              format: ".0f",
            },
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

  useNumberAxis = () => {
    const options = cloneDeep(this.state.options);

    options.axes = [
      {
        type: "category",
        position: "bottom",
      },
      {
        type: "number",
        position: "left",
        min: 1,
        label: {
          format: ".0f",
        },
        tick: {
          count: 10,
        },
      },
    ];

    this.setState({ options });
  };

  useLogAxis = () => {
    const options = cloneDeep(this.state.options);

    options.axes = [
      {
        type: "category",
        position: "bottom",
      },
      {
        type: "log",
        position: "left",
        min: 10,
        label: {
          format: ".0f",
        },
        tick: {
          count: 10,
        },
      },
    ];

    this.setState({ options });
  };

  useBaseTwoLogAxis = () => {
    const options = cloneDeep(this.state.options);

    options.axes = [
      {
        type: "category",
        position: "bottom",
      },
      {
        type: "log",
        position: "left",
        min: 10,
        label: {
          format: ".0f",
        },
        tick: {
          count: 10,
        },
        base: 2,
      },
    ];

    this.setState({ options });
  };

  useLogAxisWithFewerTicks = () => {
    const options = cloneDeep(this.state.options);

    options.axes = [
      {
        type: "category",
        position: "bottom",
      },
      {
        type: "log",
        position: "left",
        min: 10,
        label: {
          format: ".0f",
        },
        tick: {
          count: 2, // a hint that we want a smaller tick count
        },
      },
    ];

    this.setState({ options });
  };

  render() {
    return (
      <div className="wrapper">
        <div id="toolPanel">
          <button onClick={() => this.useNumberAxis()}>Number axis</button>
          <span className="spacer"></span>
          <button onClick={() => this.useLogAxis()}>Base 10 log axis</button>
          <span className="spacer"></span>
          <button onClick={() => this.useBaseTwoLogAxis()}>
            Base 2 log axis
          </button>
          <span className="spacer"></span>
          <button onClick={() => this.useLogAxisWithFewerTicks()}>
            Log axis with fewer ticks (base 10)
          </button>
        </div>
        <AgChartsReact options={this.state.options} />
      </div>
    );
  }
}

render(<ChartExample />, document.querySelector("#root"));
