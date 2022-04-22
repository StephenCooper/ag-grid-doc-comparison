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
          text: 'Most Populous Cities (2019)',
          fontSize: 18,
        },
        subtitle: {
          text: 'Source: Simple Maps',
        },
        series: [
          {
            type: 'scatter',
            title: 'Most populous cities',
            xKey: 'lon',
            xName: 'Longitude',
            yKey: 'lat',
            yName: 'Latitude',
            sizeKey: 'population',
            sizeName: 'Population',
            labelKey: 'city',
            labelName: 'City',
            marker: {
              size: 5,
              maxSize: 100,
            },
            fillOpacity: 0.5,
          },
        ],
        axes: [
          {
            position: 'bottom',
            type: 'number',
            title: {
              enabled: true,
              text: 'Longitude',
            },
            min: -180,
            max: 180,
            nice: false,
          },
          {
            position: 'left',
            type: 'number',
            title: {
              enabled: true,
              text: 'Latitude',
            },
            min: -90,
            max: 90,
            nice: false,
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
