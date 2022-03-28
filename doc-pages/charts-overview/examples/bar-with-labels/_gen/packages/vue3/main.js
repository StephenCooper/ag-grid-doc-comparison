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
    
    autoSize: true,
    data: getData(),
    title: {
        text: 'Change in Number of Jobs in UK (June to September 2019)',
        fontSize: 18,
    },
    subtitle: {
        text: 'Source: Office for National Statistics',
    },
    series: [
        {
            type: 'bar',
            xKey: 'job',
            yKey: 'change',
            fill: 'rgba(0, 117, 163, 0.9)',
            stroke: 'rgba(0, 117, 163, 0.9)',
            highlightStyle: {
                item: {
                    fill: '#0ab9ff',
                },
            },
            label: {
                fontWeight: 'bold',
                color: 'white',
                formatter: (params) => {
                    return (params.value > 0 ? '+' : '') + params.value;
                },
            },
        },
    ],
    axes: [
        {
            type: 'category',
            position: 'left',
        },
        {
            type: 'number',
            position: 'bottom',
            title: {
                enabled: true,
                text: 'Change in number of jobs (thousands)',
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
