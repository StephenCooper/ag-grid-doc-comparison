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
    
    theme: 'ag-default-dark',
    autoSize: true,
    padding: {
        left: 70,
        right: 70,
    },
    title: {
        text: 'Chart Theme Example',
    },
    data: [
        { label: 'Android', value: 56.9, other: 7 },
        { label: 'iOS', value: 22.5, other: 8 },
        { label: 'BlackBerry', value: 6.8, other: 9 },
        { label: 'Symbian', value: 8.5, other: 10 },
        { label: 'Bada', value: 2.6, other: 11 },
        { label: 'Windows', value: 1.9, other: 12 },
    ],
    series: [
        {
            type: 'pie',
            angleKey: 'value',
            labelKey: 'label',
        },
    ],
}
        };

        
    }

    componentDidMount() {
        
    }

    applyTheme = (theme) => {
const options = cloneDeep(this.state.options);

    options.theme = theme;
    

this.setState({ options });
}

    render() {
        return <div className="wrapper">
    <div className="toolPanel" style={{"paddingBottom":"15px"}}>
        <button onClick={() => this.applyTheme('ag-default')}>Default Theme</button>
        <button onClick={() => this.applyTheme('ag-default-dark')}>Default Dark Theme</button>
        <button onClick={() => this.applyTheme('ag-pastel-dark')}>Pastel Dark Theme</button>
        <button onClick={() => this.applyTheme('ag-vivid')}>Vivid Theme</button>
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
