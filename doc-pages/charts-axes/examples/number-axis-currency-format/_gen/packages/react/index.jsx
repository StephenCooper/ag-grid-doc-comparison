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
        series: [
          {
            type: 'line',
            xKey: 'date',
            yKey: 'temp',
          },
        ],
        axes: [
          {
            type: 'number',
            position: 'left',
            label: {
              format: '$~s',
              formatter: (params) =>
                params
                  .formatter(params.value)
                  .replace('k', 'K')
                  .replace('G', 'B'),
            },
          },
          {
            type: 'time',
            nice: false,
            position: 'bottom',
            tick: {
              count: agCharts.time.month,
            },
            label: {
              format: '%b %Y',
            },
          },
        ],
        padding: {
          top: 20,
          right: 40,
          bottom: 20,
          left: 20,
        },
        legend: {
          enabled: false,
        },
        data: [
          {
            date: new Date('01 Jan 2019 00:00:00 GMT'),
            temp: 2253707135,
          },
          {
            date: new Date('01 Feb 2019 00:00:00 GMT'),
            temp: 3159723083,
          },
          {
            date: new Date('01 Mar 2019 00:00:00 GMT'),
            temp: 2725102372,
          },
          {
            date: new Date('01 Apr 2019 00:00:00 GMT'),
            temp: 1725002378,
          },
          {
            date: new Date('01 May 2019 00:00:00 GMT'),
            temp: 4725823927,
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
