import { cloneDeep } from 'lodash';
import { Component } from '@angular/core';
import * as agCharts from 'ag-charts-community';
import { AgChartOptions } from 'ag-charts-community';

@Component({
    selector: 'my-app',
    template: `<ag-charts-angular
    style="height: 100%"
    [options]="options"
    ></ag-charts-angular>
`
})

export class AppComponent {
    private options: AgChartOptions;
    

    constructor() {
        this.options = {
    
    autoSize: true,
    data: getData(),
    title: {
        text: 'Punch Card of Github',
        fontSize: 18,
    },
    subtitle: {
        text: 'time distribution of commits',
    },
    series: [
        {
            type: 'scatter',
            xKey: 'hour',
            xName: 'Time',
            yKey: 'day',
            yName: 'Day',
            sizeKey: 'size',
            sizeName: 'Commits',
            title: 'Punch Card',
            marker: {
                size: 0,
                maxSize: 30,
                fill: '#cc5b58',
            },
            fillOpacity: 0.85,
        },
    ],
    axes: [
        {
            position: 'bottom',
            type: 'category',
            gridStyle: [
                {
                    stroke: 'rgba(0,0,0,0.2)',
                    lineDash: [0, 5, 0],
                },
            ],
            tick: {
                color: 'black',
            },
            line: {
                color: undefined,
            },
        },
        {
            position: 'left',
            type: 'category',
            gridStyle: [],
            tick: {
                color: 'black',
            },
            line: {
                color: undefined,
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

    
}


