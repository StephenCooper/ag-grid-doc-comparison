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
        data: getData().filter(function (d) {
          return d.magnitude > 4;
        }),
        title: {
          text: 'Worldwide Earthquakes (first week of February 2020)',
          fontSize: 18,
        },
        subtitle: {
          text: 'Source: US Geological Survey',
        },
        series: [
          {
            type: 'scatter',
            xKey: 'depth',
            xName: 'Depth',
            yKey: 'minDistance',
            yName: 'Minimum Distance',
            sizeKey: 'magnitude',
            sizeName: 'Magnitude',
            marker: {
              size: minSize,
              maxSize: maxSize,
              formatter: (params) => {
                return {
                  fill: params.highlighted
                    ? params.fill
                    : calculateColour(params.size),
                };
              },
              strokeWidth: 0,
            },
            fillOpacity: 0.7,
          },
        ],
        axes: [
          {
            position: 'bottom',
            type: 'number',
            title: {
              text: 'Depth (m)',
            },
          },
          {
            position: 'left',
            type: 'number',
            title: {
              text: 'Minimum distance (km)',
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

  render() {
    return <AgChartsReact options={this.state.options} />;
  }
}

var minSize = 5;
var maxSize = 100;
function find(arr, predicate) {
  for (var i = 0, ln = arr.length; i < ln; i++) {
    var value = arr[i];
    if (predicate(value, i, arr)) {
      return value;
    }
  }
}
function calculateColour(size) {
  var colours = {
    0.1: '#33CC00',
    0.2: '#5CC200',
    0.3: '#85B800',
    0.4: '#ADAD00',
    0.5: '#D6A300',
    0.6: '#FF9900',
    0.7: '#FF7300',
    0.8: '#FF4D00',
    0.9: '#FF2600',
    1: '#FF0000',
  };
  var position = (size - minSize) / (maxSize - minSize);
  var keys = Object.keys(colours)
    .map(function (key) {
      return parseFloat(key);
    })
    .sort();
  var matchingKey = find(keys, function (key) {
    return key > position;
  });
  return colours[matchingKey];
}

render(<ChartExample />, document.querySelector('#root'));
