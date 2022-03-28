import Vue from 'vue';
import { cloneDeep } from 'lodash';
import * as agCharts from 'ag-charts-community';
import { AgChartsVue } from 'ag-charts-vue';

const ChartExample = {
    template: `
        <div class="wrapper">
                <div id="toolPanel">
                    <button v-on:click="useGridStyle1()">Grid Style #1</button>
                    <span class="spacer"></span>
                    <button v-on:click="useGridStyle2()">Grid Style #2</button>
                    <span class="spacer"></span>
                    <button v-on:click="useDefaultGridStyle()">Default Grid Style</button>
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
        text: "Most Common Girls' First Names In English",
    },
    subtitle: {
        text: 'over the past 100 years',
    },
    data: [
        { name: 'Mary', count: 234000 },
        { name: 'Patricia', count: 211000 },
        { name: 'Jennifer', count: 178000 },
        { name: 'Elizabeth', count: 153000 },
        { name: 'Linda', count: 123000 },
    ],
    series: [
        {
            type: 'line',
            xKey: 'name',
            yKey: 'count',
        },
    ],
    axes: [
        {
            type: 'category',
            position: 'bottom',
        },
        {
            type: 'number',
            position: 'left',
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
        useGridStyle1() {
const options = cloneDeep(this.options);

    var gridStyle = [
        {
            stroke: 'gray',
            lineDash: [10, 5],
        },
        {
            stroke: 'lightgray',
            lineDash: [5, 5],
        },
    ];
    options.axes[0].gridStyle = gridStyle;
    options.axes[1].gridStyle = gridStyle;
    

this.options = options;
},
useGridStyle2() {
const options = cloneDeep(this.options);

    var xGridStyle = [
        {
            stroke: 'red',
            lineDash: [3, 3],
        },
    ];
    var yGridStyle = [
        {
            stroke: 'green',
            lineDash: [8, 3, 3, 3],
        },
    ];
    options.axes[0].gridStyle = xGridStyle;
    options.axes[1].gridStyle = yGridStyle;
    

this.options = options;
},
useDefaultGridStyle() {
const options = cloneDeep(this.options);

    var gridStyle = [
        {
            stroke: 'rgba(219, 219, 219, 1)',
            lineDash: [4, 2],
        },
    ];
    options.axes[0].gridStyle = gridStyle;
    options.axes[1].gridStyle = gridStyle;
    

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
