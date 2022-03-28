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
        text: 'GDP by country in billions of USD (2018)',
    },
    data: [
        {
            country: 'Spain',
            gdp: 1419,
        },
        {
            country: 'UK',
            gdp: 2855,
        },
        {
            country: 'Germany',
            gdp: 3948,
        },
        {
            country: 'France',
            gdp: 2778,
        },
    ],
    series: [
        {
            type: 'column',
            xKey: 'country',
            yKey: 'gdp',
            showInLegend: false,
            formatter: function (params) {
                return {
                    fill: params.datum[params.xKey] === 'UK'
                        ? params.highlighted
                            ? 'lime'
                            : 'red'
                        : params.fill,
                };
            },
        },
    ],
}
    }

    ngOnInit() {
        
    }

    
}


