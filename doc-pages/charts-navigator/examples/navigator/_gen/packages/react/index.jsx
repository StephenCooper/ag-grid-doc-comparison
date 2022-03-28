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
    
    title: {
        text: "Try dragging the Navigator's handles to zoom in",
    },
    subtitle: {
        text: 'or the area between them to pan around',
    },
    data: [
        { label: 'Android', value: 56.9 },
        { label: 'iOS', value: 22.5 },
        { label: 'BlackBerry', value: 6.8 },
        { label: 'Symbian', value: 8.5 },
        { label: 'Bada', value: 2.6 },
        { label: 'Windows', value: 1.9 },
    ],
    series: [
        {
            type: 'column',
            xKey: 'label',
            yKey: 'value',
        },
    ],
    axes: [
        {
            type: 'number',
            position: 'left',
        },
        {
            type: 'category',
            position: 'bottom',
        },
    ],
    legend: {
        enabled: false,
    },
    navigator: {
        enabled: true,
    },
}
        };

        
    }

    componentDidMount() {
        
    }

    toggleEnabled = (value) => {
const options = cloneDeep(this.state.options);

    options.navigator.enabled = value;
    

this.setState({ options });
}

    render() {
        return <div className="wrapper">
    <div className="toolPanel">
        <button onClick={() => this.toggleEnabled(true)}>Show Navigator</button>
        <button onClick={() => this.toggleEnabled(false)}>Hide Navigator</button>
    </div>
    <AgChartsReact
    options={this.state.options}
/>
</div>;
    }
}



render(
    <ChartExample />,
    document.querySelector('#root')
)
