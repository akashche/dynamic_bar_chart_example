/*
 * Copyright 2015, akashche at redhat.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define([
    // common
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/request/xhr",
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
        declare, lang, array, xhr, // common
        Chart, Columns, Grid, theme, Default, // charts
        utils // local
    ) {
    return declare([], {
        constructor: function (conf) {
            this.conf = utils.mixinDeep(this._defaultConf(), conf);
            this.data = [];
            for (var i = 0; i < 24; i++) {
                this.data.push(1);
            }
            this.chart = new Chart(conf.renderTo)
                    .addAxis("bottom", this.conf.bottomAxis)
                    .addAxis("left", this.conf.leftAxis)
                    .addPlot("default", this.conf.columns)
                    .addPlot("grid", this.conf.grid)
                    .setTheme(theme)
                    .addSeries("default", this.data)
                    .render();
            for (var i = 0; i < 24; i++) {
                this.data[i] = 0;
            }
            this.chart.updateSeries("default", this.data).render();
            setInterval(lang.hitch(this, function () {
                xhr("/jvmti/GetLiveThreadsCount/").then(lang.hitch(this, function(count) {
                    this.data.push(parseInt(count, 10));
                    this.data = this.data.slice(1);
                    this.chart.updateSeries("default", this.data);
                    this.chart.render();
                }), console.log);
            }), 2100);
            xhr("/jvmti/GetSystemProperty/java.home").then(function(str) {
                document.getElementById("javaHomeField").appendChild(document.createTextNode(str));
            }, console.log);
            xhr("/jvmti/GetSystemProperty/java.vm.name").then(function (str) {
                document.getElementById("javaVmNameField").appendChild(document.createTextNode(str));
            }, console.log);
            xhr("/jvmti/GetSystemProperty/java.vm.version").then(function (str) {
                document.getElementById("javaVmVersionField").appendChild(document.createTextNode(str));
            }, console.log);
            xhr("/jvmti/GetSystemProperty/java.vm.vendor").then(function (str) {
                document.getElementById("javaVmVendorField").appendChild(document.createTextNode(str));
            }, console.log);            
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
                    majorTickStep: 5,
                    majorLabels: true,
                    minorLabels: false,
                    majorTicks: true,
                    minorTicks: false,
                    maxLabelSize: 30,
                    title: "",
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

