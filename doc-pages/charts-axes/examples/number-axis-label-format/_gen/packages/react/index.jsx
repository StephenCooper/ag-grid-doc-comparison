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
        text: 'Monthly average daily temperatures in the UK',
    },
    series: [
        {
            type: 'line',
            xKey: 'date',
            yKey: 'temp',
        },
    ],
    axes: [
        {
            type: 'number',
            position: 'left',
            label: {
                format: '🌧️ #{0>2.0f} °C',
            },
        },
        {
            type: 'time',
            nice: false,
            position: 'bottom',
            tick: {
                count: agCharts.time.month,
            },
            label: {
                format: '%b %Y',
            },
        },
    ],
    padding: {
        top: 20,
        right: 40,
        bottom: 20,
        left: 20,
    },
    legend: {
        enabled: false,
    },
    data: [
        {
            date: new Date('01 Jan 2019 00:00:00 GMT'),
            temp: 4.2,
        },
        {
            date: new Date('01 Feb 2019 00:00:00 GMT'),
            temp: 6.9,
        },
        {
            date: new Date('01 Mar 2019 00:00:00 GMT'),
            temp: 7.9,
        },
        {
            date: new Date('01 Apr 2019 00:00:00 GMT'),
            temp: 9.1,
        },
        {
            date: new Date('01 May 2019 00:00:00 GMT'),
            temp: 11.2,
        },
    ],
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
