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
          text: 'Fuel Spending (2019)',
        },
        data: [
          {
            quarter: 'Q1',
            petrol: 200,
            electric: 50,
          },
          {
            quarter: 'Q2',
            petrol: 300,
            electric: 60,
          },
          {
            quarter: 'Q3',
            petrol: 350,
            electric: 70,
          },
          {
            quarter: 'Q4',
            petrol: 400,
            electric: 50,
          },
        ],
        series: [
          {
            type: 'area',
            xKey: 'quarter',
            yKey: 'petrol',
            yName: 'Petrol',
            stacked: true,
            marker: { formatter },
          },
          {
            type: 'area',
            xKey: 'quarter',
            yKey: 'electric',
            yName: 'Electric',
            stacked: true,
            marker: { formatter },
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

function formatter({ yKey, size }) {
  return { size: yKey === 'electric' ? 12 : size };
}

render(<ChartExample />, document.querySelector('#root'));
