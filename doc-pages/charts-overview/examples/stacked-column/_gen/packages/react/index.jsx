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
        palette: {
            fills: ["#5BC0EB", "#FDE74C", "#9BC53D", "#E55934", "#FA7921"],
            strokes: ["#4086a4", "#b1a235", "#6c8a2b", "#a03e24", "#af5517"],
        },
        overrides: {
            column: {
                series: {
                    strokeWidth: 0,
                    highlightStyle: {
                        series: {
                            strokeWidth: 1,
                            dimOpacity: 0.3,
                        },
                    },
                },
            },
        },
    },
    title: {
        text: "Average Station Entries: Victoria Line (2010)",
        fontSize: 18,
    },
    subtitle: {
        text: "Source: Transport for London",
    },
    series: [
        {
            type: "column",
            xKey: "station",
            yKey: "early",
            stacked: true,
            yName: "Early",
        },
        {
            type: "column",
            xKey: "station",
            yKey: "morningPeak",
            yName: "Morning peak",
            stacked: true,
        },
        {
            type: "column",
            xKey: "station",
            yKey: "interPeak",
            yName: "Between peak",
            stacked: true,
        },
        {
            type: "column",
            xKey: "station",
            yKey: "afternoonPeak",
            yName: "Afternoon peak",
            stacked: true,
        },
        {
            type: "column",
            xKey: "station",
            yKey: "evening",
            yName: "Evening",
            stacked: true,
        },
    ],
    axes: [
        {
            type: "category",
            position: "bottom",
            label: {
                rotation: 30,
            },
        },
        {
            type: "number",
            position: "left",
            label: {
                formatter: function (params) {
                    return params.value / 1000 + "k";
                },
            },
        },
    ],
    legend: {
        spacing: 40,
        position: "bottom",
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
