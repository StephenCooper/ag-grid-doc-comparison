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
          { os: 'Windows', share: 88.07 },
          { os: 'macOS', share: 9.44 },
          { os: 'Linux', share: 1.87 },
        ],
        series: [
          {
            type: 'column',
            xKey: 'os',
            yKey: 'share',
          },
        ],
        axes: [
          {
            type: 'category',
            position: 'bottom',
            title: {
              text: 'Desktop Operating Systems',
              enabled: false,
            },
          },
          {
            type: 'number',
            position: 'left',
            title: {
              text: 'Market Share (%)',
              enabled: false,
            },
            label: {
              formatter: (params) => {
                return params.value + '%';
              },
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

  render() {
    return (
      <div className="wrapper">
        <AgChartsReact options={this.state.options} />
      </div>
    );
  }
}

render(<ChartExample />, document.querySelector('#root'));
