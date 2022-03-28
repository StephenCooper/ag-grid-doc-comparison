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
        text: 'Punch Card of Github',
        fontSize: 18,
    },
    subtitle: {
        text: 'time distribution of commits',
    },
    series: [
        {
            type: 'scatter',
            xKey: 'hour',
            xName: 'Time',
            yKey: 'day',
            yName: 'Day',
            sizeKey: 'size',
            sizeName: 'Commits',
            title: 'Punch Card',
            marker: {
                size: 0,
                maxSize: 30,
                fill: '#cc5b58',
            },
            fillOpacity: 0.85,
        },
    ],
    axes: [
        {
            position: 'bottom',
            type: 'category',
            gridStyle: [
                {
                    stroke: 'rgba(0,0,0,0.2)',
                    lineDash: [0, 5, 0],
                },
            ],
            tick: {
                color: 'black',
            },
            line: {
                color: undefined,
            },
        },
        {
            position: 'left',
            type: 'category',
            gridStyle: [],
            tick: {
                color: 'black',
            },
            line: {
                color: undefined,
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
