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
        autoSize: true,
        title: {
          text: 'Average expenditure on coffee',
        },
        subtitle: {
          text: 'per person per week in Krakozhia',
        },
        data: [
          {
            year: '2015',
            spending: 35,
          },
          {
            year: '2016',
            spending: 40,
          },
          {
            year: '2017',
            spending: 43,
          },
          {
            year: '2018',
            spending: 44,
          },
        ],
        series: [
          {
            xKey: 'year',
            yKey: 'spending',
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
