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
        autoSize: true,
        data: getData().sort(function (a, b) {
          return getTotal(b) - getTotal(a);
        }),
        theme: {
          overrides: {
            bar: {
              series: {
                strokeWidth: 0,
                highlightStyle: {
                  series: {
                    strokeWidth: 1,
                    dimOpacity: 0.3,
                  },
                },
              },
            },
          },
        },
        title: {
          text: "UK Housing Stock (2016)",
          fontSize: 18,
        },
        subtitle: {
          text: "Source: Ministry of Housing, Communities & Local Government",
        },
        series: [
          {
            type: "bar",
            xKey: "type",
            yKey: "ownerOccupied",
            yName: "Owner occupied",
            stacked: true,
          },
          {
            type: "bar",
            xKey: "type",
            yKey: "privateRented",
            yName: "Private rented",
            stacked: true,
          },
          {
            type: "bar",
            xKey: "type",
            yKey: "localAuthority",
            yName: "Local authority",
            stacked: true,
          },
          {
            type: "bar",
            xKey: "type",
            yKey: "housingAssociation",
            yName: "Housing association",
            stacked: true,
          },
        ],
        axes: [
          {
            type: "category",
            position: "left",
          },
          {
            type: "number",
            position: "top",
          },
        ],
        legend: {
          position: "bottom",
        },
      },
    };
  }

  componentDidMount() {}

  render() {
    return <AgChartsReact options={this.state.options} />;
  }
}

function getTotal(datum) {
  return (
    datum.ownerOccupied +
    datum.privateRented +
    datum.localAuthority +
    datum.housingAssociation
  );
}

render(<ChartExample />, document.querySelector("#root"));
