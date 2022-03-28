import { createApp } from 'vue';
import { cloneDeep } from 'lodash';
import * as agCharts from 'ag-charts-community';
import { AgChartsVue } from 'ag-charts-vue3';

const ChartExample = {
    template: `
        <ag-charts-vue
                :options="options"></ag-charts-vue>
    `,
    components: {
        'ag-charts-vue': AgChartsVue
    },
    data: function() {
        return {
            options: null
        }
    },
    created() {
        this.options = {
    
    title: {
        text: 'Internet Explorer Market Share',
    },
    subtitle: {
        text: '2009-2019 (aka "good times")',
    },
    data: getData(),
    series: [
        {
            type: 'area',
            xKey: 'year',
            yKey: 'ie',
            yName: 'IE',
            marker: {
                enabled: true,
            },
            tooltip: {
                renderer: (params) => {
                    return {
                        content: params.yName + ' - ' + params.yValue + '% - Jan ' + params.xValue,
                    };
                },
            },
        },
    ],
    legend: {
        enabled: false,
    },
}
    },
    mounted() {
        
    },
    methods: {
        
    }
}



createApp(ChartExample).mount("#app");
