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
        title: {
          text: 'Weight vs Height (by gender)',
        },
        subtitle: {
          text: 'with name labels',
        },
        series: [
          {
            type: 'scatter',
            title: 'Male',
            data: maleHeightWeight,
            xKey: 'height',
            xName: 'Height',
            yKey: 'weight',
            yName: 'Weight',
            sizeKey: 'age',
            sizeName: 'Age',
            labelKey: 'name',
            marker: {
              shape: 'square',
              size: 6,
              maxSize: 30,
              fill: 'rgba(227,111,106,0.71)',
              stroke: '#9f4e4a',
            },
            label: {
              enabled: true,
            },
          },
          {
            type: 'scatter',
            title: 'Female',
            data: femaleHeightWeight,
            xKey: 'height',
            xName: 'Height',
            yKey: 'weight',
            yName: 'Weight',
            sizeKey: 'age',
            sizeName: 'Age',
            labelKey: 'name',
            marker: {
              size: 6,
              maxSize: 30,
              fill: 'rgba(123,145,222,0.71)',
              stroke: '#56659b',
            },
            label: {
              enabled: true,
            },
          },
        ],
        axes: [
          {
            type: 'number',
            position: 'bottom',
            title: {
              text: 'Height',
            },
            label: {
              rotation: 45,
              formatter: (params) => {
                return params.value + 'cm';
              },
            },
          },
          {
            type: 'number',
            position: 'left',
            title: {
              text: 'Weight',
            },
            label: {
              formatter: (params) => {
                return params.value + 'kg';
              },
            },
          },
        ],
      },
    };
  }

  componentDidMount() {}

  updateFontSize = (event) => {
    const options = cloneDeep(this.state.options);

    var value = +event.target.value;
    options.series[0].label.fontSize = value;
    options.series[1].label.fontSize = value;

    document.getElementById('fontSizeSliderValue').innerHTML = String(value);

    this.setState({ options });
  };

  render() {
    return (
      <div className="wrapper">
        <div id="toolPanel">
          <div className="slider">
            <label for="sliderInput">
              <strong>Label font size:&nbsp;</strong>
            </label>
            <span id="fontSizeSliderValue">12</span>
            <input
              type="range"
              id="sliderInput"
              min="8"
              max="30"
              defaultValue="12"
              step="1"
              onInput={() => this.updateFontSize(event)}
              onChange={() => this.updateFontSize(event)}
            />
          </div>
        </div>
        <AgChartsReact options={this.state.options} />
      </div>
    );
  }
}

render(<ChartExample />, document.querySelector('#root'));
