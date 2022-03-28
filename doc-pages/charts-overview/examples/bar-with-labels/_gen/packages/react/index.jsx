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
        text: 'Change in Number of Jobs in UK (June to September 2019)',
        fontSize: 18,
    },
    subtitle: {
        text: 'Source: Office for National Statistics',
    },
    series: [
        {
            type: 'bar',
            xKey: 'job',
            yKey: 'change',
            fill: 'rgba(0, 117, 163, 0.9)',
            stroke: 'rgba(0, 117, 163, 0.9)',
            highlightStyle: {
                item: {
                    fill: '#0ab9ff',
                },
            },
            label: {
                fontWeight: 'bold',
                color: 'white',
                formatter: function (params) {
                    return (params.value > 0 ? '+' : '') + params.value;
                },
            },
        },
    ],
    axes: [
        {
            type: 'category',
            position: 'left',
        },
        {
            type: 'number',
            position: 'bottom',
            title: {
                enabled: true,
                text: 'Change in number of jobs (thousands)',
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
