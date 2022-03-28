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
            yKey: 'magnitude',
            yName: 'Magnitude',
            sizeKey: 'minDistance',
            sizeName: 'Minimum Distance',
            marker: {
                size: 5,
                maxSize: 100,
                fill: '#41874b',
                stroke: '#41874b',
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
                text: 'Depth (m)',
            },
        },
        {
            position: 'left',
            type: 'number',
            title: {
                enabled: true,
                text: 'Magnitude',
            },
        },
    ],
    legend: {
        enabled: false,
    },
}
        };

        
    }

    componentDidMount() {
        
    }

    

    render() {
        return <AgChartsReact
    options={this.state.options}
/>
;
    }
}



render(
    <ChartExample />,
    document.querySelector('#root')
)
