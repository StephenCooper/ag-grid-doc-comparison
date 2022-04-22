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
          text: "Most Common Girls' First Names In English",
        },
        subtitle: {
          text: 'over the past 100 years',
        },
        data: [
          { name: 'Mary', count: 234000 },
          { name: 'Patricia', count: 211000 },
          { name: 'Jennifer', count: 178000 },
          { name: 'Elizabeth', count: 153000 },
          { name: 'Linda', count: 123000 },
        ],
        series: [
          {
            type: 'line',
            xKey: 'name',
            yKey: 'count',
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
      },
    };
  }

  componentDidMount() {}

  useGridStyle1 = () => {
    const options = cloneDeep(this.state.options);

    var gridStyle = [
      {
        stroke: 'gray',
        lineDash: [10, 5],
      },
      {
        stroke: 'lightgray',
        lineDash: [5, 5],
      },
    ];
    options.axes[0].gridStyle = gridStyle;
    options.axes[1].gridStyle = gridStyle;

    this.setState({ options });
  };

  useGridStyle2 = () => {
    const options = cloneDeep(this.state.options);

    var xGridStyle = [
      {
        stroke: 'red',
        lineDash: [3, 3],
      },
    ];
    var yGridStyle = [
      {
        stroke: 'green',
        lineDash: [8, 3, 3, 3],
      },
    ];
    options.axes[0].gridStyle = xGridStyle;
    options.axes[1].gridStyle = yGridStyle;

    this.setState({ options });
  };

  useDefaultGridStyle = () => {
    const options = cloneDeep(this.state.options);

    var gridStyle = [
      {
        stroke: 'rgba(219, 219, 219, 1)',
        lineDash: [4, 2],
      },
    ];
    options.axes[0].gridStyle = gridStyle;
    options.axes[1].gridStyle = gridStyle;

    this.setState({ options });
  };

  render() {
    return (
      <div className="wrapper">
        <div id="toolPanel">
          <button onClick={() => this.useGridStyle1()}>Grid Style #1</button>
          <span className="spacer"></span>
          <button onClick={() => this.useGridStyle2()}>Grid Style #2</button>
          <span className="spacer"></span>
          <button onClick={() => this.useDefaultGridStyle()}>
            Default Grid Style
          </button>
        </div>
        <AgChartsReact options={this.state.options} />
      </div>
    );
  }
}

render(<ChartExample />, document.querySelector('#root'));
