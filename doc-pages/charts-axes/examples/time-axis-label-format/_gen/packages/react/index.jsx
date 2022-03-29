"use strict";

import * as agCharts from "ag-charts-community";
import { AgChartsReact } from "ag-charts-react";
import { cloneDeep } from "lodash";
import React, { Component } from "react";
import { render } from "react-dom";

class ChartExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        title: {
          text: "Monthly average daily temperatures in the UK",
        },
        series: [
          {
            type: "line",
            xKey: "date",
            yKey: "temp",
          },
        ],
        axes: [
          {
            type: "time",
            nice: false,
            position: "bottom",
            tick: {
              count: agCharts.time.month,
            },
            label: {
              format: "%b %Y",
            },
          },
          {
            type: "number",
            position: "left",
            label: {
              formatter: function (params) {
                return params.value + " °C";
              },
            },
          },
        ],
        padding: {
          top: 20,
          right: 40,
          bottom: 20,
          left: 20,
        },
        legend: {
          enabled: false,
        },
        data: [
          {
            date: new Date("01 Jan 2019 00:00:00 GMT"),
            temp: 4.2,
          },
          {
            date: new Date("01 Feb 2019 00:00:00 GMT"),
            temp: 6.9,
          },
          {
            date: new Date("01 Mar 2019 00:00:00 GMT"),
            temp: 7.9,
          },
          {
            date: new Date("01 Apr 2019 00:00:00 GMT"),
            temp: 9.1,
          },
          {
            date: new Date("01 May 2019 00:00:00 GMT"),
            temp: 11.2,
          },
        ],
      },
    };
  }

  componentDidMount() {}

  useOneMonthInterval = () => {
    const options = cloneDeep(this.state.options);

    options.axes[0].tick.count = agCharts.time.month;

    this.setState({ options });
  };

  useTwoMonthInterval = () => {
    const options = cloneDeep(this.state.options);

    options.axes[0].tick.count = agCharts.time.month.every(2);

    this.setState({ options });
  };

  render() {
    return (
      <div className="wrapper">
        <div id="toolPanel">
          <button onClick={() => this.useOneMonthInterval()}>
            Use one month interval
          </button>
          <span className="spacer"></span>
          <button onClick={() => this.useTwoMonthInterval()}>
            Use two month interval
          </button>
        </div>
        <AgChartsReact options={this.state.options} />
      </div>
    );
  }
}

render(<ChartExample />, document.querySelector("#root"));
