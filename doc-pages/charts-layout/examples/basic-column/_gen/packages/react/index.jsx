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
    data: data,
    
    title: {
        text: "Beverage Expenses",
    },
    subtitle: {
        text: "per quarter",
    },
    padding: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40,
    },
    series: [
        { type: "column", xKey: "beverage", yKey: "Q1", stacked: true },
        { type: "column", xKey: "beverage", yKey: "Q2", stacked: true },
        { type: "column", xKey: "beverage", yKey: "Q3", stacked: true },
        { type: "column", xKey: "beverage", yKey: "Q4", stacked: true },
    ],
    legend: {
        spacing: 40,
    },
}
        };

        
    }

    componentDidMount() {
        
    }

    

    render() {
        return <AgChartsReact
    options={this.state.options}
/>;
    }
}

var data = [
    {
        beverage: "Coffee",
        Q1: 450,
        Q2: 560,
        Q3: 600,
        Q4: 700,
    },
    {
        beverage: "Tea",
        Q1: 270,
        Q2: 380,
        Q3: 450,
        Q4: 520,
    },
    {
        beverage: "Milk",
        Q1: 180,
        Q2: 170,
        Q3: 190,
        Q4: 200,
    },
]

render(
    <ChartExample />,
    document.querySelector('#root')
)
