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
        { os: 'iOS', share: 22.5, satisfaction: 12 },
        { os: 'BlackBerry', share: 6.8, satisfaction: 9 },
        { os: 'Symbian', share: 8.5, satisfaction: 8 },
        { os: 'Bada', share: 2.6, satisfaction: 7 },
        { os: 'Windows', share: 1.9, satisfaction: 6 },
    ],
    series: [
        {
            type: 'pie',
            labelKey: 'os',
            angleKey: 'share',
            radiusKey: 'satisfaction',
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
