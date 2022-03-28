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
    
    title: {
        text: 'Fuel Spending (2019)',
    },
    data: getData(),
    series: [
        {
            xKey: 'quarter',
            yKey: 'petrol',
            title: 'Petrol',
            marker: {
                shape: 'square',
                size: 10,
            },
        },
        {
            xKey: 'quarter',
            yKey: 'diesel',
            title: 'Diesel',
            stroke: 'black',
            marker: {
                size: 15,
                fill: 'gray',
                stroke: 'black',
            },
        },
        {
            xKey: 'quarter',
            yKey: 'electric',
            title: 'Electric',
            stroke: '#8bc24a',
            marker: {
                shape: 'cross',
                size: 20,
                fill: '#8bc24a',
                stroke: '#658d36',
            },
        },
    ],
}
    }

    ngOnInit() {
        
    }

    
}

