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
    
    data: [
        { os: 'Android', share: 56.9, satisfaction: 10 },
        { os: 'iOS', share: 22.5, satisfaction: 15 },
        { os: 'BlackBerry', share: 6.8, satisfaction: 5 },
        { os: 'Symbian', share: 8.5, satisfaction: 1 },
        { os: 'Bada', share: 2.6, satisfaction: 2 },
        { os: 'Windows', share: 1.9, satisfaction: 12 },
    ],
    series: [
        {
            type: 'pie',
            title: {
                text: 'Market Share',
            },
            labelKey: 'os',
            angleKey: 'share',
            innerRadiusOffset: -40,
        },
        {
            type: 'pie',
            title: {
                text: 'Satisfaction',
            },
            labelKey: 'os',
            angleKey: 'satisfaction',
            outerRadiusOffset: -100,
            innerRadiusOffset: -140,
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
