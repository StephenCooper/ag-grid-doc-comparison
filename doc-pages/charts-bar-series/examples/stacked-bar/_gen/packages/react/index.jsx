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
          text: "Apple's revenue by product category",
        },
        subtitle: {
          text: 'in billion U.S. dollars',
        },
        data: getData(),
        series: [
          {
            type: 'bar',
            xKey: 'quarter',
            yKey: 'iphone',
            yName: 'iPhone',
            stacked: true,
          },
          {
            type: 'bar',
            xKey: 'quarter',
            yKey: 'mac',
            yName: 'Mac',
            stacked: true,
          },
          {
            type: 'bar',
            xKey: 'quarter',
            yKey: 'ipad',
            yName: 'iPad',
            stacked: true,
          },
          {
            type: 'bar',
            xKey: 'quarter',
            yKey: 'wearables',
            yName: 'Wearables',
            stacked: true,
          },
          {
            type: 'bar',
            xKey: 'quarter',
            yKey: 'services',
            yName: 'Services',
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
