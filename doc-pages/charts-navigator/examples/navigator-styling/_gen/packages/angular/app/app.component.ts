import { cloneDeep } from 'lodash';
import { Component } from '@angular/core';
import * as agCharts from 'ag-charts-community';
import { AgChartOptions } from 'ag-charts-community';

@Component({
    selector: 'my-app',
    template: `<div class="wrapper">
    <ag-charts-angular
    style="height: 100%"
    [options]="options"
    ></ag-charts-angular>
</div>`
})

export class AppComponent {
    private options: AgChartOptions;
    

    constructor() {
        this.options = {
    
    title: {
        text: 'Navigator Styling',
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
        height: 50,
        min: 0.2,
        max: 0.7,
        mask: {
            fill: 'red',
            strokeWidth: 2,
            fillOpacity: 0.3,
        },
        minHandle: {
            fill: 'yellow',
            stroke: 'blue',
            width: 16,
            height: 30,
            gripLineGap: 4,
            gripLineLength: 12,
            strokeWidth: 2,
        },
        maxHandle: {
            fill: 'lime',
            stroke: 'black',
        },
    },
}
    }

    ngOnInit() {
        
    }

    
}


