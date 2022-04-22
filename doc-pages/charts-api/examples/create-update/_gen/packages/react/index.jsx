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
          text: 'Browser Usage Statistics',
        },
        subtitle: {
          text: '2009-2019',
        },
        data: getData(),
        series,
        legend,
      },
    };
  }

  componentDidMount() {}

  reverseSeries = () => {
    const options = cloneDeep(this.state.options);

    // Mutate options.
    options.series = series.reverse();
    // Apply changes.

    this.setState({ options });
  };

  swapTitles = () => {
    const options = cloneDeep(this.state.options);

    // Mutate options.
    const oldTitle = options.title;
    options.title = options.subtitle;
    options.subtitle = oldTitle;
    // Apply changes.

    this.setState({ options });
  };

  rotateLegend = () => {
    const options = cloneDeep(this.state.options);

    // Mutate legend.
    const currentIdx = positions.indexOf(legend.position || 'top');
    legend.position = positions[(currentIdx + 1) % positions.length];
    // Apply changes.
    options.legend = legend;

    this.setState({ options });
  };

  render() {
    return (
      <div className="wrapper">
        <div id="toolPanel">
          <button onClick={() => this.reverseSeries()}>Reverse Series</button>
          <span className="spacer"></span>
          <button onClick={() => this.swapTitles()}>Swap Titles</button>
          <span className="spacer"></span>
          <button onClick={() => this.rotateLegend()}>Rotate Legend</button>
          <span className="spacer"></span>
        </div>
        <AgChartsReact options={this.state.options} />
      </div>
    );
  }
}

function buildSeries(name) {
  return {
    type: 'area',
    xKey: 'year',
    yKey: name.toLowerCase(),
    yName: name,
    fillOpacity: 0.5,
  };
}
const series = [
  buildSeries('IE'),
  buildSeries('Chrome'),
  buildSeries('Firefox'),
  buildSeries('Safari'),
];
const positions = ['left', 'top', 'right', 'bottom'];
const legend = {
  position: positions[1],
};

render(<ChartExample />, document.querySelector('#root'));
