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
    theme: {
        overrides: {
            bar: {
                series: {
                    strokeWidth: 0,
                },
            },
        },
    },
    title: {
        text: 'Gross Weekly Earnings by Occupation (Q4 2019)',
        fontSize: 18,
    },
    subtitle: {
        text: 'Source: Office for National Statistics',
    },
    series: [
        {
            type: 'bar',
            xKey: 'type',
            yKey: 'earnings',
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
                text: '£/week',
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
