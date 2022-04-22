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
          text: 'Average low/high temperatures in London',
        },
        subtitle: {
          text: '(click a data point for details)',
        },
        data: [
          { month: 'March', low: 3.9, high: 11.3 },
          { month: 'April', low: 5.5, high: 14.2 },
          { month: 'May', low: 8.7, high: 17.9 },
        ],
        series: [
          {
            type: 'line',
            xKey: 'month',
            yKey: 'high',
          },
          {
            type: 'column',
            xKey: 'month',
            yKey: 'low',
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
          },
        ],
        legend: {
          enabled: false,
        },
        tooltip: {
          tracking: false,
        },
        listeners: {
          seriesNodeClick: function (event) {
            var datum = event.datum;
            window.alert(
              'Temperature in ' +
                datum[event.xKey] +
                ': ' +
                String(datum[event.yKey]) +
                '°C' +
                '\nSeries: ' +
                event.series.id
            );
          },
        },
      },
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="wrapper">
        <AgChartsReact options={this.state.options} />
      </div>
    );
  }
}

function listUnitsSoldByBrand(brands) {
  var result = '';
  for (var key in brands) {
    result += key + ': ' + brands[key] + '\n';
  }
  return result;
}

render(<ChartExample />, document.querySelector('#root'));
