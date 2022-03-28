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
    type: 'hierarchy',
    
    data,
    series: [
        {
            type: 'treemap',
            labelKey: 'name',
            sizeKey: 'size',
            colorKey: 'color',
            tooltip: {
                renderer: params => {
                    return {
                        content: `<b>Change</b>: ${params.datum.colorValue.toFixed(2)}%`,
                    };
                },
            },
        },
    ],
    title: {
        text: 'S&P 500 index stocks categorized by sectors and industries.',
    },
    subtitle: {
        text: 'Area represents market cap. Color represents change from the day before.',
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
