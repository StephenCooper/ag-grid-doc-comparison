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
          text: 'Race demographics',
        },
        subtitle: {
          text: 'Number of participants by age',
        },
        data: getData(),
        series: [
          {
            type: 'histogram',
            xKey: 'age',
            xName: 'Participant Age',
            binCount: 20,
          },
        ],
        legend: {
          enabled: false,
        },
        axes: [
          {
            type: 'number',
            position: 'bottom',
            title: { text: 'Age (years)' },
          },
          {
            type: 'number',
            position: 'left',
            title: { text: 'Number of participants' },
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
