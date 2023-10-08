/* global buriedDefaults */
const { Color } = Highcharts;

let topology, ohlc;

const rgbToHex = rgb => {
    const [r, g, b] = Color.parse(rgb).rgba;
    return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
};

const chartPreview = async theme => {
    Highcharts.setOptions(theme);

    Highcharts.chart('container-chart', {

        chart: {
            zooming: {
                type: 'x',
                mouseWheel: {
                    type: ''
                }
            }
        },

        title: {
            text: 'Chart preview'
        },

        xAxis: {
            width: '40%',
            type: 'category'
        },

        yAxis: {
            width: '40%',
            title: {
                text: 'kg'
            }
        },

        series: [{
            type: 'pie',
            allowPointSelect: true,
            keys: ['name', 'y', 'selected', 'sliced'],
            data: [
                ['Apples', 29.9, false],
                ['Pears', 71.5, false],
                ['Oranges', 106.4, false],
                ['Plums', 129.2, false],
                ['Bananas', 144.0, false],
                ['Peaches', 176.0, false],
                ['Prunes', 135.6, true, true],
                ['Avocados', 148.5, false]
            ],
            showInLegend: true,
            center: ['75%', '50%']
        }, {
            type: 'column',
            keys: ['name', 'y'],
            data: [
                ['Apples', 29.9, false],
                ['Pears', 71.5, false],
                ['Oranges', 106.4, false],
                ['Plums', 129.2, false],
                ['Bananas', 144.0, false],
                ['Peaches', 176.0, false],
                ['Prunes', 135.6, true, true],
                ['Avocados', 148.5, false]
            ],
            colorByPoint: true,
            showInLegend: false
        }]
    });

    // Map preview
    if (!topology) {
        topology = await fetch(
            'https://code.highcharts.com/mapdata/custom/africa.topo.json'
        ).then(response => response.json());
    }

    const data = [
        ['ug', 10], ['ng', 11], ['st', 12], ['tz', 13], ['sl', 14], ['gw', 15],
        ['cv', 16], ['sc', 17], ['tn', 18], ['mg', 19], ['ke', 20], ['cd', 21],
        ['fr', 22], ['mr', 23], ['dz', 24], ['er', 25], ['gq', 26], ['mu', 27],
        ['sn', 28], ['km', 29], ['et', 30], ['ci', 31], ['gh', 32], ['zm', 33],
        ['na', 34], ['rw', 35], ['sx', 36], ['so', 37], ['cm', 38], ['cg', 39],
        ['eh', 40], ['bj', 41], ['bf', 42], ['tg', 43], ['ne', 44], ['ly', 45],
        ['lr', 46], ['mw', 47], ['gm', 48], ['td', 49], ['ga', 50], ['dj', 51],
        ['bi', 52], ['ao', 53], ['gn', 54], ['zw', 55], ['za', 56], ['mz', 57],
        ['sz', 58], ['ml', 59], ['bw', 60], ['sd', 61], ['ma', 62], ['eg', 63],
        ['ls', 64], ['ss', 65], ['cf', 66]
    ];

    // Create the chart
    Highcharts.mapChart('container-map', {
        chart: {
            map: topology
        },

        title: {
            text: 'Map preview'
        },

        subtitle: {
            text: 'Source map: <a href="https://code.highcharts.com/mapdata/custom/africa.topo.json">Africa</a>'
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0
        },

        series: [{
            data: data,
            name: 'Random data',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }]
    });

    // Stock preview
    if (!ohlc) {
        ohlc = await fetch(
            'https://demo-live-data.highcharts.com/aapl-ohlc.json'
        ).then(response => response.json());
    }
    Highcharts.stockChart('container-stock', {
        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'Stock chart preview'
        },

        series: [{
            type: 'candlestick',
            name: 'AAPL Stock Price',
            data: ohlc,
            dataGrouping: {
                units: [
                    [
                        'week', // unit name
                        [1] // allowed multiples
                    ], [
                        'month',
                        [1, 2, 3, 4, 6]
                    ]
                ]
            }
        }]
    });
};

const buildDefaults = () => {
    buriedDefaults.colorAxis = Highcharts.merge(
        buriedDefaults.xAxis,
        buriedDefaults.colorAxis
    );
    buriedDefaults.yAxis = Highcharts.merge(
        buriedDefaults.xAxis,
        buriedDefaults.yAxis
    );
    return Highcharts.merge(
        Highcharts.defaultOptions,
        buriedDefaults
    );
};

const defaultOptions = buildDefaults();

const generate = async () => {

    const palette = {};

    const backgroundColor = document.querySelector(
            'input[name="background-color"]'
        ).value,
        neutralColor100 = document.querySelector(
            'input[name="neutral-color"]'
        ).value,
        highlightColor100 = document.querySelector(
            'input[name="highlight-color"]'
        ).value;

    const pre = document.getElementById('css'),
        neutralPreview = document.getElementById('neutral-preview'),
        highlightPreview = document.getElementById('highlight-preview');
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = neutralColor100;
    [...document.querySelectorAll('.demo-content pre,.demo-content a')].forEach(
        element => {
            element.style.color = highlightColor100;
        }
    );

    palette.backgroundColor = backgroundColor;
    pre.innerText = '/* Background color */\n' +
        `--highcharts-background-color: ${backgroundColor};\n\n`;

    const backgroundColorObj = new Color(backgroundColor),
        neutralColor100Obj = new Color(neutralColor100),
        highlightColor100Obj = new Color(highlightColor100);

    pre.innerText += '/* Neutral color variations */\n';
    [100, 80, 60, 40, 20, 10, 5, 3].forEach(weight => {
        const color = rgbToHex(neutralColor100Obj.tweenTo(
            backgroundColorObj,
            (100 - weight) / 100
        ));

        palette[`neutralColor${weight}`] = color;
        pre.innerText += `--highcharts-neutral-color-${weight}: ${color};\n`;

        let preview = document.getElementById(`neutral-preview-${weight}`);
        if (!preview) {
            preview = document.createElement('div');
            preview.id = `neutral-preview-${weight}`;
            neutralPreview.appendChild(preview);

            const label = document.createElement('div');
            label.innerText = `Neutral ${weight}`;
            neutralPreview.appendChild(label);
        }
        preview.style.backgroundColor = color;
    });

    pre.innerText += '\n/* Highlight color variations */\n';
    [100, 80, 60, 20, 10].forEach(weight => {
        const color = rgbToHex(highlightColor100Obj.tweenTo(
            backgroundColorObj,
            (100 - weight) / 100
        ));

        palette[`highlightColor${weight}`] = color;
        pre.innerText += `--highcharts-highlight-color-${weight}: ${color};\n`;

        let preview = document.getElementById(`highlight-preview-${weight}`);
        if (!preview) {
            preview = document.createElement('div');
            preview.id = `highlight-preview-${weight}`;
            highlightPreview.appendChild(preview);

            const label = document.createElement('div');
            label.innerText = `Highlight ${weight}`;
            highlightPreview.appendChild(label);
        }
        preview.style.backgroundColor = color;
    });

    // Map the default color set to palette property names
    const colorMap = {
        '#ffffff': 'backgroundColor',
        '#000000': 'neutralColor100',
        '#333333': 'neutralColor80',
        '#666666': 'neutralColor60',
        '#999999': 'neutralColor40',
        '#cccccc': 'neutralColor20',
        '#e6e6e6': 'neutralColor10',
        '#f2f2f2': 'neutralColor5',
        '#f7f7f7': 'neutralColor3',
        '#0022ff': 'highlightColor100',
        '#334eff': 'highlightColor80',
        '#667aff': 'highlightColor60',
        '#ccd3ff': 'highlightColor20',
        '#e6e9ff': 'highlightColor10'
    };


    // Find colors in default options
    const findColors = obj => {
        const theme = {};
        if (typeof obj === 'object' && !Array.isArray(obj)) {
            for (const [key, value] of Object.entries(obj)) {
                if (value && typeof value === 'object') {
                    const children = findColors(value, key);
                    if (children) {
                        theme[key] = children;
                    }
                } else if (Array.isArray(value)) {
                    // findColors(value, itemPath);
                } else if (
                    typeof value === 'string' &&
                    /#[0-9a-f]{6}/.test(value)
                ) {
                    const paletteKey = colorMap[value];
                    if (!paletteKey) {
                        console.error(`Palette key missing for ${value}`);
                    }
                    const color = palette[paletteKey];
                    if (!color) {
                        console.error(`Color missing for ${value} in palette`);
                    }
                    theme[key] = color;
                }
            }
        }
        return Object.keys(theme).length ? theme : undefined;
    };
    const theme = findColors(defaultOptions);

    document.getElementById('js').innerText = JSON.stringify(theme, null, '  ');

    await chartPreview(theme);
};

(async () => {
    [...document.querySelectorAll('input')]
        .forEach(input => input.addEventListener('change', generate));
    await generate();
})();