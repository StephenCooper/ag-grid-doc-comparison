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
        data: getData(),
        title: {
          text: 'World Population Over Time',
        },
        subtitle: {
          text: 'log scale',
        },
        series: [
          {
            type: 'line',
            xKey: 'year',
            yKey: 'population',
          },
        ],
        axes: [
          {
            type: 'log',
            position: 'left',
            title: {
              enabled: true,
              text: 'Population',
            },
            label: {
              format: ',.0f',
              fontSize: 10,
            },
          },
          {
            type: 'number',
            position: 'bottom',
            title: {
              enabled: true,
              text: 'Year',
            },
            label: {
              fontSize: 10,
            },
          },
        ],
        legend: {
          enabled: false,
        },
      },
    };
  }

  componentDidMount() {}

  useNumberAxis = () => {
    const options = cloneDeep(this.state.options);

    options.subtitle = {
      text: 'linear scale',
    };
    options.axes[0] = {
      type: 'number',
      position: 'left',
      title: {
        enabled: true,
        text: 'Population',
      },
      label: {
        format: ',.0f',
        fontSize: 10,
      },
    };

    this.setState({ options });
  };

  useLogAxis = () => {
    const options = cloneDeep(this.state.options);

    options.subtitle = {
      text: 'log scale',
    };
    options.axes[0] = {
      type: 'log',
      position: 'left',
      title: {
        enabled: true,
        text: 'Population',
      },
      label: {
        format: ',.0f',
        fontSize: 10,
      },
    };

    this.setState({ options });
  };

  render() {
    return (
      <div className="wrapper">
        <div id="toolPanel">
          <button onClick={() => this.useNumberAxis()}>Number axis</button>
          <span className="spacer"></span>
          <button onClick={() => this.useLogAxis()}>Log axis</button>
        </div>
        <AgChartsReact options={this.state.options} />
      </div>
    );
  }
}

render(<ChartExample />, document.querySelector('#root'));
