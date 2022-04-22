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
          text: 'GDP by country in billions of USD (2018)',
        },
        data: [
          {
            country: 'Spain',
            gdp: 1419,
          },
          {
            country: 'UK',
            gdp: 2855,
          },
          {
            country: 'Germany',
            gdp: 3948,
          },
          {
            country: 'France',
            gdp: 2778,
          },
        ],
        series: [
          {
            type: 'column',
            xKey: 'country',
            yKey: 'gdp',
            showInLegend: false,
            formatter: function (params) {
              return {
                fill:
                  params.datum[params.xKey] === 'UK'
                    ? params.highlighted
                      ? 'lime'
                      : 'red'
                    : params.fill,
              };
            },
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
