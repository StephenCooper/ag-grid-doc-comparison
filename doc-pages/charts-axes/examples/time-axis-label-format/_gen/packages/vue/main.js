import Vue from 'vue';
import { cloneDeep } from 'lodash';
import * as agCharts from 'ag-charts-community';
import { AgChartsVue } from 'ag-charts-vue';

const ChartExample = {
    template: `
        <div class="wrapper">
                <div id="toolPanel">
                    <button v-on:click="useOneMonthInterval()">Use one month interval</button>
                    <span class="spacer"></span>
                    <button v-on:click="useTwoMonthInterval()">Use two month interval</button>
                </div>
                <ag-charts-vue    
                :options="options"></ag-charts-vue>
            </div>
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
        text: 'Monthly average daily temperatures in the UK',
    },
    series: [
        {
            type: 'line',
            xKey: 'date',
            yKey: 'temp',
        },
    ],
    axes: [
        {
            type: 'time',
            nice: false,
            position: 'bottom',
            tick: {
                count: agCharts.time.month,
            },
            label: {
                format: '%b %Y',
            },
        },
        {
            type: 'number',
            position: 'left',
            label: {
                formatter: (params) => {
                    return params.value + ' °C';
                },
            },
        },
    ],
    padding: {
        top: 20,
        right: 40,
        bottom: 20,
        left: 20,
    },
    legend: {
        enabled: false,
    },
    data: [
        {
            date: new Date('01 Jan 2019 00:00:00 GMT'),
            temp: 4.2,
        },
        {
            date: new Date('01 Feb 2019 00:00:00 GMT'),
            temp: 6.9,
        },
        {
            date: new Date('01 Mar 2019 00:00:00 GMT'),
            temp: 7.9,
        },
        {
            date: new Date('01 Apr 2019 00:00:00 GMT'),
            temp: 9.1,
        },
        {
            date: new Date('01 May 2019 00:00:00 GMT'),
            temp: 11.2,
        },
    ],
}
    },
    mounted() {
        
    },
    methods: {
        useOneMonthInterval() {
const options = cloneDeep(this.options);

    options.axes[0].tick.count = agCharts.time.month;
    

this.options = options;
},
useTwoMonthInterval() {
const options = cloneDeep(this.options);

    options.axes[0].tick.count = agCharts.time.month.every(2);
    

this.options = options;
},
    }
}



new Vue({
    el: '#app',
    components: {
        'my-component': ChartExample
    }
});
