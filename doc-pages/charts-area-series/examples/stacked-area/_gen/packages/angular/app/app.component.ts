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
        text: "Browser Wars",
    },
    subtitle: {
        text: "2009-2019",
    },
    data: getData(),
    series: [
        {
            type: "area",
            xKey: "year",
            yKey: "ie",
            yName: "IE",
            stacked: true,
        },
        {
            type: "area",
            xKey: "year",
            yKey: "firefox",
            yName: "Firefox",
            stacked: true,
        },
        {
            type: "area",
            xKey: "year",
            yKey: "safari",
            yName: "Safari",
            stacked: true,
        },
        {
            type: "area",
            xKey: "year",
            yKey: "chrome",
            yName: "Chrome",
            stacked: true,
        },
    ],
}
    }

    ngOnInit() {
        
    }

    
}


