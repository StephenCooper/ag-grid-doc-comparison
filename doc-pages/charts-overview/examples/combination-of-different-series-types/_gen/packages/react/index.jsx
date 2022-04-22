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
        theme: {
          palette: {
            fills: ['#c16068', '#a2bf8a', '#80a0c3'],
            strokes: ['#c16068', '#a2bf8a', '#80a0c3'],
          },
          overrides: {
            column: { series: { strokeWidth: 0 } },
            line: { series: { strokeWidth: 5, marker: { enabled: false } } },
          },
        },
        title: {
          text: 'Cattle Holdings and Beef Exports (UK)',
          fontSize: 18,
        },
        subtitle: {
          text:
            'Source: Department for Environment, Food & Rural Affairs; Agriculture and Horticulture Development Board',
        },
        series: [
          {
            type: 'column',
            xKey: 'year',
            yKey: 'male',
            yName: 'Male cattle',
          },
          {
            type: 'column',
            xKey: 'year',
            yKey: 'female',
            yName: 'Female cattle',
          },
          {
            type: 'line',
            xKey: 'year',
            yKey: 'exportedTonnes',
            yName: 'Beef exports',
          },
        ],
        axes: [
          {
            type: 'category',
            position: 'bottom',
          },
          {
            type: 'number',
            position: 'left',
            keys: ['male', 'female'],
            title: {
              enabled: true,
              text: 'Number of cattle',
            },
            label: {
              formatter: (params) => {
                return params.value / 1000 + 'M';
              },
            },
          },
          {
            type: 'number',
            position: 'right',
            keys: ['exportedTonnes'],
            title: {
              enabled: true,
              text: 'Exports (tonnes)',
            },
            label: {
              formatter: (params) => {
                return params.value / 1000 + 'k';
              },
            },
          },
        ],
        legend: {
          position: 'bottom',
          item: {
            marker: {
              shape: 'square',
              strokeWidth: 0,
            },
          },
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
