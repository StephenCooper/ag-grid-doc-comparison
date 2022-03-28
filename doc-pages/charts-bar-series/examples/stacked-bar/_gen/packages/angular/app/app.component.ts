import { cloneDeep } from 'lodash';
import { Component } from '@angular/core';
import * as agCharts from 'ag-charts-community';
import { AgChartOptions } from 'ag-charts-community';

@Component({
    selector: 'my-app',
    template: `<ag-charts-angular
    style="height: 100%"
    [options]="options"
    ></ag-charts-angular>`
})

export class AppComponent {
    private options: AgChartOptions;
    

    constructor() {
        this.options = {
    
    title: {
        text: "Apple's revenue by product category",
    },
    subtitle: {
        text: 'in billion U.S. dollars',
    },
    data: getData(),
    series: [
        {
            type: 'bar',
            xKey: 'quarter',
            yKey: 'iphone',
            yName: 'iPhone',
            stacked: true,
        },
        {
            type: 'bar',
            xKey: 'quarter',
            yKey: 'mac',
            yName: 'Mac',
            stacked: true,
        },
        {
            type: 'bar',
            xKey: 'quarter',
            yKey: 'ipad',
            yName: 'iPad',
            stacked: true,
        },
        {
            type: 'bar',
            xKey: 'quarter',
            yKey: 'wearables',
            yName: 'Wearables',
            stacked: true,
        },
        {
            type: 'bar',
            xKey: 'quarter',
            yKey: 'services',
            yName: 'Services',
            stacked: true,
        },
    ],
    axes: [
        {
            type: 'number',
            position: 'bottom',
        },
        {
            type: 'category',
            position: 'left',
        },
    ],
}
    }

    ngOnInit() {
        
    }

    
}


