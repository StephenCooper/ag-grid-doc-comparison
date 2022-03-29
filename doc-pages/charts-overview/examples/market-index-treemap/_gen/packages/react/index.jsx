"use strict";

import { AgChartsReact } from "ag-charts-react";
import React, { Component } from "react";
import { render } from "react-dom";

class ChartExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        type: "hierarchy",

        data,
        series: [
          {
            type: "treemap",
            labelKey: "name",
            sizeKey: "size",
            colorKey: "color",
            tooltip: {
              renderer: tooltipRenderer,
            },
          },
        ],
        title: {
          text: "S&P 500 index stocks categorized by sectors and industries.",
        },
        subtitle: {
          text: "Area represents market cap. Color represents change from the day before.",
        },
      },
    };
  }

  componentDidMount() {}

  render() {
    return <AgChartsReact options={this.state.options} />;
  }
}

function tooltipRenderer(params) {
  const { datum } = params;
  const customRootText = "Custom Root Text";
  const title = datum.parent
    ? datum.parent.depth
      ? datum.parent.datum[params.labelKey]
      : customRootText
    : customRootText;
  let content = "<div>";
  let ellipsis = false;
  if (datum.parent) {
    const maxCount = 5;
    ellipsis = datum.parent.children.length > maxCount;
    datum.parent.children.slice(0, maxCount).forEach((child) => {
      content += `<div style="font-weight: bold; color: white; background-color: ${
        child.fill
      }; padding: 5px;"><strong>${
        child.datum.name || child.label
      }</strong>: ${String(
        isFinite(child.colorValue) ? child.colorValue.toFixed(2) : ""
      )}%</div>`;
    });
  }
  if (ellipsis) {
    content += `<div style="text-align: center;">...</div>`;
  }
  content += "</div>";
  return {
    title,
    content,
    backgroundColor: "gray",
  };
}

render(<ChartExample />, document.querySelector("#root"));
