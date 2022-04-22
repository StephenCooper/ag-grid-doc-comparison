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
        title: {
          text: 'Browser Wars',
        },
        subtitle: {
          text: '2009-2019',
        },
        data: getData(),
        series: [
          {
            type: 'area',
            xKey: 'year',
            yKey: 'ie',
            yName: 'IE',
            stacked: true,
          },
          {
            type: 'area',
            xKey: 'year',
            yKey: 'firefox',
            yName: 'Firefox',
            stacked: true,
          },
          {
            type: 'area',
            xKey: 'year',
            yKey: 'safari',
            yName: 'Safari',
            stacked: true,
          },
          {
            type: 'area',
            xKey: 'year',
            yKey: 'chrome',
            yName: 'Chrome',
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

render(<ChartExample />, document.querySelector('#root'));
