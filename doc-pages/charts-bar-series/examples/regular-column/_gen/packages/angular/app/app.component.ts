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
        text: "Apple's revenue by product category",
    },
    subtitle: {
        text: 'in billion U.S. dollars',
    },
    data: getData(),
    series: [
        {
            type: 'column',
            xKey: 'quarter',
            yKey: 'iphone',
        },
    ],
}
    }

    ngOnInit() {
        
    }

    
}


