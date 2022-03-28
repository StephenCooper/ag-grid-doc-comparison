import Vue from 'vue';
import { cloneDeep } from 'lodash';
import * as agCharts from 'ag-charts-community';
import { AgChartsVue } from 'ag-charts-vue';

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
        },
    ],
}
    },
    mounted() {
        
    },
    methods: {
        
    }
}



new Vue({
    el: '#app',
    components: {
        'my-component': ChartExample
    }
});
