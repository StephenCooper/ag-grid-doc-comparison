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
          item: {
            paddingX: 32,
            paddingY: 8,
            marker: {
              padding: 8,
            },
          },
        },
      },
    };
  }

  componentDidMount() {}

  updateLegendItemPaddingX = (event) => {
    const options = cloneDeep(this.state.options);

    var value = +event.target.value;
    options.legend.item.paddingX = value;

    document.getElementById("xPaddingValue").innerHTML = String(value);

    this.setState({ options });
  };

  updateLegendItemPaddingY = (event) => {
    const options = cloneDeep(this.state.options);

    var value = event.target.value;
    options.legend.item.paddingY = +event.target.value;

    document.getElementById("yPaddingValue").innerHTML = String(value);

    this.setState({ options });
  };

  updateLegendItemSpacing = (event) => {
    const options = cloneDeep(this.state.options);

    var value = +event.target.value;
    options.legend.item.marker.padding = value;

    document.getElementById("markerPaddingValue").innerHTML = String(value);

    this.setState({ options });
  };

  render() {
    return (
      <div className="wrapper">
        <div className="toolPanel">
          <div className="slider">
            <label for="xPaddingLabel">
              <strong>item.paddingX:</strong>
            </label>
            <span id="xPaddingValue" className="slider-value">
              32
            </span>
            <input
              type="range"
              id="xPaddingLabel"
              min="0"
              max="50"
              onInput={() => this.updateLegendItemPaddingX(event)}
              onChange={() => this.updateLegendItemPaddingX(event)}
            />
          </div>
        </div>
        <div className="toolPanel">
          <div className="slider">
            <label for="yPaddingLabel">
              <strong>item.paddingY:</strong>
            </label>
            <span id="yPaddingValue" className="slider-value">
              8
            </span>
            <input
              type="range"
              id="yPaddingLabel"
              min="0"
              max="30"
              onInput={() => this.updateLegendItemPaddingY(event)}
              onChange={() => this.updateLegendItemPaddingY(event)}
            />
          </div>
        </div>
        <div className="toolPanel">
          <div className="slider">
            <label for="markerPaddingLabel">
              <strong>item.marker.padding:</strong>
            </label>
            <span id="markerPaddingValue" className="slider-value">
              8
            </span>
            <input
              type="range"
              id="markerPaddingLabel"
              min="0"
              max="30"
              onInput={() => this.updateLegendItemSpacing(event)}
              onChange={() => this.updateLegendItemSpacing(event)}
            />
          </div>
        </div>
        <AgChartsReact options={this.state.options} />
      </div>
    );
  }
}

render(<ChartExample />, document.querySelector("#root"));
