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
        text: 'Total Visitors to Museums and Galleries',
        fontSize: 18,
    },
    subtitle: {
        text: 'Source: Department for Digital, Culture, Media & Sport',
    },
    series: [
        {
            type: 'column',
            xKey: 'year',
            yKey: 'visitors',
            fill: '#0084e7',
            strokeWidth: 0,
            shadow: {
                enabled: true,
                xOffset: 3,
            },
        },
    ],
    axes: [
        {
            type: 'category',
            position: 'bottom',
            title: {
                enabled: true,
                text: 'Year',
            },
        },
        {
            type: 'number',
            position: 'left',
            title: {
                enabled: true,
                text: 'Total visitors',
            },
            label: {
                formatter: function (params) {
                    return params.value / 1000000 + 'M';
                },
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


