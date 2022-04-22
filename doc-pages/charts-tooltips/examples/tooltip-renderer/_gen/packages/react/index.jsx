'use strict';

import React, { Component } from 'react';
import { cloneDeep } from 'lodash';
import { render } from 'react-dom';
import * as agCharts from 'ag-charts-community';
import { AgChartsReact } from 'ag-charts-react';

class ChartExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        data: [
          {
            month: 'Dec',
            sweaters: 50,
            hats: 40,
          },
          {
            month: 'Jan',
            sweaters: 70,
            hats: 50,
          },
          {
            month: 'Feb',
            sweaters: 60,
            hats: 30,
          },
        ],
        series: [
          {
            type: 'column',
            xKey: 'month',
            tooltip: { renderer: renderer },
            yKey: 'sweaters',
            yName: 'Sweaters made',
            stacked: true,
          },
          {
            type: 'column',
            xKey: 'month',
            tooltip: { renderer: renderer },
            yKey: 'hats',
            yName: 'Hats made',
            stacked: true,
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

function renderer(params) {
  return (
    '<div class="ag-chart-tooltip-title" style="background-color:' +
    params.color +
    '">' +
    params.xValue +
    '</div>' +
    '<div class="ag-chart-tooltip-content">' +
    params.yValue.toFixed(0) +
    '</div>'
  );
}

render(<ChartExample />, document.querySelector('#root'));
