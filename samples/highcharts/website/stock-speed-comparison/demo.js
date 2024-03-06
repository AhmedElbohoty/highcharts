Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    legend: {
        align: 'center',
        verticalAlign: 'top'

    },
    title: {
        text: 'Point Pushing Comparison'
    },
    xAxis: {
        title: {
            text: 'Number of Points Pushed'
        },
        categories: ['10', '1000', '10000', '100000', '500000']
    },
    yAxis: {
        tickInterval: 5000,
        endOnTick: false,
        startOnTick: false,
        title: {
            text: 'Time (ms)'
        }


    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                formatter: function () {
                    return '<span style="color:' + this.color + '">' +  this.y + '</span>';
                },
                style: {
                    fontWeight: 'normal'
                }
            }
        }
    },
    series: [{
        name: 'Highcharts Stock',
        color: '#545ECC',
        data: [115, 129, 140, 345, 1067]
    }, {
        name: 'FusionCharts',
        color: '#45467D',
        visible: false,
        data: [1210, 1331, 3173, 35883, null]
    }, {
        name: 'ChartJS',
        color: '#FE787B',
        data: [66, 93, 311, 2350, 11498]
    }, {
        name: 'CanvasJS',
        color: '#74B566',
        data: [140, 127, 185, 1086, 4645]
    }, {
        name: 'AnyChart',
        color: '#4184CA',
        data: [115, 166, 543, 4122, 19755]
    }]
});
