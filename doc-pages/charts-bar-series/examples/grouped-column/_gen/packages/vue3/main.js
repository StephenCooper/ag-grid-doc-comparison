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
            yName: 'iPhone',
        },
        {
            type: 'column',
            xKey: 'quarter',
            yKey: 'mac',
            yName: 'Mac',
        },
        {
            type: 'column',
            xKey: 'quarter',
            yKey: 'ipad',
            yName: 'iPad',
        },
        {
            type: 'column',
            xKey: 'quarter',
            yKey: 'wearables',
            yName: 'Wearables',
        },
        {
            type: 'column',
            xKey: 'quarter',
            yKey: 'services',
            yName: 'Services',
        },
    ],
}
    },
    mounted() {
        
    },
    methods: {
        
    }
}



createApp(ChartExample).mount("#app");
