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
        text: 'Height vs Weight for Major League Baseball Players',
        fontSize: 18,
    },
    subtitle: {
        text: 'Source: Statistics Online Computational Resource',
    },
    series: [
        {
            type: 'scatter',
            xKey: 'weight',
            yKey: 'height',
            fillOpacity: 0.5,
            strokeOpacity: 0,
            marker: {
                size: 12,
                fill: '#002D72',
            },
        },
    ],
    axes: [
        {
            position: 'bottom',
            type: 'number',
            title: {
                enabled: true,
                text: 'Weight (pounds)',
            },
        },
        {
            position: 'left',
            type: 'number',
            title: {
                enabled: true,
                text: 'Height (inches)',
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


