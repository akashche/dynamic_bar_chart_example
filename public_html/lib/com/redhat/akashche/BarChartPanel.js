
define([
    // common
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojox/lang/functional/object",
    // charts
    "dojox/charting/Chart",
    "dojox/charting/plot2d/Columns",
    "dojox/charting/plot2d/Grid",
    "dojox/charting/themes/PlotKit/blue",
    "dojox/charting/axis2d/Default",
    // local
    "./utils",
    // wait for DOM
    "dojo/domReady!"
], function (
        declare, lang, array, object,// common
        Chart, Columns, Grid, theme, Default, // charts
        utils // local
    ) {
    return declare([], {
        constructor: function (conf) {
            this.conf = utils.mixinDeep(this._defaultConf(), conf);
            this.chart = new Chart(conf.renderTo)
                    .addAxis("bottom", this.conf.bottomAxis)
                    .addAxis("left", this.conf.leftAxis)
                    .addPlot("default", this.conf.columns)
                    .addPlot("grid", this.conf.grid)
                    .setTheme(theme)
                    .addSeries("default", [1, 2, 3, 4, 5])
                    .render();
            this.flag = true;
            setInterval(lang.hitch(this, function () {
                var data = this.flag ? [5, 4, 3, 2, 1] : [1, 2, 3, 4, 5];
                this.flag = !this.flag;
                this.chart.updateSeries("default", data);
                this.chart.render();
            }), 2000);
        },
        _defaultConf: function () {
            return {
                renderTo: "MUST_BE_SPECIFIED",
                bottomAxis: {
                    vertical: false,
                    fixLower: "major",
                    fixUpper: "major",
                    majorLabels: false,
                    minorLabels: false,
                    majorTicks: true,
                    minorTicks: false,
                    majorTickStep: 1   
                },
                leftAxis: {
                    vertical: true,
                    fixLower: "major",
                    fixUpper: "major",
                    includeZero: true,
                    majorTickStep: 1,
                    majorLabels: true,
                    minorLabels: false,
                    majorTicks: true,
                    minorTicks: false,
                    maxLabelSize: 30,
                    title: "some label",
                    htmlLabels: false,
                    startFromZero: true
                },
                columns: {
                    type: Columns,
                    animate: false,
                    hAxis: "bottom",
                    vAxis: "left"
                },
                grid: {
                    type: Grid,
                    vMajorLines: false,
                    hAxis: "bottom",
                    vAxis: "left"
                }
            };
        }
    });
});

