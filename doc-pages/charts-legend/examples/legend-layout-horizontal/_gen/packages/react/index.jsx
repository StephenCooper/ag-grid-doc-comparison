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
        autoSize: false,
        width: 750,
        height: 430,
        data: [
          { label: "USA", value: 56.9 },
          { label: "UK", value: 22.5 },
          { label: "China", value: 6.8 },
          { label: "Russia", value: 8.5 },
          { label: "India", value: 2.6 },
          { label: "Germany", value: 18.2 },
          { label: "France", value: 12.5 },
          { label: "Canada", value: 3.9 },
          { label: "Spain", value: 7.9 },
          { label: "South Africa", value: 21.9 },
          { label: "Portugal", value: 7.4 },
          { label: "Netherlands", value: 4.7 },
          { label: "Finland", value: 3.9 },
          { label: "Sweden", value: 3.3 },
          { label: "Norway", value: 3.2 },
          { label: "Greece", value: 1.9 },
          { label: "Italy", value: 2.5 },
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
          position: "bottom",
        },
      },
    };
  }

  componentDidMount() {}

  updateWidth = (event) => {
    const options = cloneDeep(this.state.options);

    var value = +event.target.value;
    options.width = value;

    document.getElementById("sliderValue").innerHTML = String(value);

    this.setState({ options });
  };

  render() {
    return (
      <div className="wrapper">
        <div id="toolPanel">
          <div className="slider">
            <label for="sliderInput">
              <strong>Width:</strong>
            </label>
            <span id="sliderValue">750</span>
            <input
              type="range"
              id="sliderInput"
              min="350"
              max="750"
              defaultValue="750"
              onInput={() => this.updateWidth(event)}
              onChange={() => this.updateWidth(event)}
            />
          </div>
        </div>
        <AgChartsReact options={this.state.options} />
      </div>
    );
  }
}

render(<ChartExample />, document.querySelector("#root"));
