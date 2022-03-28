import { cloneDeep } from 'lodash';
import { Component } from '@angular/core';
import * as agCharts from 'ag-charts-community';
import { AgCartesianChartOptions } from 'ag-charts-community';

@Component({
    selector: 'my-app',
    template: `<div class="wrapper">
    <div id="toolPanel">
        <button (click)="useNumberAxis()">Number axis</button>
        <span class="spacer"></span>
        <button (click)="useLogAxis()">Log axis</button>
    </div>
    <ag-charts-angular
    style="height: 100%"
    [options]="options"
    ></ag-charts-angular>
</div>`
})

export class AppComponent {
    private options: AgCartesianChartOptions;
    

    constructor() {
        this.options = {
    
    data: getData(),
    title: {
        text: 'World Population Over Time',
    },
    subtitle: {
        text: 'log scale',
    },
    series: [
        {
            type: 'line',
            xKey: 'year',
            yKey: 'population',
        },
    ],
    axes: [
        {
            type: 'log',
            position: 'left',
            title: {
                enabled: true,
                text: 'Population',
            },
            label: {
                format: ',.0f',
                fontSize: 10,
            },
        },
        {
            type: 'number',
            position: 'bottom',
            title: {
                enabled: true,
                text: 'Year',
            },
            label: {
                fontSize: 10,
            },
        },
    ],
    legend: {
        enabled: false,
    },
}
    }

    ngOnInit() {
        
    }

    useNumberAxis = () => {
const options = cloneDeep(this.options);

    options.subtitle = {
        text: 'linear scale',
    };
    options.axes![0] = {
        type: 'number',
        position: 'left',
        title: {
            enabled: true,
            text: 'Population',
        },
        label: {
            format: ',.0f',
            fontSize: 10,
        },
    };
    

this.options = options;
}

useLogAxis = () => {
const options = cloneDeep(this.options);

    options.subtitle = {
        text: 'log scale',
    };
    options.axes![0] = {
        type: 'log',
        position: 'left',
        title: {
            enabled: true,
            text: 'Population',
        },
        label: {
            format: ',.0f',
            fontSize: 10,
        },
    };
    

this.options = options;
}
}


