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
        data: getData(),
        title: {
          text: 'Dwelling Fires (UK)',
          fontSize: 18,
        },
        subtitle: {
          text: 'Source: Home Office',
        },
        series: [
          {
            type: 'pie',
            labelKey: 'type',
            fillOpacity: 0.9,
            strokeWidth: 0,
            angleKey: '2018/19',
            label: {
              enabled: false,
            },
            title: {
              enabled: true,
              text: '2018/19',
            },
            innerRadiusOffset: -100,
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
