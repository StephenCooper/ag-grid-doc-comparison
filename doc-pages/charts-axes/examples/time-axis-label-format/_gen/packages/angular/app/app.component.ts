import { cloneDeep } from 'lodash';
import { Component } from '@angular/core';
import * as agCharts from 'ag-charts-community';
import { AgCartesianChartOptions } from 'ag-charts-community';

@Component({
    selector: 'my-app',
    template: `<div class="wrapper">
    <div id="toolPanel">
        <button (click)="useOneMonthInterval()">Use one month interval</button>
        <span class="spacer"></span>
        <button (click)="useTwoMonthInterval()">Use two month interval</button>
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
    
    title: {
        text: 'Monthly average daily temperatures in the UK',
    },
    series: [
        {
            type: 'line',
            xKey: 'date',
            yKey: 'temp',
        },
    ],
    axes: [
        {
            type: 'time',
            nice: false,
            position: 'bottom',
            tick: {
                count: agCharts.time.month,
            },
            label: {
                format: '%b %Y',
            },
        },
        {
            type: 'number',
            position: 'left',
            label: {
                formatter: function (params) {
                    return params.value + ' °C';
                },
            },
        },
    ],
    padding: {
        top: 20,
        right: 40,
        bottom: 20,
        left: 20,
    },
    legend: {
        enabled: false,
    },
    data: [
        {
            date: new Date('01 Jan 2019 00:00:00 GMT'),
            temp: 4.2,
        },
        {
            date: new Date('01 Feb 2019 00:00:00 GMT'),
            temp: 6.9,
        },
        {
            date: new Date('01 Mar 2019 00:00:00 GMT'),
            temp: 7.9,
        },
        {
            date: new Date('01 Apr 2019 00:00:00 GMT'),
            temp: 9.1,
        },
        {
            date: new Date('01 May 2019 00:00:00 GMT'),
            temp: 11.2,
        },
    ],
}
    }

    ngOnInit() {
        
    }

    useOneMonthInterval = () => {
const options = cloneDeep(this.options);

    options.axes![0].tick!.count = agCharts.time.month;
    

this.options = options;
}

useTwoMonthInterval = () => {
const options = cloneDeep(this.options);

    options.axes![0].tick!.count = agCharts.time.month.every(2);
    

this.options = options;
}
}


