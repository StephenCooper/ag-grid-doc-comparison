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
        {
            month: "Jun",
            value1: 50,
            hats_made: 40,
        },
        {
            month: "Jul",
            value1: 70,
            hats_made: 50,
        },
        {
            month: "Aug",
            value1: 60,
            hats_made: 30,
        },
    ],
    series: [
        { type: "column", xKey: "month", stacked: true, yKey: "value1" },
        { type: "column", xKey: "month", stacked: true, yKey: "hats_made" },
    ],
}
        };

        
    }

    componentDidMount() {
        
    }

    setYNames = () => {
const options = cloneDeep(this.state.options);

    options.series[0].yName = "Sweaters Made";
    options.series[1].yName = "Hats Made";
    

this.setState({ options });
}

    resetYNames = () => {
const options = cloneDeep(this.state.options);

    options.series[0].yName = undefined;
    ;
    options.series[1].yName = undefined;
    ;
    

this.setState({ options });
}

    render() {
        return <div className="wrapper">
    <div id="toolPanel">
        <button onClick={() => this.setYNames()}>Set yNames</button>
        <span className="spacer"></span>
        <button onClick={() => this.resetYNames()}>Reset yNames</button>
        <span className="spacer"></span>
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
