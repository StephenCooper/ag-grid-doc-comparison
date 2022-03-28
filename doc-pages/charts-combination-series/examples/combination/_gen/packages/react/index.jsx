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
            fills: ["#7cecb3", "#7cb5ec", "#ecb37c", "#ec7cb5", "#7c7dec"],
            strokes: ["#7cecb3", "#7cb5ec", "#ecb37c", "#ec7cb5", "#7c7dec"]
        },
    },
    title: {
        text: "Fruit & Vegetable Consumption",
        fontSize: 15,
    },
    series: COLUMN_AND_LINE,
    axes: [
        {
            type: "category",
            position: "bottom",
            gridStyle: [{
                    strokeWidth: 0
                }],
        },
        {
            // primary y axis
            type: "number",
            position: "left",
            keys: ["women", "men", "children", "adults"],
            title: {
                enabled: true,
                text: "Adults Who Eat 5 A Day (%)",
            },
        },
        {
            // secondary y axis
            type: "number",
            position: "right",
            keys: ["portions"],
            title: {
                enabled: true,
                text: "Portions Consumed (Per Day)",
            },
        }
    ],
    legend: {
        position: "bottom",
        item: {
            marker: {
                strokeWidth: 0,
            },
        },
    },
}
        };

        
    }

    componentDidMount() {
        
    }

    columnLine = () => {
const options = cloneDeep(this.state.options);

    console.log("Column & Line", COLUMN_AND_LINE);
    options.series = COLUMN_AND_LINE;
    

this.setState({ options });
}

    areaColumn = () => {
const options = cloneDeep(this.state.options);

    console.log("Column & Area", AREA_AND_COLUMN);
    options.series = AREA_AND_COLUMN;
    

this.setState({ options });
}

    render() {
        return <div className="wrapper">
    <div id="toolPanel">
        <button onClick={() => this.areaColumn()}>Area &amp; Column</button>
        <span className="spacer"></span>
        <button onClick={() => this.columnLine()}>Column &amp; Line</button>
        <span className="spacer"></span>
    </div>
    <AgChartsReact
    options={this.state.options}
/>
</div>;
    }
}

function tooltipRenderer(params) {
    const { yValue, xValue } = params;
    return {
        content: `${xValue}: ${yValue}%`
    };
}
const WOMEN = {
    type: "column",
    xKey: "year",
    yKey: "women",
    yName: "Women",
    grouped: true,
    strokeWidth: 0,
    tooltip: {
        renderer: tooltipRenderer
    },
}
const MEN = {
    type: "column",
    xKey: "year",
    yKey: "men",
    yName: "Men",
    grouped: true,
    strokeWidth: 0,
    tooltip: {
        renderer: tooltipRenderer
    },
}
const PORTIONS = {
    type: "line",
    xKey: "year",
    yKey: "portions",
    yName: "Portions",
    strokeWidth: 3,
    marker: {
        enabled: false,
    },
    tooltip: {
        renderer: tooltipRenderer
    },
}
const COLUMN_AND_LINE = [
    { ...WOMEN, type: 'column' },
    { ...MEN, type: 'column' },
    { ...PORTIONS, type: 'line' },
]
const AREA_AND_COLUMN = [
    { ...PORTIONS, type: 'area' },
    { ...WOMEN, type: 'column' },
    { ...MEN, type: 'column' },
]

render(
    <ChartExample />,
    document.querySelector('#root')
)
