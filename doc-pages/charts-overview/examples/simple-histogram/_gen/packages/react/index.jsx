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
        text: 'Engine size distribution (USA 1987)',
        fontSize: 18,
    },
    subtitle: {
        text: 'Source: UCI',
    },
    series: [
        {
            type: 'histogram',
            xKey: 'engine-size',
            xName: 'Engine Size',
            fillOpacity: 0.5,
        },
    ],
    axes: [
        {
            position: 'bottom',
            type: 'number',
            title: {
                enabled: true,
                text: 'Engine Size (Cubic inches)',
            },
        },
        {
            position: 'left',
            type: 'number',
            title: {
                enabled: true,
                text: 'Frequency',
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
