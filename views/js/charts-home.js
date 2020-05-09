function x() {
    // 'use strict';
    Chart.defaults.global.defaultFontColor = '#75787c';

    var legendState = true;
    if ($(window).outerWidth() < 576) {
        legendState = false;
    }

    var LINECHART = $('#lineChart');
    var myLineChart = new Chart(LINECHART, {
        type: 'line',
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        minRotation: 90,
                        maxRotation: 90
                    },
                    display: true,
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        max: 1000,
                        min: 0,
                        stepSize: 100
                    },
                    display: true,
                    gridLines: {
                        display: false
                    }
                }]
            },
            legend: {
                display: legendState
            }
        },
        data: {
            labels: [1],
            datasets: [
                {
                    label: "CASE RATE",
                    fill: true,
                    lineTension: 0.2,
                    backgroundColor: "transparent",
                    borderColor: "#F5990B",
                    pointBorderColor: '#F5990B',
                    pointHoverBackgroundColor: "#F5990B",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 2,
                    pointBackgroundColor: "#F5990B",
                    pointBorderWidth: 5,
                    pointHoverRadius: 5,
                    pointHoverBorderColor: "#F5990B",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [120,123,226,130,230,132,136,37,138,240,141,244,46,149,152,154,256,258,160],
                    spanGaps: false
                },
                {
                    label: "DEATH RATE",
                    fill: true,
                    lineTension: 0.2,
                    backgroundColor: "transparent",
                    borderColor: "#EF8C99",
                    pointBorderColor: '#EF8C99',
                    pointHoverBackgroundColor: "#EF8C99",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 2,
                    pointBackgroundColor: "#EF8C99",
                    pointBorderWidth: 5,
                    pointHoverRadius: 5,
                    pointHoverBorderColor: "#EF8C99",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [144,152,163,177,182,203,221,247,297,315,335,349,362,387,397,409,428,437,446],
                    spanGaps: false
                },
                {
                    label: "RECOVERY RATE",
                    fill: true,
                    lineTension: 0.2,
                    backgroundColor: "transparent",
                    borderColor: "#6FEB29",
                    pointBorderColor: '#6FEB29',
                    pointHoverBackgroundColor: "#6FEB29",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 2,
                    pointBackgroundColor: "#6FEB29",
                    pointBorderWidth: 5,
                    pointHoverRadius: 5,
                    pointHoverBorderColor: "#6FEB29",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [57,64,73,84,96,124,140,157,197,242,295,353,435,487,516,572,613,654,693],
                    spanGaps: false
                }
            ]
        }
    });
};

x();
