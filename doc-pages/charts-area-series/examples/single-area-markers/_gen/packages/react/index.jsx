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
          text: 'Internet Explorer Market Share',
        },
        subtitle: {
          text: '2009-2019 (aka "good times")',
        },
        data: getData(),
        series: [
          {
            type: 'area',
            xKey: 'year',
            yKey: 'ie',
            yName: 'IE',
            marker: {
              enabled: true,
            },
            tooltip: {
              renderer: (params) => {
                return {
                  content: `${params.xValue}: ${params.yValue.toFixed(1)}%`,
                };
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
    return <AgChartsReact options={this.state.options} />;
  }
}

render(<ChartExample />, document.querySelector('#root'));
