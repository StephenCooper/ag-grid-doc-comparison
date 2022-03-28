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
        text: 'Navigator Styling',
    },
    data: [
        { label: 'Android', value: 56.9 },
        { label: 'iOS', value: 22.5 },
        { label: 'BlackBerry', value: 6.8 },
        { label: 'Symbian', value: 8.5 },
        { label: 'Bada', value: 2.6 },
        { label: 'Windows', value: 1.9 },
    ],
    series: [
        {
            type: 'column',
            xKey: 'label',
            yKey: 'value',
        },
    ],
    axes: [
        {
            type: 'number',
            position: 'left',
        },
        {
            type: 'category',
            position: 'bottom',
        },
    ],
    legend: {
        enabled: false,
    },
    navigator: {
        enabled: true,
        height: 50,
        min: 0.2,
        max: 0.7,
        mask: {
            fill: 'red',
            strokeWidth: 2,
            fillOpacity: 0.3,
        },
        minHandle: {
            fill: 'yellow',
            stroke: 'blue',
            width: 16,
            height: 30,
            gripLineGap: 4,
            gripLineLength: 12,
            strokeWidth: 2,
        },
        maxHandle: {
            fill: 'lime',
            stroke: 'black',
        },
    },
}
        };

        
    }

    componentDidMount() {
        
    }

    

    render() {
        return <div className="wrapper">
    <AgChartsReact
    options={this.state.options}
/>
</div>;
    }
}



render(
    <ChartExample />,
    document.querySelector('#root')
)
