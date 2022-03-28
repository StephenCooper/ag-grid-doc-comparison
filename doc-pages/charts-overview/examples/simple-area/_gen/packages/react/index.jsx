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
            area: {
                series: {
                    fillOpacity: 0.8,
                }
            }
        },
    },
    title: {
        text: 'Total Visitors to Tate Galleries',
        fontSize: 18,
    },
    subtitle: {
        text: 'Source: Department for Digital, Culture, Media & Sport',
    },
    series: [
        {
            type: 'area',
            xKey: 'date',
            yKey: 'Tate Modern',
            fill: '#c16068',
            stroke: '#874349',
        },
        {
            type: 'area',
            xKey: 'date',
            yKey: 'Tate Britain',
            fill: '#a2bf8a',
            stroke: '#718661',
        },
        {
            type: 'area',
            xKey: 'date',
            yKey: 'Tate Liverpool',
            fill: '#ebcc87',
            stroke: '#a48f5f',
        },
        {
            type: 'area',
            xKey: 'date',
            yKey: 'Tate St Ives',
            fill: '#80a0c3',
            stroke: '#5a7088',
        },
    ],
    axes: [
        {
            type: 'time',
            position: 'bottom',
        },
        {
            type: 'number',
            position: 'left',
            title: {
                enabled: true,
                text: 'Total visitors',
            },
            label: {
                formatter: function (params) {
                    return params.value / 1000 + 'k';
                },
            },
        },
    ],
    legend: {
        position: 'bottom',
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
